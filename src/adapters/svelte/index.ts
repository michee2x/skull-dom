import { Action } from "svelte/action";
import { attachSkeleton } from "../../core/lifecycle/attachSkeleton.js";

/**
 * A Svelte Action that attaches a skeleton when `loading` is true.
 * 
 * Usage:
 * <div use:skeleton={loading}>...</div>
 */
export const skeleton: Action<HTMLElement, boolean> = (node, loading) => {
    let cleanup: (() => void) | null = null;

    // Initial state
    if (loading) {
        cleanup = attachSkeleton(node);
    }

    return {
        update(newLoading) {
            if (newLoading && !cleanup) {
                cleanup = attachSkeleton(node);
            } else if (!newLoading && cleanup) {
                cleanup();
                cleanup = null;
            }
        },
        destroy() {
            if (cleanup) {
                cleanup();
                cleanup = null;
            }
        }
    };
};
