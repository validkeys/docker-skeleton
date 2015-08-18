# START REDIS (daemon)
docker run -v ~/Documents/dockermnt/data/redis:/data/redis -p 6379:6379 --name REDIS -d stats-redis

# START MONGO
docker run -v ~/Documents/dockermnt/data:/data -v ~/Documents/dockermnt/logs:/logs -p 27017:27017 --name MONGO -d stats-mongo
