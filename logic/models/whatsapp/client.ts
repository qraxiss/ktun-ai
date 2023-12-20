import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'

import { sendMessage } from './gpt-client'

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
        let aiMessage: string = (await sendMessage(message.body)).result.message.content
        message.reply(aiMessage)
    }
})

client.initialize()
