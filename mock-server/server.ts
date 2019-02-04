import * as jsonServer from 'json-server';
import db from "./db";

const server = jsonServer.create();
const router = jsonServer.router(db, {
    foreignKeySuffix: 'id'
});
const middlewares = jsonServer.defaults({
    logger: true,

});

server.use(middlewares);
server.use('/api/', router);
server.use(router);

server.listen(3000, () => {
    console.log('Mock-server is running')
});