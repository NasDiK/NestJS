import * as TelegramBot from 'node-telegram-bot-api';
import {Extensions} from '@extensions';
import {CallBackType} from './types';

export const linkWithAccount = async(telebot: TelegramBot, msg: TelegramBot.Message, ext: Extensions) => {
  const sendedMessage = await telebot.sendMessage(msg.from.id, 'Укажите имя пользователя', {
    reply_markup: {
      force_reply: true
    }
  });

  await ext.pg()
    .insert({
      telegram_id: msg.from.id,
      message_id: sendedMessage.message_id,
      callback_type: CallBackType.LINK
    })
    .into('telegram_callback_messages')
    .onConflict(['telegram_id', 'callback_type'])
    .merge(['message_id']);
}

export const linkInDb = async(telebot: TelegramBot, telegram_id: number, username: string, ext: Extensions) => {
  const [user_id] = await ext.pg()
    .pluck('id')
    .from('users')
    .where({username});

  /**
   * Чистим за собой
   */
  await ext.pg()
    .from('telegram_callback_messages')
    .where({telegram_id, callback_type: CallBackType.LINK})
    .delete()

  if (!user_id) {
    telebot.sendMessage(telegram_id, 'Пользователя с таким именем не существует');
    return;
  }

  try {
    await ext.pg()
      .into('telegram_users')
      .insert({telegram_id, user_id});
    telebot.sendMessage(telegram_id, 'Успешно привязан');
  } catch (err) {
    telebot.sendMessage(telegram_id, 'Аккаунт уже связан');
  }
}