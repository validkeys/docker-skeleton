docker run -v /mnt/logs/postgresql:/var/log -v /mnt/data/postgresql:/var/lib/postgresql/data -p 5432:5432 --name POSTGRESQL -d stats-postgres /usr/lib/supervisord
