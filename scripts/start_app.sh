docker run -v /mnt/logs:/logs -v /opt/docker-skeleton:/var/www/current -p 80:3000 --link REDIS:redis --link MONGO:mongo --link POSTGRESQL:postgres --name API -d stats-api
