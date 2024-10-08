import * as path from 'path';
import * as dotenv from 'dotenv';
const envPath = path.join(__dirname,"../../.env")
dotenv.config({path:envPath})

export default {
    port : process.env.PORT  || 3000,
    database:{
        host:process.env.DATABASE_HOST ,
        name:process.env.DATABASE_NAME,
        port:process.env.DATABASE_PORT,
        user:process.env.DATABASE_USER,
        pass:process.env.DATABASE_PASSWORD
    },
    url:process.env.URL,
    jwt:process.env.JWT_SECRET
} 