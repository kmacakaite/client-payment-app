import { assert } from 'console'
import * as dotenv from 'dotenv'
dotenv.config()

assert(process.env.AUTH_TOKEN,
    "'AUTH_TOKEN' should be set"
)
export const AUTH_TOKEN = process.env.AUTH_TOKEN

assert(process.env.DB_USERNAME,
    "'DB_USERNAME' should be set"
)
export const DB_USERNAME = process.env.DB_USERNAME

assert(process.env.DB_PASSWORD,
    "'DB_PASSWORD' should be set"
)
export const DB_PASSWORD = process.env.DB_PASSWORD

assert(process.env.DB_NAME,
    "'DB_NAME' should be set"
)
export const DB_NAME = process.env.DB_NAME

export const DB_PORT = process.env.DB_PORT as unknown as number

export const DB_HOST = process.env.DB_HOST
