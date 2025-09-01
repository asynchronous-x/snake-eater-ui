#!/usr/bin/env node

import { mkdirSync, copyFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Ensure dist directory exists
const distDir = join(rootDir, 'dist');
const fontsSourceDir = join(rootDir, 'stories', 'fonts');
const fontsDestDir = join(distDir, 'fonts');

console.log('Creating dist directory...');
mkdirSync(distDir, { recursive: true });
mkdirSync(fontsDestDir, { recursive: true });

// Run the rollup build
console.log('Running rollup build...');
try {
  execSync('npx rollup -c', { stdio: 'inherit', cwd: rootDir });
} catch (error) {
  console.error('Rollup build failed:', error);
}

// Copy font files
console.log('Copying font files...');
if (existsSync(fontsSourceDir)) {
  const fontFiles = readdirSync(fontsSourceDir).filter(file => 
    file.endsWith('.woff') || file.endsWith('.woff2')
  );
  
  fontFiles.forEach(file => {
    const src = join(fontsSourceDir, file);
    const dest = join(fontsDestDir, file);
    console.log(`  Copying ${file}...`);
    copyFileSync(src, dest);
  });
  
  console.log(`Copied ${fontFiles.length} font files to dist/fonts/`);
} else {
  console.warn('Fonts directory not found:', fontsSourceDir);
}

console.log('Build complete!');