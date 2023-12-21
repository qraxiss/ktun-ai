import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'

import { Gpt } from './gpt-client'

export const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'client-one' })
})

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message', async (message) => {
    if (message.from) {
        try {
            let data = await Gpt.sendMessage(message.body)
            let aiMessage: string = data.result.message.content
            message.reply(aiMessage)
        } catch (error) {
            console.log(error)
        }
    }
})

client.initialize()
