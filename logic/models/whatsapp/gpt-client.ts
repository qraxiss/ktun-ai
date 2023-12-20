import axios from 'axios'
import { config } from '../../../config'

export const gptClient = axios.create({
    baseURL: config.GPT_API,
    timeout: 10000
})

export async function sendMessage(message: string) {
    let res = await gptClient.post(
        `/openai/continueCompletion`,
        {
            message: {
                content: message,
                role: 'user'
            }
        },
        {
            params: {
                systemKey: config.GPT_SERVER_KEY
            }
        }
    )

    return res.data
}
