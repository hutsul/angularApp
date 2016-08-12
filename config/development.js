module.exports = function(){
    process.env.HOST = 'localhost';
    process.env.PORT = '3010';
    process.env.NODE_ENV = 'development';
    process.env.DB_PORT = '27017';
    process.env.MONGODB_URI = 'mongodb://localhost/eventDB';
};