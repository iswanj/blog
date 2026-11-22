import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(cliRoot, "..", "..");
const pkgJsonPath = path.join(cliRoot, "package.json");

const args = process.argv.slice(2);
const noRegistry = args.includes("--no-registry");
const positionalArgs = args.filter((arg) => !arg.startsWith("--"));
const releaseType = positionalArgs[0] || "patch";

const VALID_TYPES = new Set(["patch", "minor", "major"]);
if (!VALID_TYPES.has(releaseType)) {
  console.error(
    `Error: Invalid release type "${releaseType}". Expected one of: patch, minor, major.`
  );
  process.exit(1);
}

const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)$/;

function parseSemver(version) {
  if (typeof version !== "string") return null;
  const match = version.trim().match(SEMVER_RE);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function compareSemver(a, b) {
  const pa = parseSemver(a);
  const pb = parseSemver(b);
  if (!pa || !pb) return 0;
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  return 0;
}

const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
const candidates = [];

if (parseSemver(pkg.version)) {
  candidates.push(pkg.version.trim());
}

if (!noRegistry) {
  try {
    const registryVersion = execFileSync(
      "npm",
      ["view", pkg.name, "version"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    ).trim();
    if (parseSemver(registryVersion)) {
      candidates.push(registryVersion);
    }
  } catch {
    // Package may not exist on npm yet or registry may be unreachable offline.
  }
}

try {
  const tagsOutput = execFileSync("git", ["tag", "--list", "v*"], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  for (const line of tagsOutput.split(/\r?\n/)) {
    const match = line.trim().match(/^v(\d+\.\d+\.\d+)$/);
    if (match) {
      candidates.push(match[1]);
    }
  }
} catch {
  // Ignore git errors when outside a git repo or without tags.
}

if (candidates.length === 0) {
  console.error("Error: Could not determine a valid SemVer baseline version.");
  process.exit(1);
}

candidates.sort(compareSemver);
const baseVersion = candidates[candidates.length - 1];
const [major, minor, patch] = parseSemver(baseVersion);

let nextVersion;
if (releaseType === "major") {
  nextVersion = `${major + 1}.0.0`;
} else if (releaseType === "minor") {
  nextVersion = `${major}.${minor + 1}.0`;
} else {
  nextVersion = `${major}.${minor}.${patch + 1}`;
}

pkg.version = nextVersion;
fs.writeFileSync(pkgJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");

if (process.env.GITHUB_OUTPUT) {
  const outputLines = [
    `previous_version=${baseVersion}`,
    `version=${nextVersion}`,
    `tag=v${nextVersion}`,
  ].join("\n");
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${outputLines}\n`, "utf8");
}

console.log(
  `Bumped ${pkg.name}: ${baseVersion} -> ${nextVersion} (${releaseType})`
);
