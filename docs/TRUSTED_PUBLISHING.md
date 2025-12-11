# Trusted Publishing Setup for NPM

This repository uses GitHub's trusted publishing workflow to securely publish packages to npm without using long-lived access tokens.

## What is Trusted Publishing?

Trusted publishing is a security feature that allows GitHub Actions to publish packages to npm using short-lived, automatically generated tokens via OpenID Connect (OIDC). This eliminates the need to store long-lived npm tokens as repository secrets, reducing the attack surface and improving supply chain security.

## Configuration

### GitHub Actions Workflow

The `.github/workflows/release-please.yml` workflow is configured with the following settings for trusted publishing:

#### Required Permissions

```yaml
permissions:
  contents: write # Required for release-please to create releases
  pull-requests: write # Required for release-please to create PRs
  id-token: write # Required for trusted publishing to npm
```

The `id-token: write` permission enables the workflow to request OIDC tokens from GitHub's OIDC provider.

#### Node.js Setup

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "22.12.0"
    registry-url: "https://registry.npmjs.org"
    always-auth: true # Enable authentication for trusted publishing
```

The `always-auth: true` setting ensures that authentication is enabled when publishing packages.

#### Publishing with Provenance

```yaml
- name: Publish to NPM
  run: npm publish --provenance --access public
```

The `--provenance` flag enables build provenance, which creates a publicly verifiable link between the package and its source code and build. The `--access public` flag ensures the package is published as public.

## NPM Setup Requirements

To enable trusted publishing for this package on npm, you need to:

1. **Log in to npm** and navigate to the package settings for `@databiosphere/findable-ui`
2. **Add a GitHub Actions Publishing Workflow**:

   - Go to the package's publishing settings
   - Click "Add GitHub Actions Publishing Workflow"
   - Configure the trusted publisher with:
     - **Repository**: `DataBiosphere/findable-ui`
     - **Workflow**: `.github/workflows/release-please.yml`
     - **Environment**: (leave blank, no environment is used)

3. **Verify the Configuration**:
   - Ensure the trusted publisher is listed in the package settings
   - The workflow will use OIDC to authenticate automatically when publishing

## Security Benefits

- **No Long-Lived Tokens**: Eliminates the need to store npm access tokens as GitHub secrets
- **Automatic Rotation**: Tokens are short-lived and automatically generated for each workflow run
- **Build Provenance**: The `--provenance` flag creates verifiable attestations linking the package to its source
- **Reduced Attack Surface**: Compromised secrets cannot be used outside the workflow context
- **Audit Trail**: All publishes are tied to specific GitHub Actions workflow runs

## Migration Notes

### Removed Configuration

The following configuration is no longer needed with trusted publishing:

- **Repository Secret**: `DATABIOSPHERE_FINDABLE_UI_NPM_PUBLISH_TOKEN` - This secret can be safely removed from the repository settings as it is no longer used. **Important**: Only remove this secret after confirming the trusted publishing workflow works successfully in production to avoid disrupting the release process.
- **NODE_AUTH_TOKEN Environment Variable**: No longer required in the publish step

### Workflow Changes

1. Added `id-token: write` permission
2. Added `always-auth: true` to `setup-node` action
3. Removed `NODE_AUTH_TOKEN` environment variable from publish step
4. Added `--provenance` and `--access public` flags to `npm publish`

## Testing

To test the trusted publishing workflow:

1. Create a test commit on a feature branch
2. Merge to the `main` branch
3. If the commit triggers a release (based on conventional commits), the workflow will:
   - Create a release PR via release-please
   - Once merged, create a GitHub release
   - Automatically publish to npm using trusted publishing

Monitor the workflow run in the Actions tab to verify successful publication.

## References

- [npm Trusted Publishers Documentation](https://docs.npmjs.com/trusted-publishers)
- [GitHub: Publishing Node.js Packages](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages/publishing-nodejs-packages-from-github-actions)
- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements)
- [OpenID Connect in GitHub Actions](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

## Troubleshooting

### Publishing Fails with Authentication Error

If the workflow fails with an authentication error:

1. Verify that trusted publishing is properly configured on npm for the package
2. Ensure the repository, workflow path, and environment (if any) match exactly in the npm settings
3. Confirm that the workflow has the `id-token: write` permission

### Provenance Attestation Not Generated

If the package is published but provenance is not attached:

1. Ensure the `--provenance` flag is included in the `npm publish` command
2. Verify that the workflow has `id-token: write` permission
3. Check that the package is being published from a supported environment (GitHub Actions)

### Package Access Issues

If the package fails to publish due to access issues:

1. Ensure the `--access public` flag is set (for public packages)
2. Verify that the npm package settings allow public access
3. Confirm that the organization and package name are correct
