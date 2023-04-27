CREATE USER 'remote'@'webui-service' IDENTIFIED WITH 'caching_sha2_password' BY 'test1234';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'remote'@'webui-service' WITH GRANT OPTION;
