FROM node:14-alpine3.12
ARG version=prod
COPY ./ /app
WORKDIR /app
ENV SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
RUN yarn config set registry http://registry.npm.taobao.org/
RUN yarn && yarn build

FROM nginx:1.15.0
LABEL MAINTAINER="kaisawind <wind.kaisa@gmail.com>"
COPY --from=0 /app/dist /usr/share/nginx/html
#COPY ./dist /usr/share/nginx/html
COPY ./site.conf /etc/nginx/conf.d/default.conf
COPY ./uwsgi_params /etc/nginx/uwsgi_params

ENV NGINX_PORT=8090 UWSGI_BACKEND=8080
# RUN rm /etc/nginx/conf.d/default.conf
# ADD default.conf /etc/nginx/conf.d/
