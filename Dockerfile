FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y curl wget git supervisor build-essential
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /logs
RUN curl https://raw.githubusercontent.com/isaacs/nave/master/nave.sh > /opt/nave.sh
RUN bash /opt/nave.sh usemain 0.12.4
RUN cd /opt && wget http://www.haproxy.org/download/1.5/src/haproxy-1.5.3.tar.gz
RUN cd /opt && tar xzf haproxy-1.5.3.tar.gz
RUN cd /opt/haproxy-1.5.3 && make TARGET=linux2628 && make install
ADD ./docker/haproxy.cfg /opt/haproxy-1.5.3/haproxy.cfg
RUN npm install -g forever bower gulp babel nodemon
RUN mkdir -p /var/www/current
COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 80 8081 8082
CMD ["/usr/bin/supervisord"]
