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

# Remove the linked copy so npm install is forced to fetch from the registry.
# Without this, npm may skip the install if the version already satisfies the lockfile.
rm -rf node_modules/@databiosphere/findable-ui

# Reinstall from the lockfile. Using no package args ensures npm resolves the
# exact pinned version from package-lock.json rather than potentially upgrading
# within the semver range.
npm install

echo "Restored registry version of findable-ui."
