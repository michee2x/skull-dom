import { SkeletonNode, SkeletonGroup } from "./types.js";
import { probe } from "./probe.js";
import { classify } from "./classify.js";

export function inferNode(el: HTMLElement): SkeletonNode | null {
  const probeData = probe(el);
  console.log("probed data: ", probeData);

  // Handle skip type - don't generate skeleton for this element
  if (probeData.skeletonType === 'skip' || probeData.skeletonHint === 'skip') {
    return null;
  }

  // Allow type override from data-skeleton-type
  const type = probeData.skeletonType || classify(el, probeData);

  if (type === "text") {
    // Accurately calculate line height from computed styles
    const lineHeightStr = probeData.styles.lineHeight;
    const fontSize = parseFloat(probeData.styles.fontSize) || 16;

    let lineHeight: number;
    if (lineHeightStr === 'normal') {
      // Browser default is typically 1.1
      lineHeight = fontSize * 0.9;
    } else if (lineHeightStr.endsWith('px')) {
      // Explicit pixel value like "24px"
      lineHeight = parseFloat(lineHeightStr);
    } else {
      // Unitless multiplier like "1.5"
      lineHeight = parseFloat(lineHeightStr) * fontSize;
    }

    // Calculate number of lines based on total height
    const lines = Math.max(1, Math.round(probeData.height / lineHeight));

    return {
      kind: "text",
      width: probeData.width,
      height: lineHeight, // Height of a single line
      lines,
      radius: parseFloat(probeData.borderRadius) || 4, // Default radius for text
      padding: probeData.styles.padding,
      margin: probeData.styles.margin,
      border: probeData.styles.border,
      hint: probeData.skeletonHint
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
      hint: probeData.skeletonHint,
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
    border: probeData.styles.border,
    hint: probeData.skeletonHint
  };
}
