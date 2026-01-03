# 💀 SkullDOM

> **Automagic skeleton screens for any framework.**
> Zero config. Zero manual styles. Just robust, layout-aware loading states.

## Why SkullDOM?
Most skeleton libraries require you to manually build "skeleton versions" of your components.
**SkullDOM is different.** It looks at your **existing DOM**, infers its layout (text, images, grids, flex), and overlays a pixel-perfect skeleton on top of it.

- **Framework Agnostic:** First-class adapters for React, Vue, Svelte, Solid, and Vanilla.
- **0 Layout Shift:** Uses `Range` API to capture exact text wrapping and dimensions.
- **12+ Animations:** Built-in premium animations (Wave, Neon, Glimmer, etc.).
- **Automagic Inference:** Detects text lines, border radii, and flex gaps automatically.

---

## 📦 Installation

```bash
npm install skull-dom
```

---

## 🚀 Usage

### React
Use the `useSkeleton` hook.

```tsx
import { useRef } from 'react';
import { useSkeleton } from 'skull-dom/react';

function UserCard({ isLoading, user }) {
  const ref = useRef(null);
  
  // 1. Basic Usage
  useSkeleton(ref, isLoading);

  // 2. With Configuration
  // useSkeleton(ref, isLoading, { 
  //   animation: 'neon', 
  //   color: '#3b82f6' 
  // });

  return (
    <div ref={ref} className="card">
      <img src={user.avatar} />
      <h3>{user.name}</h3>
    </div>
  );
}
```

### Vue
Use the `v-skeleton` directive.

```vue
<script setup>
import { vSkeleton } from 'skull-dom/vue';
defineProps(['loading']);
</script>

<template>
  <!-- Basic -->
  <div v-skeleton="loading" class="card">
    <h1>Content</h1>
  </div>

  <!-- With Configuration -->
  <div v-skeleton="{ loading, config: { animation: 'pulse' } }">
    <h1>Content</h1>
  </div>
</template>
```

### Svelte
Use the `skeleton` action.

```svelte
<script>
  import { skeleton } from 'skull-dom/svelte';
  export let loading = true;
</script>

<!-- Basic -->
<div use:skeleton={loading}>
  <h1>Content</h1>
</div>

<!-- With Configuration -->
<div use:skeleton={{ loading, config: { animation: 'glimmer' } }}>
  <h1>Content</h1>
</div>
```

### SolidJS
Use the `skeleton` directive.

```jsx
import { skeleton } from 'skull-dom/solid';

// Basic
<div use:skeleton={isLoading()}>
  <h1>Content</h1>
</div>

// With Configuration
<div use:skeleton={{ loading: isLoading(), config: { animation: 'wave', borderRadius: 8 } }}>
  <h1>Content</h1>
</div>
```

### Vanilla / HTML
Add `data-skeleton="loading"` to any element.

```html
<!-- 1. Initialize once -->
<script type="module">
  import { initSkeletonObserver } from 'skull-dom/adapters/vanilla';
  initSkeletonObserver();
</script>

<!-- 2. Toggle attribute to show skeleton -->
<div data-skeleton="loading">
  <h1>I am covered!</h1>
</div>

<!-- 3. With Configuration (JSON) -->
<div 
  data-skeleton="loading" 
  data-skeleton-config='{ "animation": "neon", "color": "#10b981" }'
>
  <h1>Custom Style</h1>
</div>
```

---

## 🎨 Animations & Config

You can customize the look and feel by passing a config object.

```typescript
interface SkeletonConfig {
  animation?: 'wave' | 'pulse' | 'glimmer' | 'scan' | 'breathing' 
            | 'fade-in' | 'slide-in' | 'rumble' | 'neon' 
            | 'classic' | 'shimmer-vertical' | 'bounce';
            
  color?: string;          // Base background color (e.g. #d1d5db)
  highlightColor?: string; // Shimmer/Highlight color
  borderRadius?: number;   // Force global border radius
}
```

### Animation Presets
- **`wave`** (Default): Standard left-to-right gradient shimmer.
- **`pulse`**: Opacity fades in and out.
- **`glimmer`**: Thin white reflection shoots across.
- **`scan`**: Cyberpunk-style vertical scanner.
- **`neon`**: Glowing box-shadow pulse.
- **`breathing`**: Subtle scale up/down.
- **`classic`**: Static gray box (no animation).
- And more! (`slide-in`, `fade-in`, `rumble`, `bounce`...)

---

## 🧠 How it Works regarding "Zero Layout Shift"

SkullDOM uses the browser's **Range API** to create a pixel-perfect "snapshot" of your text nodes. 
Instead of guessing how many lines of text you have, it measures the **exact bounding box of every line** as rendered by the browser. 

This means if your text wraps in a unique way around an image, the skeleton will wrap exactly the same way.

---

## 📄 License
MIT
