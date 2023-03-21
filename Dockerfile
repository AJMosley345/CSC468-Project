FROM nginx

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY /example.com.conf /etc/nginx/conf.d/
# COPY /webui/files/webui.js /usr/share/nginx/html

FROM node

# RUN npm install mysql2
# RUN npm install nginx

COPY webui/files/ /files/
COPY /webui/webui.js /
CMD ["node", "/webui.js"]
EXPOSE 3000
EXPOSE 80