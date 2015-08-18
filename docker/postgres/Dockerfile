FROM postgres:9.4
ENV DB_NAME database
ENV DB_USER admin
ENV DB_PASS password
ADD make_db.sh /docker-entrypoint-initdb.d/
RUN chmod 755 /docker-entrypoint-initdb.d/make_db.sh
CMD ["echo", "hello"]