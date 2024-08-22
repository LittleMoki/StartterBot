import 'dotenv/config'
import { Bot, GrammyError, HttpError } from 'grammy'

const bot = new Bot(process.env.BOT_API)

bot.command('start', ctx => {
	console.log(ctx.from)
})
// Handle other messages.
bot.on('message', ctx => ctx.reply('Got another message!'))

bot.start()

bot.catch(err => {
	const ctx = err.ctx
	console.error(`Error while handling update ${ctx.update.update_id}:`)
	const e = err.error
	if (e instanceof GrammyError) {
		console.error('Error in request:', e.description)
	} else if (e instanceof HttpError) {
		console.error('Could not contact Telegram:', e)
	} else {
		console.error('Unknown error:', e)
	}
})
