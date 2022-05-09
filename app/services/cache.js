const {createClient} = require('redis');
require('dotenv').config();
let url;


if (process.env.NODE_ENV === 'prod') {
    url = process.env.REDISCLOUD_URL;
}else {
    url = process.env.REDIS_URL;
}

const db = createClient({url:url});
db.connect();

const prefix = 'tousosport:';
const timeout = 60 * 5;

const keys = [];

const cache = async (request, response, next) => {
    // Any data in db ?
    const key = `${prefix}${request.url}`;
    console.log(key);

    //if data in cache
    if (await db.exists(key)) {
        console.log('Data from Redis');
        //we get the string from redis
        const cachedString = await db.get(key);
        //we make an JS object
        const cachedValue = JSON.parse(cachedString);
        //we send the JS object in an array to the client
        return response.json(cachedValue);
    }

    //else : get data from postrges and send them in redis cache

    // we need to make a SQL request and send the result in redis cache
    
    // we save the original response.json in its context
    const originalResponseJson = response.json.bind(response);
    console.log(response.json);
    // we add new features to response.json: stringify the request result, send it in redis cache, then save it in response.json before sending it to the client
    response.json = async (data) => {
        const str = JSON.stringify(data);
        //we store a list of our keys
        keys.push(key);
        await db.set(key, str, {EX: timeout, NX: true});
        originalResponseJson(data);
    }

    next();
};

const flush = async (request, response, next) => {
    // flushing cache
    while(key=keys.shift()) {
        await db.del(key);
    }
    next();
}

module.exports = {cache, flush};