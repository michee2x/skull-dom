import { createEffect, onCleanup } from "solid-js";
import { attachSkeleton } from "../../core/lifecycle/attachSkeleton.js";

import { SkeletonConfig } from "../../core/infer/types.js";

type SkeletonAccessor = boolean | { loading: boolean, config?: SkeletonConfig };

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            skeleton: SkeletonAccessor;
        }
    }
}

/**
 * A SolidJS directive that attaches a skeleton when the signal value is true.
 * 
 * Usage:
 * <div use:skeleton={loading()}>...</div>
 * <div use:skeleton={{ loading: loading(), config: { animation: 'pulse' } }}>...</div>
 */
export function skeleton(el: HTMLElement, accessor: () => SkeletonAccessor) {
    createEffect(() => {
        const value = accessor();
        const loading = typeof value === 'boolean' ? value : value.loading;
        const config = typeof value === 'boolean' ? undefined : value.config;

        if (loading) {
            const detach = attachSkeleton(el, config);
            onCleanup(() => detach());
        }
    });
}
