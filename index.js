const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('edult', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Порнушка</>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Писи', 'btn_1'), Markup.button.callback('Попы', 'btn_2')],
                [Markup.button.callback('Сиси', 'btn_3'), Markup.button.callback('Ротик', 'btn_4')]
            ]
        ))
    } catch(e){
        console.error(e)
    }
})

function addActionBot(name, src, text) {
bot.action(name, async (ctx) => {
    try {
        await ctx.answerCbQuery()
        if(src !== false) {
            await ctx.replyWithPhoto({
                source: src
            })
        }
        await ctx.replyWithHTML(text, {
            disable_web_page_preview: true
        })
    } catch (e) {
        console.error(e)
    }
})
} 
addActionBot('btn_1', './img/my_avatar.jpg', text.text1)
addActionBot('btn_2', './img/wojak.png', text.text2)
addActionBot('btn_3', './img/cry.jpg', text.text3)
addActionBot('btn_4', './img/pirate.jpg', text.text4)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))