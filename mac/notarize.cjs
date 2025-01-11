const dotenv = require('dotenv');
dotenv.config();

module.exports = async function (context) {
  if (!process.env.MAC_NOT_APPLE_ID) {
    console.warn('Skipping notarization because MAC_NOT_APPLE_ID is not set');
    process.exit(0);
  }
  console.log("context.target",process.env.BUILD_TYPE);
 // Skip notarization for MAS builds
 // Skip for MAS builds
 if (process.env.BUILD_TYPE === 'mas') {
  console.log('Skipping notarization for MAS build');
  return;
}

  const { appOutDir, packager } = context;
  const appName = packager.appInfo.productFilename;

  console.log(`Notarizing ${appOutDir}/${appName}.app`);
  console.log('This may take a while, please be patient...');
  console.log(process.env.MAC_NOT_APPLE_ID);
  console.log(process.env.MAC_NOT_APPLE_PASSWORD);
  console.log(process.env.MAC_NOT_TEAM_ID);

  try {
    await require('@electron/notarize').notarize({
      appBundleId: packager.appInfo.id,
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.MAC_NOT_APPLE_ID,
      appleIdPassword: process.env.MAC_NOT_APPLE_PASSWORD,
      teamId: process.env.MAC_NOT_TEAM_ID,
    });
    console.log('Notarization successful');
  } catch (error) {
    console.error('Notarization failed:', error);
    throw error;
  }
};
