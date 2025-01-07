Stages:
- fill .env with your MAC_NOT_* vars
- Put your "Developer ID Application" certificate here as mac/DeveloperIdCert.p12
- copy mac/signedBuild.example.sh into mac/signedBuild.sh
- `chmod +x mac/signedBuild.sh`
- exec created .sh - you ll export necessary vars to access your cert and sign the app
- wait for success build
- after signing the notarize process should be launched - wait
