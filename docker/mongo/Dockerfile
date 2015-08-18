FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y wget
RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /data/mongo
RUN mkdir -p /logs
RUN cd /opt && wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.6.5.tgz
RUN cd /opt && tar -xvzf mongodb-linux-x86_64-2.6.5.tgz
ADD mongo.conf /opt/mongodb-linux-x86_64-2.6.5/mongo.conf
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 27017
CMD ["/usr/bin/supervisord"]