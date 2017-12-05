FROM nginx

COPY ./sample-website.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html/
