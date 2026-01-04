# Vercel Deployment Guide for SkullDOM Monorepo

This repository is structured as a **Monorepo**:
- **Root (`/`)**: Contains the `skull-dom` library source and configuration.
- **Website (`/website`)**: Contains the Next.js documentation and demo site.

Because the website depends on the local library, deployment requires specific settings to ensure everything builds in the correct order.

## 1. Project Configuration

When importing your project in Vercel, configure the following settings:

| Setting | Value | Reason |
| :--- | :--- | :--- |
| **Root Directory** | `website` | This tells Vercel that your application lives in the `website` folder. |
| **Framework Preset** | `Next.js` | Vercel should auto-detect this, but verify it. |
| **Build Command** | `npm run build` | **Important**: Use the default or explicitly set this. Our `package.json` handles the monorepo build order. |
| **Install Command** | `npm install` | Default is fine. |

## 2. Why It Works Now

We updated `website/package.json` to handle the build dependency chain:

```json
"scripts": {
  "build": "tsc -p ../tsconfig.json && next build"
}
```

**How the deployment flow works:**
1. **Checkout**: Vercel clones your entire repository.
2. **Setup**: It changes directory to `website` (your Root Directory setting).
3. **Install**: It runs `npm install`. Because `website/package.json` has `"skull-dom": "file:.."`, it creates a link to the parent directory.
4. **Build**: It runs `npm run build`.
   - First, `tsc -p ../tsconfig.json` compiles the `skull-dom` library from the parent folder into `../dist`.
   - Then, `next build` compiles the website. It can now successfully find the `skull-dom` exports in `../dist`.

## 3. Troubleshooting

If you encounter issues:

### "Module 'skull-dom' has no exported member..."
- **Cause**: The library wasn't built before the website tried to use it.
- **Fix**: Ensure the Build Command is running `npm run build` (which includes `tsc ...`). Do NOT set the build command to just `next build`.

### "Cannot find module ... eslint-config-next ..."
- **Cause**: A known issue with ESLint module resolution in some environments.
- **Fix**: We've patched `website/eslint.config.mjs` to use explicit `.js` extensions for imports.

### "File not found" (General)
- **Check**: Ensure `Include source files outside of the Root Directory` is **checked** in Vercel project settings (General > Root Directory). This is usually on by default for monorepos.
