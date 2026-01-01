# 💀 SkullDOM
> **Automagic skeleton screens for any framework.**
> Zero config. Zero manual styles. Just robust, layout-aware loading states.

## Why SkullDOM?

Most skeleton libraries require you to manually build "skeleton versions" of your components. You end up maintaining two UIs: the real one and the fake one.

**SkullDOM is different.**
It looks at your **existing DOM**, infers its layout (text, images, grids, flex), and overlays a pixel-perfect skeleton on top of it.

- **Framework Agnostic:** First-class adapters for React, Vue, Svelte, Solid, and Vanilla.
- **Zero Layout Shift:** It overlays perfectly on your actual elements.
- **Automagic Inference:** Detects text lines, border radii, and flex gaps automatically.
- **Memory Safe:** Uses `WeakMap` to ensure skeletons are garbage collected automatically.

---

## 📦 Installation

```bash
npm install skull-dom
```

---

## 🚀 Quick Start

### 1. Vanilla / HTML Variables
Add attributes to your HTML. No JS required.

```html
<!-- 1. Import the utility once in your app entry -->
<script>
  import { initSkeletonObserver } from 'skull-dom/vanilla';
  initSkeletonObserver();
</script>

<!-- 2. Toggle the attribute when loading -->
<div data-skeleton="loading">
  <h1>My Content</h1>
  <p>SkullDOM will infer this text structure and cover it.</p>
</div>
```

### 2. React
Use the `useSkeleton` hook.

```tsx
import { useRef } from 'react';
import { useSkeleton } from 'skull-dom/react';

function UserCard({ isLoading, user }) {
  const ref = useRef(null);
  
  // Automagically handles attach/detach lifecycle
  useSkeleton(ref, isLoading);

  return (
    <div ref={ref} className="card">
      <img src={user.avatar} className="avatar" />
      <h3>{user.name}</h3>
    </div>
  );
}
```

### 3. Vue
Use the `v-skeleton` directive.

```vue
<script setup>
import { vSkeleton } from 'skull-dom/vue';
defineProps(['loading']);
</script>

<template>
  <div v-skeleton="loading" class="card">
    <!-- content -->
  </div>
</template>
```

### 4. Svelte
Use the `skeleton` action.

```svelte
<script>
  import { skeleton } from 'skull-dom/adapters/svelte';
  export let loading = true;
</script>

<div use:skeleton={loading}>
  <!-- content -->
</div>
```

### 5. SolidJS
Use the `skeleton` directive.

```jsx
import { skeleton } from 'skull-dom/solid';

<div use:skeleton={isLoading()}>
  {/* content */}
</div>
```

---

## 🧠 How it Works

SkullDOM operates on a simple "Overlay" mental model:

1.  **Probe:** It scans your target DOM element and measures computed styles (width, height, margin, padding, line-height, etc.).
2.  **Infer:** It creates a lightweight tree representation of what matters (Text lines? Block? Flex group?).
3.  **Render:** It builds a mirrored DOM structure with gray backgrounds and shimmer animations.
4.  **Overlay:** It sets your original element to `visibility: hidden` and absolutely positions the skeleton layer directly on top of it.

### Important: You need content!
Because SkullDOM **infers** from your DOM, your elements need to exist in the DOM (even if empty).
*   ✅ **Good:** Render your component with empty strings or optional chaining.
*   ❌ **Bad:** `if (loading) return null;` (There is nothing to infer!)

**Correct Pattern:**
```jsx
// React Example
function Card({ loading, data }) {
  const ref = useRef(null);
  useSkeleton(ref, loading);

  return (
    <div ref={ref}>
      {/* Render structure even if data is missing! */}
      <h1>{data?.title || 'Placeholder Title'}</h1> 
    </div>
  )
}
```

---

## 🧩 API Reference

### Core (Advanced)
If you are building your own adapter, import from the root.

```ts
import { attachSkeleton } from 'skull-dom';

// Returns a cleanup function
const cleanup = attachSkeleton(myElement);

// Later...
cleanup();
```

### Styling
Currently, SkullDOM injects a default gray theme (`#d1d5db` base, `#9ca3af` text lines) with a modest border radius. 
Future versions will expose CSS variables for theming.

---

## 📄 License
MIT
