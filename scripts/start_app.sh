docker run -v /mnt/logs:/logs -v /opt/docker-skeleton:/var/www/current -p 80:80 --link REDIS:redis --link MONGO:mongo --link POSTGRESQL:postgres --name API -d stats-api
