#!/usr/bin/env node
// scripts/check-a11y.mjs
// Runs axe-core against the built dist/ directory. Fails the build on any
// serious or critical violations.

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
if (!existsSync(distDir)) {
    console.error('[check-a11y] dist/ not found. Run `pnpm build` first.');
    process.exit(1);
}

console.log('[check-a11y] Running axe-core against dist/ ...');
try {
    execSync('npx axe dist --exit', { stdio: 'inherit' });
    console.log('[check-a11y] OK: no serious or critical violations.');
} catch (e) {
    console.error('[check-a11y] FAIL: violations found. See output above.');
    process.exit(1);
}
