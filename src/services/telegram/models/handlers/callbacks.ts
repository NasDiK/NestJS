import { Extensions } from "@extensions";
import * as TelegramBot from "node-telegram-bot-api";
import {linkInDb} from './link';
import {CallBackType} from '../types';

export const checkReplyMessage = async(telebot: TelegramBot, msg: TelegramBot.Message, ext: Extensions) => {
  const replyMessage = msg.reply_to_message;

  if (replyMessage) {
    const telegram_id = msg.from.id;
    const message_id = replyMessage.message_id;

    const [callback_type] = await ext.pg()
      .from('telegram_callback_messages')
      .pluck('callback_type')
      .where({
        telegram_id,
        message_id
      })

      if (callback_type) {
        handleCallBacks(telebot, msg, callback_type, ext);
      }
  }
}

const handleCallBacks = async(
  telebot: TelegramBot,
  msg: TelegramBot.Message,
  callback_type: CallBackType,
  ext: Extensions
) => {
  switch(callback_type) {
    case CallBackType.LINK: {
      linkInDb(telebot, msg.from.id, msg.text, ext)
      break;
    }
    case CallBackType.REGISTER: {
      try {
        await ext
        .pg()
        .into('users')
        .insert({username: msg.text});
        telebot.sendMessage(msg.from.id, 'Пользователь успешно зарегистрирован');
      } catch (err) {
        telebot.sendMessage(msg.from.id, 'Пользователь уже зарегистрирован')
      } finally {
        await ext.pg()
          .from('telegram_callback_messages')
          .where({telegram_id: msg.from.id, callback_type: CallBackType.REGISTER})
          .del()
      }
      break;
    }
  }
}