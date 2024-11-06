import * as TelegramBot from "node-telegram-bot-api";

export const sendHello = (telebot: TelegramBot, msg: TelegramBot.Message) => {
  console.log(telebot);
  telebot.sendMessage(msg.from.id, 'Hello!');
}