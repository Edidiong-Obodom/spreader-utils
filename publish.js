// publish.js
const { execSync } = require("child_process");

// Prevent infinite loops if the script is somehow triggered repeatedly
if (process.env.PUBLISH_IN_PROGRESS === "true") {
  console.log("Publish script already running. Exiting to avoid loop.");
  process.exit(0);
}

process.env.PUBLISH_IN_PROGRESS = "true";

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
