import axios from 'axios'
import { config } from '../../../config'

export const gptClient = axios.create({
    baseURL: config.GPT_API
})
export class Gpt {
    static async sendMessage(message: string) {
        let res = await gptClient.post(
            `/openai/continueCompletion`,
            {
                message: {
                    content: message,
                    role: 'user'
                },
                openaiConfig: {
                    max_tokens: 4096,
                    temperature: 0.7
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
}
