CREATE USER 'remote'@'172.20.0.12' IDENTIFIED WITH mysql_native_password BY 'test1234';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'remote'@'172.20.0.12' WITH GRANT OPTION;
