import { createEffect, onCleanup } from "solid-js";
import { attachSkeleton } from "../../core/lifecycle/attachSkeleton.js";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            skeleton: boolean;
        }
    }
}

/**
 * A SolidJS directive that attaches a skeleton when the signal value is true.
 * 
 * Usage:
 * <div use:skeleton={loading()}>...</div>
 */
export function skeleton(el: HTMLElement, accessor: () => boolean) {
    createEffect(() => {
        const loading = accessor();

        if (loading) {
            const detach = attachSkeleton(el);
            onCleanup(() => detach());
        }
    });
}
