FROM mysql:latest
 
RUN chown -R mysql:root /var/lib/mysql

ENV MYSQL_DATABASE project
ENV MYSQL_USER user
ENV MYSQL_PASSWORD test123
ENV MYSQL_ROOT_PASSWORD test

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
