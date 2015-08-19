cd /opt/docker-skeleton
git pull origin master
docker stop API
docker rm $(docker ps -q -f status=exited)
docker build -t stats-api .
./scripts/start_app.sh
