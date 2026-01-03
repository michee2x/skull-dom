import { SkeletonNode, SkeletonGroup } from "./types.js";
import { probe } from "./probe.js";
import { classify } from "./classify.js";

export function inferNode(el: HTMLElement): SkeletonNode | null {
  const probeData = probe(el);
  console.log("probed data: ", probeData);

  const type = classify(el, probeData);

  if (type === "text") {
    // Accurately calculate line height from computed styles
    const lineHeightStr = probeData.styles.lineHeight;
    const fontSize = parseFloat(probeData.styles.fontSize) || 16;

    let lineHeight: number;
    if (lineHeightStr === 'normal') {
      lineHeight = fontSize * 1.2;
    } else if (lineHeightStr.endsWith('px')) {
      lineHeight = parseFloat(lineHeightStr);
    } else {
      lineHeight = parseFloat(lineHeightStr) * fontSize;
    }

    // Use Range API for precise line detection
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = Array.from(range.getClientRects());

    let textLines: { width: number, height: number }[] = [];

    if (rects.length > 0) {
      // Group rects by vertical position (Y) to identify lines
      const linesMap = new Map<number, { minX: number, maxX: number, top: number, bottom: number }>();
      const threshold = 4; // Pixel threshold to consider rects on the same line

      rects.forEach(rect => {
        if (rect.width === 0 || rect.height === 0) return; // Ignore invisible rects

        // Find an existing line group that matches this top
        let foundKey = -1;
        for (const key of linesMap.keys()) {
          if (Math.abs(key - rect.top) < threshold) {
            foundKey = key;
            break;
          }
        }

        if (foundKey !== -1) {
          const group = linesMap.get(foundKey)!;
          group.minX = Math.min(group.minX, rect.left);
          group.maxX = Math.max(group.maxX, rect.right);
          group.bottom = Math.max(group.bottom, rect.bottom); // Track max bottom to calc height
        } else {
          linesMap.set(rect.top, {
            minX: rect.left,
            maxX: rect.right,
            top: rect.top,
            bottom: rect.bottom
          });
        }
      });

      // Convert groups to sorted lines
      textLines = Array.from(linesMap.values())
        .sort((a, b) => a.top - b.top)
        .map(g => ({
          width: g.maxX - g.minX,
          height: g.bottom - g.top // Calculate exact height of the line
        }));
    }

    let lines = textLines.length;

    // Fallback if Range API failed to detect specific lines or returned 0
    if (lines === 0) {
      if (lineHeightStr !== 'normal') {
        lines = Math.max(1, Math.round(probeData.height / lineHeight));
      } else {
        lines = 1;
      }
    }

    return {
      kind: "text",
      width: probeData.width,
      height: lineHeight, // Height of a single line
      lines,
      textLines,
      radius: parseFloat(probeData.borderRadius) || 4, // Default radius for text
      padding: probeData.styles.padding,
      margin: probeData.styles.margin,
      border: probeData.styles.border
    };
  }

  if (type === "group") {
    // Detect flow direction based on children positions
    // Simple heuristic: if first two children are horizontally aligned, it's a row
    let direction: "row" | "column" = "column";
    if (probeData.children.length > 1) {
      const first = probeData.children[0].getBoundingClientRect();
      const second = probeData.children[1].getBoundingClientRect();
      // If vertical distance is small but horizontal is large -> row
      if (Math.abs(first.top - second.top) < Math.abs(first.left - second.left)) {
        direction = "row";
      }
    }

    return {
      kind: "group",
      width: probeData.width,
      height: probeData.height,
      direction,
      gap: probeData.gap,
      children: probeData.children.map(child => inferNode(child)).filter((n): n is SkeletonNode => n !== null),
      padding: probeData.styles.padding,
      margin: probeData.styles.margin,
      border: probeData.styles.border,
      // Flex/Grid layout properties
      justifyContent: probeData.justifyContent,
      alignItems: probeData.alignItems,
      flexWrap: probeData.flexWrap,
      gridTemplateColumns: probeData.gridTemplateColumns,
      gridTemplateRows: probeData.gridTemplateRows
    };
  }

  // Block fallback
  return {
    kind: "block",
    width: probeData.width,
    height: probeData.height,
    radius: parseFloat(probeData.borderRadius),
    padding: probeData.styles.padding,
    margin: probeData.styles.margin,
    border: probeData.styles.border
  };
}
