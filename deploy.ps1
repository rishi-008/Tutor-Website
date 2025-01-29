Set-Location -Path "frontend"
npm run build
Set-Location -Path "../express/api/prod"
Copy-Item -Path . -Destination "../" -Recurse
Set-Location -Path "../.."
node index.js