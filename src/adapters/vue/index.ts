import { ObjectDirective } from "vue";
import { attachSkeleton } from "../../core/lifecycle/attachSkeleton.js";

// Extend HTMLElement to store cleanup function
interface HTMLElementWithCleanup extends HTMLElement {
    _skCleanup?: () => void;
}

/**
 * A Vue directive that attaches a skeleton when the value is true.
 * 
 * Usage:
 * <div v-skeleton="loading"></div>
 */
export const vSkeleton: ObjectDirective<HTMLElementWithCleanup, boolean> = {
    mounted(el, binding) {
        if (binding.value) {
            el._skCleanup = attachSkeleton(el);
        }
    },

    updated(el, binding) {
        // If value turned true and we don't have cleanup, attach
        if (binding.value && !el._skCleanup) {
            el._skCleanup = attachSkeleton(el);
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
