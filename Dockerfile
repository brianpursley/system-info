FROM node:alpine

EXPOSE 80

ADD system-info.js /app/system-info.js

CMD node /app/system-info.js
