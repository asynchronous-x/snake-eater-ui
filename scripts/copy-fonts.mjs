#!/usr/bin/env node

import { readdir, copyFile, mkdir, existsSync } from 'fs';
import { promisify } from 'util';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readdirAsync = promisify(readdir);
const copyFileAsync = promisify(copyFile);
const mkdirAsync = promisify(mkdir);

const sourceDir = join(__dirname, '..', 'stories', 'fonts');
const destDir = join(__dirname, '..', 'dist', 'fonts');

async function copyFonts() {
  try {
    // Ensure destination directory exists
    if (!existsSync(destDir)) {
      await mkdirAsync(destDir, { recursive: true });
    }

    // Copy font files
    const fontExtensions = ['.woff', '.woff2'];
    let copiedCount = 0;

    const files = await readdirAsync(sourceDir);
    
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (fontExtensions.includes(ext)) {
        const sourcePath = join(sourceDir, file);
        const destPath = join(destDir, file);
        await copyFileAsync(sourcePath, destPath);
        console.log(`Copied: ${file}`);
        copiedCount++;
      }
    }
    
    console.log(`✓ Copied ${copiedCount} font files to dist/fonts/`);
  } catch (error) {
    console.error('Error copying fonts:', error);
    process.exit(1);
  }
}

copyFonts();