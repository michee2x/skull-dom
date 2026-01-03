import { inferNode } from '../infer/inferNode.js';
import { renderSkeleton } from '../render/renderSkeleton.js';
import { skeletonOverlayManager } from './SkeletonOverlayManager.js';
import { SkeletonConfig } from '../infer/types.js';
import { injectStyles } from '../styles/styles.js';

/**
 * Attaches a skeleton overlay to the target element.
 * Hides the target element (visibility: hidden) and places the skeleton on top.
 * Returns a cleanup function to remove the skeleton and show the target element.
 */
export function attachSkeleton(target: HTMLElement, config?: SkeletonConfig): () => void {
  // 0. Ensure styles are injected
  injectStyles();

  // 1. Check if already controlled
  if (skeletonOverlayManager.has(target)) {
    // If we want to allow re-attaching or updating, we'd handle it here.
    // For now, return a detach handle for the existing one.
    return () => skeletonOverlayManager.detach(target);
  }

  // 2. Infer & Render
  const tree = inferNode(target);
  if (!tree) {
    console.warn("SkullDOM: Could not infer structure for element", target);
    return () => { };
  }

  const skeletonEl = renderSkeleton(tree, config);

  // 3. Delegate to Manager
  skeletonOverlayManager.attach(target, skeletonEl);

  // 4. Return detach closure
  return () => {
    skeletonOverlayManager.detach(target);
  };
}
