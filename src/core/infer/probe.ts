export interface ProbeResult {
  width: number;
  height: number;
  display: string;
  borderRadius: string;
  gap: number;
  children: HTMLElement[];
  textNodes: Text[];
  styles: CSSStyleDeclaration;
  skeletonHint?: string; // Tailwind classes from data-skeleton
  skeletonType?: 'block' | 'text' | 'group' | 'skip'; // Override from data-skeleton-type
  // Flex/Grid layout properties
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
}

export function probe(el: HTMLElement): ProbeResult {
  // 1. Measure the exact pixel size and position
  const rect = el.getBoundingClientRect();
  

  // 2. Read the full CSS styles (display, padding, etc.)
  const styles = window.getComputedStyle(el);
  
  // 3. Read skeleton hints from data attributes
  const hint = el.getAttribute('data-skeleton');
  const type = el.getAttribute('data-skeleton-type');
  
  console.log("gap: ", styles.gap)
  return {
    width: rect.width,
    height: rect.height,
    display: styles.display,
    borderRadius: styles.borderRadius,
    gap: parseFloat(styles.gap || "0"), // Parse '10px' to 10
    children: Array.from(el.children) as HTMLElement[], // Convert HTMLCollection to Array
    // 4. Find only the actual text nodes (nodeType 3 is text)
    textNodes: Array.from(el.childNodes).filter((n): n is Text => n.nodeType === 3),
    styles,
    skeletonHint: hint || undefined,
    skeletonType: type as any || undefined,
    // Flex/Grid layout properties
    justifyContent: styles.justifyContent !== 'normal' ? styles.justifyContent : undefined,
    alignItems: styles.alignItems !== 'normal' ? styles.alignItems : undefined,
    flexWrap: styles.flexWrap !== 'nowrap' ? styles.flexWrap : undefined,
    gridTemplateColumns: styles.gridTemplateColumns !== 'none' ? styles.gridTemplateColumns : undefined,
    gridTemplateRows: styles.gridTemplateRows !== 'none' ? styles.gridTemplateRows : undefined
  };
}
