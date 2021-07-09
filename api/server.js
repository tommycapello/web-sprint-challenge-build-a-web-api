// Configure your server here
const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
const { errorHandler, pageNotFound } = require('./projects/projects-middleware')

server.use(express.json());

// Build your actions router in /api/actions/actions-router.js
server.use('/api/actions', actionsRouter)
// Build your projects router in /api/projects/projects-router.js
server.use('/api/projects', projectsRouter)
server.use('*', pageNotFound)
server.use(errorHandler);
module.exports = server;
