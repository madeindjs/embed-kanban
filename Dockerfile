FROM node:16-alpine as FrontendBuild
COPY ./frontend /usr/app
WORKDIR /usr/app
RUN npm install
RUN npm run build --production

FROM node:16-alpine as KanbanBuild
COPY ./kanban /usr/app
WORKDIR /usr/app
RUN npm install
RUN npm run build --production

FROM node:16-alpine as BackendBuild
COPY ./backend /usr/app
WORKDIR /usr/app
RUN npm install
RUN npm run build
RUN npm prune --production
RUN rm .env
RUN rm -r public

# build final image
FROM node:16-alpine as FinalBuild
WORKDIR /usr/app
COPY --from=BackendBuild /usr/app/dist /usr/app/backend
COPY --from=BackendBuild /usr/app/node_modules /usr/app/node_modules
COPY --from=FrontendBuild /usr/app/dist/frontend /usr/app/public/app
COPY --from=KanbanBuild /usr/app/dist/kanban /usr/app/public/app/kanban

EXPOSE 3000
CMD [ "node", "backend/main" ]