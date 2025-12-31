import { SkeletonNode } from "../infer/types.js";

// Track if Tailwind has been injected
let tailwindInjected = false;

export function renderSkeleton(node: SkeletonNode): HTMLElement {
  // Inject Tailwind CDN on first render
  if (!tailwindInjected) {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(script);
    tailwindInjected = true;
  }

  const el = document.createElement("div");
  el.style.boxSizing = "border-box"; // Critical for sizing

  // If hint is provided, use Tailwind classes instead of inline styles
  if (node.hint) {
    el.className = node.hint;
    // Still apply some base styles for skeleton behavior
    el.setAttribute("data-skeleton", "true");
  } else {
    // Fallback to automatic styles when no hint
    el.style.backgroundColor = "#e0e0e0"; // Default gray
    el.style.overflow = "hidden"; // Clip children if needed
  }

  // Apply common layout styles (unless overridden by hint)
  if (!node.hint) {
    if (node.padding) el.style.padding = node.padding;
    if (node.margin) el.style.margin = node.margin;
    if (node.border) el.style.border = node.border;
  }

  if (node.kind === "block") {
    el.style.width = `${node.width}px`;
    el.style.height = `${node.height}px`;
    el.style.borderRadius = `${node.radius || 0}px`;
    el.setAttribute("data-sk", "block");
    return el;
  }

  if (node.kind === "text") {
    el.style.width = `${node.width}px`;
    el.style.display = "flex";
    el.style.flexDirection = "column";
    
    // Add small gap for visual separation between skeleton lines
    const visualGap = 4; // Small gap to see individual lines
    el.style.gap = `${visualGap}px`;
    el.style.backgroundColor = "transparent"; // Container is transparent
    el.setAttribute("data-sk", "text-group");

    // Calculate adjusted line height to account for gaps
    // Total height = (lineHeight * lines) + (gap * (lines - 1))
    // We want: lineHeight * lines = original height
    // With gaps: (adjustedHeight * lines) + (gap * (lines - 1)) = original height
    const totalGapHeight = visualGap * (node.lines - 1);
    const adjustedLineHeight = node.lines > 1 
      ? (node.height * node.lines - totalGapHeight) / node.lines
      : node.height;

    for (let i = 0; i < node.lines; i++) {
        const line = document.createElement("div");
        line.style.width = i === node.lines - 1 && node.lines > 1 ? "60%" : "100%"; // Last line short
        line.style.height = `${adjustedLineHeight}px`; // Adjusted to account for gaps
        line.style.backgroundColor = "#d3d2d2ff";
        line.style.borderRadius = `${node.radius || 4}px`;
        el.appendChild(line);
    }
    return el;
  }

  if (node.kind === "group") {
    el.style.width = `${node.width}px`;
    el.style.height = 'auto'; // Allow container to grow to fit children
    el.style.display = "flex";
    el.style.flexDirection = node.direction;
    el.style.gap = `${node.gap}px`;
    el.style.backgroundColor = "transparent"; // Groups are containers
    el.setAttribute("data-sk", "group");

    // Apply flex/grid layout properties
    if (node.justifyContent) el.style.justifyContent = node.justifyContent;
    if (node.alignItems) el.style.alignItems = node.alignItems;
    if (node.flexWrap) el.style.flexWrap = node.flexWrap;
    
    // Handle grid layouts
    if (node.gridTemplateColumns) {
      el.style.display = "grid";
      el.style.gridTemplateColumns = node.gridTemplateColumns;
    }
    if (node.gridTemplateRows) {
      el.style.gridTemplateRows = node.gridTemplateRows;
    }

    node.children.forEach(child => {
      el.appendChild(renderSkeleton(child));
    });
    return el;
  }

  return el;
}
