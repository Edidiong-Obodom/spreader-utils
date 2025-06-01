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

const commitMod = (message, ver) => {
  if (!message) {
    return `chore(release): bump version to v${ver}`;
  } else if (message.includes(":")) {
    const modifyer = message.split(":").map((msg, i) => {
      if (i === 1 && msg.startsWith(" ")) {
        return " v" + ver + msg;
      } else {
        return msg;
      }
    });
    return modifyer.join(":");
  } else {
    return `chore(release): bump version to v${ver} code change`;
  }
};

try {
  const packageVersion = require("./package.json");
  const commitMsg = commitMod(process.argv[3], packageVersion.version);

  const codeCommitMsg = commitMsg ;

  console.log("Adding all changes to git...");
  execSync("git add -A", { stdio: "inherit" });

  console.log(`Committing with message: "${codeCommitMsg}"`);
  execSync(`git commit -m "${codeCommitMsg}"`, { stdio: "inherit" });

  console.log(`Bumping version with npm version ${versionType}...`);
  execSync(`npm version ${versionType}`, {
    stdio: "inherit",
  });

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
