#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawTarget = process.argv[2] || "my-mdx-blog";
const targetDir = path.resolve(process.cwd(), rawTarget);
const projectName = path.basename(targetDir);
const templateDir = path.resolve(__dirname, "..", "template");

if (!fs.existsSync(templateDir)) {
  console.error(
    "Error: Template directory not found. Run `node scripts/build-template.mjs` first."
  );
  process.exit(1);
}

if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
  console.error(
    `Error: Target directory "${rawTarget}" already exists and is not empty.`
  );
  process.exit(1);
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      const nextDestName = entry === "_gitignore" ? ".gitignore" : entry;
      copyRecursive(path.join(src, entry), path.join(dest, nextDestName));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

console.log(`\nScaffolding your new MDX blog in ${targetDir}...\n`);
copyRecursive(templateDir, targetDir);

const pkgJsonPath = path.join(targetDir, "package.json");
if (fs.existsSync(pkgJsonPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  pkg.name = projectName
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/^-+|-+$/g, "");
  fs.writeFileSync(pkgJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

function detectPackageManager() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm")) return "pnpm";
  if (ua.startsWith("yarn")) return "yarn";
  if (ua.startsWith("bun")) return "bun";
  return "npm";
}

const pm = detectPackageManager();
const runCmd = pm === "npm" ? "npm run" : pm;

console.log("Done! Your blog is ready.\n");
console.log("Next steps:");
console.log(`  1. cd ${rawTarget}`);
console.log(`  2. ${pm} install`);
console.log("  3. Customize your site colors, name & links in src/blog.config.ts");
console.log(`  4. ${runCmd} dev\n`);
