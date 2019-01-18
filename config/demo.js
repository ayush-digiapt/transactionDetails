module.exports = {
    environment: 'development',
    port: 3000,
    db: {
        database: 'transactionDetails',
        host: 'localhost',
        port: 3306,
        user: 'transactionDetails',
        password: 'transactionDetails'
    },
    mysql_date_format: 'YYYY-MM-DD HH:MM:SS',
    sequelize: {
        options: {
            timestamps: false,
            freezeTableName: true
        }
    }
}