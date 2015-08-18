FROM postgres
RUN apt-get update -y && apt-get install -y wget build-essential
RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ADD make_db.sh /docker-entrypoint-initdb.d/
VOLUME ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]
EXPOSE 5432
CMD ["/usr/lib/supervisord"]
# CMD ["/usr/lib/postgresql/9.4/bin/postgres", "-D", "/var/lib/postgresql/9.4/main", "-c", "config_file=/etc/postgresql/9.4/main/postgresql.conf"]
