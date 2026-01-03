import { ObjectDirective } from "vue";
import { attachSkeleton } from "../../core/lifecycle/attachSkeleton.js";

// Extend HTMLElement to store cleanup function
interface HTMLElementWithCleanup extends HTMLElement {
    _skCleanup?: () => void;
}

import { SkeletonConfig } from "../../core/infer/types.js";

/**
 * A Vue directive that attaches a skeleton when the value is true.
 * Supports:
 * - v-skeleton="loading" (boolean)
 * - v-skeleton="{ loading, config }" (object)
 */
export const vSkeleton: ObjectDirective<HTMLElementWithCleanup, boolean | { loading: boolean, config?: SkeletonConfig }> = {
    mounted(el, binding) {
        const value = binding.value;
        const isLoading = typeof value === 'boolean' ? value : value?.loading;
        const config = typeof value === 'object' ? value.config : undefined;

        if (isLoading) {
            el._skCleanup = attachSkeleton(el, config);
        }
    },

    updated(el, binding) {
        const value = binding.value;
        const isLoading = typeof value === 'boolean' ? value : value?.loading;
        const config = typeof value === 'object' ? value.config : undefined;
        // Note: Changes to config while loading might require re-attaching, but simpler for now implies just on/off toggling.
        // For full reactivity on config, we'd need to detach and re-attach if config changed.
        
        // If value turned true and we don't have cleanup, attach
        if (isLoading && !el._skCleanup) {
            el._skCleanup = attachSkeleton(el, config);
        } // If value turned false and we HAVE cleanup, detach
        else if (!binding.value && el._skCleanup) {
            el._skCleanup();
            el._skCleanup = undefined;
        }
    },

    unmounted(el) {
        if (el._skCleanup) {
            el._skCleanup();
            el._skCleanup = undefined;
        }
    }
};
