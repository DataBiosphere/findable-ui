#!/usr/bin/env bash
# Restore the registry version of findable-ui in the consuming project.
#
# Usage: run from the consuming project directory (e.g. ncpi-dataset-catalog):
#   ../findable-ui/scripts/unlink.sh
#   — or, if the consumer has a thin wrapper in package.json:
#   npm run unlink-findable
#
# How it works:
#   link.sh installs a local tarball with --no-save, so the consumer's
#   package.json still points to the registry version.
#   This script simply reinstalls findable-ui from the registry, which
#   overwrites the local copy in node_modules with the published version.

set -euo pipefail

echo "Restoring findable-ui from registry..."

# Reinstall all dependencies from the lockfile. Since link.sh used --no-save,
# package.json and package-lock.json are unchanged, so this restores the exact
# pinned version of findable-ui (and verifies everything else is in sync).
npm install

echo "Restored registry version of findable-ui."
