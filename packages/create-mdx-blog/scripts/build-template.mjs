import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(cliRoot, "..", "..");
const templateDir = path.join(cliRoot, "template");
const overridesDir = path.join(cliRoot, "sample-overrides");

if (fs.existsSync(templateDir)) {
  fs.rmSync(templateDir, { recursive: true, force: true });
}
fs.mkdirSync(templateDir, { recursive: true });

function copyFile(srcRel, destRel = srcRel) {
  const src = path.join(repoRoot, srcRel);
  const dest = path.join(templateDir, destRel);
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(srcAbs, destAbs) {
  fs.mkdirSync(destAbs, { recursive: true });
  for (const entry of fs.readdirSync(srcAbs, { withFileTypes: true })) {
    const srcPath = path.join(srcAbs, entry.name);
    const destPath = path.join(destAbs, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy root configuration files
const rootFiles = [
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "eslint.config.mjs",
  "pnpm-workspace.yaml",
];

for (const file of rootFiles) {
  copyFile(file);
}
copyFile(".gitignore", "_gitignore");

// Clean up root-only scripts/exclusions inside the template's tsconfig & eslint
const templateTsconfigPath = path.join(templateDir, "tsconfig.json");
if (fs.existsSync(templateTsconfigPath)) {
  const tsconfig = JSON.parse(fs.readFileSync(templateTsconfigPath, "utf8"));
  tsconfig.exclude = ["node_modules"];
  fs.writeFileSync(
    templateTsconfigPath,
    `${JSON.stringify(tsconfig, null, 2)}\n`,
    "utf8"
  );
}

// 2. Copy shared engine code (excluding personal posts, personal resume, and personal config)
copyDir(
  path.join(repoRoot, "src", "components"),
  path.join(templateDir, "src", "components")
);
copyDir(
  path.join(repoRoot, "src", "lib"),
  path.join(templateDir, "src", "lib")
);
copyFile("src/mdx-components.tsx");

const appFiles = [
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/opengraph-image.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/app/rss.xml/route.ts",
  "src/app/(posts)/layout.tsx",
];

for (const file of appFiles) {
  copyFile(file);
}

// 3. Overlay generic sample config, sample avatar, 1 sample post, and 1 sample resume
copyDir(overridesDir, templateDir);

console.log(`Built clean starter template at ${templateDir}`);
