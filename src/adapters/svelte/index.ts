import { Action } from "svelte/action";
import { attachSkeleton } from "../../core/lifecycle/attachSkeleton.js";

import { SkeletonConfig } from "../../core/infer/types.js";

type SkeletonParams = boolean | { loading: boolean, config?: SkeletonConfig };

/**
 * A Svelte Action that attaches a skeleton when `loading` is true.
 * 
 * Usage:
 * <div use:skeleton={loading}>...</div>
 * <div use:skeleton={{ loading, config: { animation: 'wave' } }}>...</div>
 */
export const skeleton: Action<HTMLElement, SkeletonParams> = (node, params) => {
    let cleanup: (() => void) | null = null;

    const isLoading = (p: SkeletonParams) => typeof p === 'boolean' ? p : p.loading;
    const getConfig = (p: SkeletonParams) => typeof p === 'boolean' ? undefined : p.config;

    // Initial state
    if (isLoading(params)) {
        cleanup = attachSkeleton(node, getConfig(params));
    }

    return {
        update(newParams) {
            const loading = isLoading(newParams);
            const config = getConfig(newParams);

            if (loading && !cleanup) {
                cleanup = attachSkeleton(node, config);
            } else if (!loading && cleanup) {
                cleanup();
                cleanup = null;
            }
            // Ideally we also handle config updates while loading by re-attaching
        },
        destroy() {
            if (cleanup) {
                cleanup();
                cleanup = null;
            }
        }
    };
};
