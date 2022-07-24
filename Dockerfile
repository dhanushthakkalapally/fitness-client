FROM node:12-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=build /app/build /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
RUN apk add --no-cache bash
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
