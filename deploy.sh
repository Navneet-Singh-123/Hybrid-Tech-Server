echo "Kill the running PM2 action"
pm2 delete server

echo "Jump to required folder"
cd /home/ubuntu/server

echo "Update app from Git"
git pull

echo "Restart PM2 actions"
cd /home/ubuntu/server
pm2 start server.js
pm2 save  