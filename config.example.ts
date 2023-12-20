import { validate } from 'backend-helper-kit'
import Joi from 'joi'

const name = 'template-ms'

type configType = {
    PORT: number
    MONGO_CONNECTION: string
    MODULE_NAME: string
    MODULE_KEY: string
    SESSION_SECRET: string
    ENV: string
    GPT_API: string
    GPT_SERVER_KEY: string
}

const configSchema = Joi.object({
    PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MODULE_NAME: Joi.string().required(),
    MODULE_KEY: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    ENV: Joi.string().valid('development', 'production').required(),
    GPT_API: Joi.string().required(),
    GPT_SERVER_KEY: Joi.string().required()
})

export const config: configType = validate(
    {
        PORT: 8000,
        MONGO_CONNECTION: `mongodb://127.0.0.1:27017/${name}`,
        MODULE_KEY: '123',
        MODULE_NAME: name,
        SESSION_SECRET: '123',
        ENV: 'development',
        GPT_API: 'http://127.0.0.1:8001',
        GPT_SERVER_KEY: name
    },
    configSchema
)

console.log(config)
