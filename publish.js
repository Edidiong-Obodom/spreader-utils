const { execSync } = require("child_process");

// Prevent infinite loops if the script is somehow triggered repeatedly
if (process.env.PUBLISH_IN_PROGRESS === "true") {
  console.log("Publish script already running. Exiting to avoid loop.");
  process.exit(0);
}

process.env.PUBLISH_IN_PROGRESS = "true";

const versionType = process.argv[2] || "patch";

if (!["patch", "minor", "major"].includes(versionType)) {
  console.error(
    `${versionType} is an ` +
      "invalid version type! Use patch, minor, or major."
  );
  process.exit(1);
}

try {
  const commitMsg = `chore(release): bump version to ${
    require("./package.json").version
  }`;

  const codeCommitMsg = process.argv[3] || `${commitMsg} code change`;

  console.log("Adding all changes to git...");
  execSync("git add -A", { stdio: "inherit" });

  console.log(`Committing with message: "${codeCommitMsg}"`);
  execSync(`git commit -m "${codeCommitMsg}"`, { stdio: "inherit" });

  console.log(`Bumping version with npm version ${versionType}...`);
  execSync(`npm version ${versionType}`, {
    stdio: "inherit",
  });

  console.log("Adding changes to git...");
  execSync("git add package.json package-lock.json", { stdio: "inherit" });

  console.log(`Committing with message: "${commitMsg}"`);
  execSync(`git commit -m "${commitMsg}"`, { stdio: "inherit" });

  console.log("Pushing to origin...");
  execSync("git push", { stdio: "inherit" });

  console.log("Building the package...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("Publishing to npm...");
  execSync("npm publish", { stdio: "inherit" });

  console.log("Publish process completed successfully!");
} catch (error) {
  console.error("Error during publish process:", error);
  process.exit(1);
}
