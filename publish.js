const { execSync } = require("child_process");

const versionType = process.argv[2] || "patch";

if (!["patch", "minor", "major"].includes(versionType)) {
  console.error("Invalid version type! Use patch, minor, or major.");
  process.exit(1);
}

try {
  console.log(`Bumping version with npm version ${versionType} --no-git-tag-version ...`);
  execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: "inherit" });

  console.log("Building the package...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("Publishing to npm...");
  execSync("npm publish", { stdio: "inherit" });

  console.log("Publish process completed successfully!");
} catch (error) {
  console.error("Error during publish process:", error);
  process.exit(1);
}
