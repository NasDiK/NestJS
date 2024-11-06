import {Extensions} from "@extensions";
import {TelegramLog, TelegramCallBackMessage, TelegramUser} from "./types";


export class TelegramRepository {
  static get Tables() {
    return {
      CALLBACK_MESSAGES: 'telegram_callback_messages',
      LOGS: 'telegram_logs',
      USERS: 'telegram_users'
    }
  }

  public static insertLogs(pg: Extensions['pg'], logs: TelegramLog[]) {
    return pg()
      .insert(logs)
      .into(this.Tables.LOGS);
  }

  public static insertCallBackMessage(pg: Extensions['pg'], callbacks: TelegramCallBackMessage[]) {
    return pg()
      .insert(callbacks)
      .into(this.Tables.CALLBACK_MESSAGES)
      .onConflict(['telegram_id', 'callback_type'])
      .merge(['message_id']);
  }

  public static deleteCallBackMessage(pg: Extensions['pg'], callback: Pick<TelegramCallBackMessage, 'telegram_id' | 'callback_type'>) {
    return pg()
      .where({callback})
      .from(this.Tables.CALLBACK_MESSAGES)
      .delete();
  }

  public static insertUser(pg: Extensions['pg'], users: TelegramUser[]) {
    return pg()
      .insert(users)
      .into(this.Tables.USERS);
  }
}