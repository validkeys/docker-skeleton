FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y wget build-essential
RUN apt-get install -y supervisor
RUN cd /opt && wget http://download.redis.io/releases/redis-3.0.3.tar.gz
RUN cd /opt && tar -xvzf redis-3.0.3.tar.gz
RUN cd /opt/redis-3.0.3 && make
COPY redis.conf /usr/local/etc/redis/redis.conf
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /data/redis
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 6379
CMD ["/usr/bin/supervisord"]