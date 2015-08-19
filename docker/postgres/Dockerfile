FROM postgres
RUN apt-get update -y && apt-get install -y wget build-essential
RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf