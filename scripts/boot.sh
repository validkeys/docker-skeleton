# START REDIS (daemon)
docker run -v /mnt/data:/data -p 6379:6379 --name REDIS -d stats-redis

# START MONGO
docker run -v /mnt/data:/data -v /mnt/logs:/logs -p 27017:27017 --name MONGO -d stats-mongo
