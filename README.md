# vite-plus-jest-dom-repro

Minimal reproduction for [voidzero-dev/vite-plus#897](https://github.com/voidzero-dev/vite-plus/issues/897).

## Issue

After `vp migrate`, `@testing-library/jest-dom/vitest` fails to register custom matchers because the `expect` instance it extends differs from the one used at test runtime.

## Steps to reproduce

```bash
# 1. Verify pre-migration tests pass
git checkout pre-migration
npm install
npx vitest run  # ✅ passes

# 2. Migrate to Vite+
vp migrate

# 3. Run tests with Vite+
vp test run     # ❌ Error: Invalid Chai property: toBeInTheDocument
```

Or use the already-migrated `main` branch:

```bash
git checkout main
npm install
vp test run     # ❌ fails
```

## Workaround

Replace the automatic setup with manual matcher extension:

```js
// src/setupTests.js
// import '@testing-library/jest-dom/vitest';  // ← does NOT work
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
expect.extend(matchers);
```
