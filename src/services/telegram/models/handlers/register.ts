import * as TelegramBot from "node-telegram-bot-api";
import { CallBackType } from "../types";
import { Extensions } from "@extensions";
import {TelegramRepository} from '@telegram';

export const registerUser = async(telebot: TelegramBot, msg: TelegramBot.Message, ext: Extensions) => {
  const sendedMessage = await telebot.sendMessage(msg.from.id, 'Укажите имя пользователя', {
    reply_markup: {
      force_reply: true
    }
  });

  await TelegramRepository.insertCallBackMessage(
    ext.pg,
    [
      {
        telegram_id: msg.from.id,
        message_id: sendedMessage.message_id,
        callback_type: CallBackType.REGISTER
      }
    ]
  );
    
}