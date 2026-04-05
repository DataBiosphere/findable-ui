#!/usr/bin/env bash
# Build and install a local copy of findable-ui into the consuming project.
#
# Usage: run from the consuming project directory (e.g. ncpi-dataset-catalog):
#   ../findable-ui/scripts/link.sh
#   — or, if the consumer has a thin wrapper in package.json:
#   npm run link-findable
#
# Workflow:
#   1. Ctrl+C to stop your running dev server
#   2. Run this script (or hit up-arrow to re-run)
#   3. The script builds, installs, and restarts the dev server for you
#
# How it works:
#   - Compiles findable-ui's TypeScript source into lib/
#   - Packs lib/, src/, and types/ into a tarball (see "files" in package.json)
#   - Installs the tarball into the consumer's node_modules WITHOUT modifying
#     the consumer's package.json (--no-save), so "npm install" can restore
#     the registry version at any time (see unlink.sh)
#   - Clears the Next.js cache (.next/) so the dev server picks up the new code
#   - Starts the dev server in the foreground

set -euo pipefail

# Resolve the absolute path to the findable-ui repo (one level up from scripts/).
FINDABLE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Remember where the consumer project is so we can cd back after building.
CONSUMER_DIR="$PWD"

echo "Building findable-ui from $FINDABLE_DIR..."
cd "$FINDABLE_DIR"

# Compile TypeScript to lib/. Called directly to avoid triggering npm lifecycle
# scripts (e.g. "prepare" would run husky install, which is unnecessary here).
./node_modules/.bin/tsc

# Pack the compiled output into a tarball in the system temp directory.
# HUSKY=0 prevents husky from installing git hooks during npm pack's "prepare" step.
# Capture the tarball filename from npm pack's stdout to avoid globbing stale files.
PACK_DIR="${TMPDIR:-/tmp}"
TARBALL_NAME=$(HUSKY=0 npm pack --pack-destination "$PACK_DIR" --quiet | tail -1)
TARBALL="$PACK_DIR/$TARBALL_NAME"

cd "$CONSUMER_DIR"
echo "Installing $TARBALL..."

# Back up the lockfile before install so we can restore it afterward.
# npm install --no-save still modifies package-lock.json, and we don't want
# linking to leave lockfile churn in the consumer's working tree.
# A trap ensures cleanup even if npm install fails (set -e would exit before
# the restore step otherwise).
LOCKFILE_BACKUP=""
if [ -f package-lock.json ]; then
  LOCKFILE_BACKUP="$(mktemp)"
  cp package-lock.json "$LOCKFILE_BACKUP"
fi
cleanup() {
  if [ -n "$LOCKFILE_BACKUP" ]; then
    cp "$LOCKFILE_BACKUP" package-lock.json
    rm -f "$LOCKFILE_BACKUP"
  fi
  rm -f "$TARBALL"
}
trap cleanup EXIT

# Install the tarball into node_modules.
# --no-save: don't update package.json (keeps the registry version pinned)
# --ignore-scripts: skip lifecycle scripts from the installed package
# --silent: suppress npm's verbose output
npm install --no-save --ignore-scripts --silent "$TARBALL"

# Restore lockfile and clean up immediately rather than waiting for EXIT trap,
# so package-lock.json isn't left modified while the dev server runs.
cleanup
trap - EXIT

# Next.js caches compiled modules in .next/. Without clearing it after swapping
# the findable-ui package, the dev server will serve stale code.
rm -rf .next

echo "Linked local findable-ui. Starting dev server..."

# Start the dev server in the foreground. Ctrl+C stops it, then hit up-arrow
# to re-run this script after making more changes in findable-ui.
npm run dev
