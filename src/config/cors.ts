import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]
        if (process.argv[2] === '--api' || process.env.NODE_ENV === 'test') {
            whitelist.push(undefined)
        }

        if (process.argv[3] === '--docs') {
            whitelist.push(process.env.SWAGGER_URL)
        }

        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}