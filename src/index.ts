// Core Lifecycle (The main public API)
export { attachSkeleton } from "./core/lifecycle/attachSkeleton.js";
export { skeletonOverlayManager } from "./core/lifecycle/SkeletonOverlayManager.js";

// Core Engine (Exposed for advanced users/debugging)
export { inferNode } from "./core/infer/inferNode.js";
export { renderSkeleton } from "./core/render/renderSkeleton.js";

// Types
export type { SkeletonNode, SkeletonConfig } from "./core/infer/types.js";
