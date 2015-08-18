FROM postgres
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
VOLUME ["/etc/postgresql", "/var/lar/postgresql", "/var/lib/postgresql"]
EXPOSE 5432
CMD ["/usr/lib/supervisord"]
