export CSC_LINL='$(pwd)/mac/<YourCertName>.p12'

export CSC_KEY_PASSWORD='<YourCertPassword>'

# security find-identity -p codesigning -v
export CSC_NAME='<YourCertName>'

pnpm run build;
