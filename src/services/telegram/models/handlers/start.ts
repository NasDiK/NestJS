import * as TelegramBot from "node-telegram-bot-api";
import { CallBackType } from "./types";
import { Extensions } from "@extensions";

export const sendHello = (telebot: TelegramBot, msg: TelegramBot.Message) => {
  console.log(telebot);
  telebot.sendMessage(msg.from.id, 'Hello!');
}

export const registerUser = async(telebot: TelegramBot, msg: TelegramBot.Message, ext: Extensions) => {
  const sendedMessage = await telebot.sendMessage(msg.from.id, 'Укажите имя пользователя', {
    reply_markup: {
      force_reply: true
    }
  });

  await ext.pg()
    .insert({
      telegram_id: msg.from.id,
      message_id: sendedMessage.message_id,
      callback_type: CallBackType.REGISTER
    })
    .into('telegram_callback_messages')
    .onConflict(['telegram_id', 'callback_type'])
    .merge(['message_id']);
}