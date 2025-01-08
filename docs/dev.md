# Get started
**Available on macOS.**
*🚧 It has no version for other platforms, but we are working on it.*

## MacOS

### Development Setup
- Download [postgres.app](https://postgresapp.com/) open it's contents and place files from `versions/latest/*` into `resources/postgres`
- Download [ollama](https://ollama.com/) and place `ollama` binary file from content into `resources/postgres`

### Development Commands
```bash
pnpm install
pnpm dev    # for development 
pnpm build  # for production
```

### Mac App Store (MAS) Build

1. **Prerequisites**:
   - Apple Developer Account
   - Valid provisioning profile
   - App Store Connect setup completed

2. **Environment Setup**:
   ```bash
   # Create .env file with your credentials
   MAC_NOT_APPLE_ID=your.email@example.com
   MAC_NOT_APPLE_PASSWORD=xxxx-xxxx-xxxx-xxxx  # App-specific password
   MAC_NOT_TEAM_ID=YOUR_TEAM_ID                # From Apple Developer Portal
   ```

3. **Provisioning Profile**:
   - Download your provisioning profile from Apple Developer Portal
   - Place it in the `mac` directory

4. **Build for MAS**:
   ```bash
   # Build for Mac App Store
   pnpm build:mas
   ```

### Submitting to App Store

1. **Using Transporter**:
   - Download [Transporter](https://apps.apple.com/us/app/transporter/id1450874784) from Mac App Store
   - Open Transporter
   - Sign in with your Apple ID
   - Click the "+" button
   - Select the `.pkg` file from `dist/mas`
   - Click "Deliver" to upload

2. **After Upload**:
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Navigate to your app
   - Submit for review when ready

### Troubleshooting
- If build fails, check your provisioning profile and certificates
- Ensure all environment variables are set correctly
- Verify your Apple Developer account has proper access