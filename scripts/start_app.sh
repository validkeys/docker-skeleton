docker run -v /mnt/logs:/logs -p 80:3000 --link REDIS:redis --link MONGO:mongo --link POSTGRESQL:postgres --name API -d stats-api