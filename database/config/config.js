const config = {
    host: "MYSQL5044.site4now.net",
    user: "a83681_allphi",
    port: 3306,
    password: "KS4eK2AbYgZVFTqY",
    database: "db_a83681_allphi",
    //dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = config;