const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "db_test",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default config;