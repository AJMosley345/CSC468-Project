FROM mysql:latest

RUN chown -R mysql:root /var/lib/mysql
RUN mkdir /conf.d
COPY ./custom.cnf ./conf.d

ENV MYSQL_DATABASE project
ENV MYSQL_ROOT_PASSWORD test1234

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306