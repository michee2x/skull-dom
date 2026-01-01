import { useEffect } from "react";
import { attachSkeleton } from "../../core/lifecycle/attachSkeleton.js";

/**
 * A React hook that automatically attaches a skeleton overlay to the referenced element
 * when `loading` is true.
 *
 * Usage:
 * const ref = useRef(null);
 * useSkeleton(ref, loading);
 * <div ref={ref}>Content</div>
 */
export function useSkeleton(
    ref: React.RefObject<HTMLElement | null>,
    loading: boolean
) {
    useEffect(() => {
        const element = ref.current;

        // Only attach if we have an element AND we are loading
        if (!element || !loading) return;

        // Attach returns a cleanup function
        const cleanup = attachSkeleton(element);

        // React calls this when:
        // 1. Component unmounts
        // 2. dependencies change (loading becomes false)
        return () => {
            cleanup();
        };
    }, [loading, ref]); // re-run if loading state or ref changes
}
