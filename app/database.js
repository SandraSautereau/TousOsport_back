const { Pool } = require('pg');

let config;

// Heroku
if (process.env.NODE_ENV === 'prod') {
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl : {
            rejectUnauthorized: false
        },
    }    
}else {
    config = {
        connectionString: process.env.PG_URL,
    }
}


const pool = new Pool(config);

module.exports = pool;