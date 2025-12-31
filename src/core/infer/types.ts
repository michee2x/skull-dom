export interface SkeletonBase {
    width: number;
    height: number;
    radius?: number;
    padding?: string;
    margin?: string;
    border?: string;
    hint?: string; // Tailwind classes from data-skeleton attribute
}

export interface SkeletonText extends SkeletonBase {
    kind: "text";
    lines: number;
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
    justifyContent?: string; // justify-content (e.g., "space-between", "center")
    alignItems?: string; // align-items (e.g., "center", "flex-start")
    flexWrap?: string; // flex-wrap (e.g., "wrap", "nowrap")
    gridTemplateColumns?: string; // grid-template-columns
    gridTemplateRows?: string; // grid-template-rows
}

export type SkeletonNode = SkeletonBlock | SkeletonText | SkeletonGroup;
