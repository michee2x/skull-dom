export interface SkeletonBase {
    width: number;
    height: number;
    radius?: number;
    padding?: string;
    margin?: string;
    border?: string;
}

export interface SkeletonText extends SkeletonBase {
    kind: "text";
    lines: number;
    textLines?: { width: number; height: number }[];
}

export interface SkeletonBlock extends SkeletonBase {
    kind: "block";
}

export interface SkeletonGroup extends SkeletonBase {
    kind: "group";
    direction: "row" | "column";
    gap: number;
    children: SkeletonNode[];
    // Flex/Grid alignment properties
    justifyContent?: string; 
    alignItems?: string; 
    flexWrap?: string; 
    gridTemplateColumns?: string; 
    gridTemplateRows?: string; 
}

export type AnimationType = 
    | 'pulse' | 'wave' | 'glimmer' | 'scan' | 'breathing' 
    | 'fade-in' | 'slide-in' | 'rumble' | 'neon' 
    | 'classic' | 'shimmer-vertical' | 'bounce';

export interface SkeletonConfig {
    animation?: AnimationType;
    color?: string; // Base color
    highlightColor?: string; // Highlight/Shimmer color
    borderRadius?: number; // Global radius override
}

export type SkeletonNode = SkeletonBlock | SkeletonText | SkeletonGroup;
