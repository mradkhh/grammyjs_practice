require('dotenv').config();


const { Bot, GrammyError, HttpError, Keyboard } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);


bot.on('message').filter((ctx) => {
  return ctx.from.id === 384945188;
}, async (ctx) => {
  await ctx.reply('Hello, boss!');
});

bot.command('start', async (ctx) => {
  await ctx.reply('Welcome to the bot!');
});

bot.hears(('mood', async (ctx) => {
  const moodKeyboad = new Keyboard().text('Good');
  await ctx.reply('How are you feeling today?', {
    reply_markup: moodKeyboad
  });  
}));

bot.on('message', async (ctx) => {
  await ctx.reply(ctx.msg);
});

bot.api.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'stop', description: 'Stop the bot' },
  { command: 'mood', description: 'How are you feeling today?' },
]);

bot.catch((err) => {
  if (err instanceof GrammyError) {
    console.error('Error:', err);
  } else if (err instanceof HttpError) {
    console.error('HTTP error:', err);
  } else {
    console.error('Unknown error:', err);
  }
});

bot.start();