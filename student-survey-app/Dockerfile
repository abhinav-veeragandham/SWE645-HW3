# Build Stage
FROM node:20-alpine as build-stage

WORKDIR /app
COPY student-survey-app/ ./

RUN npm install
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy build assets from previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
