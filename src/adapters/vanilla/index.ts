import { attachSkeleton } from "../../core/lifecycle/attachSkeleton.js";

const cleanupMap = new WeakMap<HTMLElement, () => void>();

/**
 * Initializes a MutationObserver to automatically manage skeletons
 * based on the `data-skeleton="loading"` attribute.
 * 
 * Usage:
 * initSkeletonObserver();
 * 
 * // Then in HTML:
 * // <div data-skeleton="loading">...</div>
 */
export function initSkeletonObserver() {
    // 1. Define logic to handle a single element's state
    const handleElement = (el: HTMLElement) => {
        const state = el.getAttribute("data-skeleton");

        if (state === "loading" && !cleanupMap.has(el)) {
            // Start loading
            const cleanup = attachSkeleton(el);
            cleanupMap.set(el, cleanup);
        } else if (state !== "loading" && cleanupMap.has(el)) {
            // Stop loading
            cleanupMap.get(el)!();
            cleanupMap.delete(el);
        }
    };

    // 2. Initialize observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "data-skeleton") {
                handleElement(mutation.target as HTMLElement);
            }
        });
    });

    // 3. Start observing
    if (typeof document !== 'undefined') {
        observer.observe(document.body, {
            subtree: true,
            attributes: true,
            attributeFilter: ["data-skeleton"],
        });

        // 4. Initial scan for elements that are ALREADY loading on page load
        document.querySelectorAll<HTMLElement>("[data-skeleton]").forEach(handleElement);
    }

    return observer;
}
