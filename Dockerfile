FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y curl wget git supervisor build-essential
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /logs
RUN curl https://raw.githubusercontent.com/isaacs/nave/master/nave.sh > /opt/nave.sh
RUN bash /opt/nave.sh usemain 0.12.4
RUN npm install -g forever bower gulp babel
RUN mkdir -p /var/www/current && mkdir -p /var/www/current/node_modules
COPY src /var/www/current
COPY node_modules /var/www/current/node_modules
COPY ./docker/supervisor.conf /etc/supervisor/conf.d/supervisor.conf
EXPOSE 3000
CMD "/usr/bin/supervisord"