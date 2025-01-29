cd frontend
CI=false npm run build

echo "Installing backend dependencies..."
cd ../netlify/functions
npm install

# cd ../express/api/prod
# cp -r . ../

# cd ../..
# node index.js
