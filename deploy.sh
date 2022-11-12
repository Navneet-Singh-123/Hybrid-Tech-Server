echo "Installing pm2 globally"
npm install pm2@latest -g

echo "Kill the running PM2 action"
sudo pm2 delete server

echo "Jump to required folder"
cd /home/ubuntu/server

echo "Update app from Git"
git pull

echo "Restart PM2 actions"
cd /home/ubuntu/server
sudo pm2 start server.js
sudo pm2 save