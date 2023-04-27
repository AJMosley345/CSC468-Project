CREATE USER 'remote'@'webui-service' IDENTIFIED WITH mysql_native_password BY 'test1234';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'remote'@'webui-service' WITH GRANT OPTION;
