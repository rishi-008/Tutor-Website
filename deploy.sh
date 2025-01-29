cd frontend
npm run build


cd ../express/api/prod
cp -r . ../

cd ../..
node index.js
