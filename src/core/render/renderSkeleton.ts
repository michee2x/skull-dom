import { SkeletonNode, SkeletonConfig } from "../infer/types.js";

export function renderSkeleton(node: SkeletonNode, config?: SkeletonConfig): HTMLElement {
    try {
        const el = document.createElement("div");
        el.style.boxSizing = "border-box"; // Critical for sizing

        // Default styles
        el.style.backgroundColor = config?.color || "#d1d5db"; // Configurable base color
        el.style.overflow = "hidden"; // Clip children if needed

        // CSS Variables for animations
        if (config?.color) el.style.setProperty('--sk-color', config.color);
        if (config?.highlightColor) el.style.setProperty('--sk-highlight', config.highlightColor);

        // Apply common layout styles
        if (node.padding) el.style.padding = node.padding;
        if (node.margin) el.style.margin = node.margin;
        if (node.border) el.style.border = node.border;

        // Apply Animation Class
        const anim = config?.animation || 'wave';
        
        // For container-based animations
        if (['fade-in', 'slide-in', 'breathing', 'bounce', 'neon'].includes(anim)) {
            el.classList.add(`sk-anim-${anim}`);
        }

        if (node.kind === "block") {
            el.style.width = `${node.width}px`;
            el.style.height = `${node.height}px`;
            el.style.borderRadius = `${typeof config?.borderRadius === 'number' ? config.borderRadius : (node.radius || 0)}px`;
            el.setAttribute("data-sk", "block");
            
            // Leaf node animations
            if (!['fade-in', 'slide-in', 'breathing', 'bounce'].includes(anim)) {
                el.classList.add(`sk-anim-${anim}`);
            }
            return el;
        }

        if (node.kind === "text") {
            el.style.width = `${node.width}px`;
            el.style.display = "flex";
            el.style.flexDirection = "column";
            el.style.alignItems = "flex-start"; // Ensure lines don't stretch to container width

            // Add small gap for visual separation between skeleton lines
            const visualGap = 4;
            el.style.gap = `${visualGap}px`;
            el.style.backgroundColor = "transparent"; // Container is transparent
            el.setAttribute("data-sk", "text-group");

            // Calculate adjusted line height
            const totalGapHeight = visualGap * (node.lines - 1);
            const adjustedLineHeight = node.lines > 1
                ? (node.height * node.lines - totalGapHeight) / node.lines
                : node.height; // Note: node.height here comes from inferNode which is set to lineHeight

            // Use the inferred line height, or fallback if something went wrong
            const validLineHeight = node.height;

            // Use exact text lines if available
            if (node.textLines && node.textLines.length > 0) {
                node.textLines.forEach((lineData, i) => {
                    const line = document.createElement("div");
                    line.style.width = `${lineData.width}px`;
                    line.style.height = `${lineData.height}px`; // Use exact captured height
                    line.style.backgroundColor = config?.color || "#9ca3af";
                    line.style.borderRadius = `${typeof config?.borderRadius === 'number' ? config.borderRadius : (node.radius || 4)}px`;
                    line.style.flexShrink = "0"; // Prevent shrinking

                    // Leaf node animations
                    if (!['fade-in', 'slide-in', 'breathing', 'bounce'].includes(anim)) {
                        line.classList.add(`sk-anim-${anim}`);
                    }
                    el.appendChild(line);
                });
            } else {
                // Fallback for when textLines extraction failed
                for (let i = 0; i < node.lines; i++) {
                    const line = document.createElement("div");
                    line.style.width = i === node.lines - 1 && node.lines > 1 ? "60%" : "100%"; // Last line short
                    line.style.height = `${validLineHeight}px`; 
                    line.style.backgroundColor = config?.color || "#9ca3af"; // Darker line color
                    line.style.borderRadius = `${typeof config?.borderRadius === 'number' ? config.borderRadius : (node.radius || 4)}px`;
                    
                    if (!['fade-in', 'slide-in', 'breathing', 'bounce'].includes(anim)) {
                         line.classList.add(`sk-anim-${anim}`);
                    }

                    el.appendChild(line);
                }
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

            el.setAttribute("data-sk", "group");

            node.children.forEach(child => {
                el.appendChild(renderSkeleton(child, config));
            });
            return el;
        }

        return el;
    } catch (err) {
        console.error("Error rendering skeleton node:", err, node);
        const errorEl = document.createElement("div");
        errorEl.style.color = "red";
        errorEl.textContent = "Skeleton Error";
        return errorEl;
    }
}
