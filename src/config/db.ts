import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config()

const baseUrl = process.argv[3] === '--local' ? process.env.DATABASE_URL_LOCAL:process.env.DATABASE_URL
const db = new Sequelize(baseUrl!, {
    models: [__dirname + '/../**/models/**/*'],
    logging: false
})

export default db