// publish.js
const { execSync } = require("child_process");

// Read the version type argument (patch/minor/major) passed from npm script
const versionType = process.argv[2] || "patch";

if (!["patch", "minor", "major"].includes(versionType)) {
  console.error("Invalid version type! Use patch, minor, or major.");
  process.exit(1);
}

try {
  console.log(`Running npm version ${versionType}...`);
  execSync(`npm version ${versionType}`, { stdio: "inherit" });

  console.log("Building the package...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("Publishing to npm...");
  execSync("npm publish", { stdio: "inherit" });

  console.log("Publish process completed successfully!");
} catch (error) {
  console.error("Error during publish process:", error);
  process.exit(1);
}
