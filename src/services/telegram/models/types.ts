export enum CallBackType {
  LINK = 'LINK',
  REGISTER = 'REGISTER'
}

export type TelegramLog = {
  message_type: string;
  telegram_id: number;
  received_message: string;
  msg_json: string;
};

export type TelegramUser = {
  user_id: number;
  telegram_id: number;
};

export type TelegramCallBackMessage = {
  telegram_id: number;
  message_id: number;
  callback_type: CallBackType;
};