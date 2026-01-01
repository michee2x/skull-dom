type OverlayRecord = {
  skeletonEl: HTMLElement;
  restoreVisibility: string;
  originalPosition?: string; // Optional: restore parent position sanity if needed
};

export class SkeletonOverlayManager {
  private overlays = new WeakMap<HTMLElement, OverlayRecord>();

  has(target: HTMLElement): boolean {
    return this.overlays.has(target);
  }

  attach(target: HTMLElement, skeletonEl: HTMLElement): OverlayRecord {
    // 1. Idempotency check
    if (this.overlays.has(target)) {
      // If already has a skeleton, return the existing record.
      // We do NOT replace it. "First one wins" or "Explicit detach needed" strategies.
      // Here we assume if it's already there, keep it.
      return this.overlays.get(target)!;
    }

    const parent = target.parentElement;
    if (!parent) {
      console.warn("SkullDOM: Target element has no parent, cannot attach overlay.");
      // Return a dummy record so the caller doesn't crash, but nothing happened.
      return { skeletonEl, restoreVisibility: "" };
    }

    // 2. Ensure positioning context on parent
    const parentStyle = window.getComputedStyle(parent);
    let originalPosition: string | undefined;
    
    if (parentStyle.position === "static") {
      originalPosition = parent.style.position;
      parent.style.position = "relative";
    }

    // 3. Save original visibility & hide content
    const restoreVisibility = target.style.visibility;
    target.style.visibility = "hidden";

    // 4. Prepare skeleton overlay
    skeletonEl.style.position = "absolute";
    skeletonEl.style.top = "0";
    skeletonEl.style.left = "0";
    skeletonEl.style.width = "100%";
    skeletonEl.style.height = "100%";
    skeletonEl.style.pointerEvents = "none"; 
    // Ideally we might want z-index, but usually stacking context of parent handles it.
    // skeletonEl.style.zIndex = "10"; 

    // 5. Mount
    parent.appendChild(skeletonEl);

    const record: OverlayRecord = {
      skeletonEl,
      restoreVisibility,
      originalPosition
    };

    this.overlays.set(target, record);
    return record;
  }

  detach(target: HTMLElement) {
    const record = this.overlays.get(target);
    if (!record) return;

    // 1. Remove DOM element
    record.skeletonEl.remove();

    // 2. Restore visibility
    target.style.visibility = record.restoreVisibility;

    // 3. (Optional) Restore parent position if we touched it?
    // This is tricky. If we set it to relative, and now we unset it, 
    // it might break other things if they relied on it being relative in the meantime.
    // For safety in this MVP, we often leave it relative. 
    // But if we want to be strict:
    /*
    if (record.originalPosition !== undefined) {
       const parent = target.parentElement;
       if (parent) parent.style.position = record.originalPosition;
    }
    */

    // 4. Clean up registry
    this.overlays.delete(target);
  }
}

// Singleton instance
export const skeletonOverlayManager = new SkeletonOverlayManager();
