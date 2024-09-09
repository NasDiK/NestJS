import * as TelegramBot from 'node-telegram-bot-api';
import '../../../../envConfig';
import {Extensions} from '../../../extensions';
import * as Handlers from './handlers';

export class TelegramWorker {
  telebot: TelegramBot;
  logger: ReturnType<Extensions['loggerBuilder']>;
  ext: Extensions;
  
  constructor(ext: Extensions) {
    console.log(process.env.TELEGRAM_API_KEY);
    this.telebot = new TelegramBot(process.env.TELEGRAM_API_KEY, {
      polling: {
        interval: 2000,
        autoStart: false
      }
    });
    this.logger = ext.loggerBuilder('TelegramListener');
    this.ext = ext;

    this.telebot.on('text', this.textListener);
    
    this.init();
  }

  async init() {
    await this.telebot.stopPolling();
    await this.telebot.startPolling();
    this.logger.info('Pooling started');
  };

  textListener = async(msg: TelegramBot.Message, meta: TelegramBot.Metadata) => {
    const {ext, telebot} = this;
    this.logMessage(msg, meta);

    switch(msg.text) {
      case '/start': {
        Handlers.Start.sendHello(telebot, msg);
        break;
      }
      case '/link': {
        Handlers.Link.linkWithAccount(telebot, msg, ext);
        break;
      }
      case '/register': {
        Handlers.Start.registerUser(telebot, msg, ext);
      }
      default: {
        Handlers.Callbacks.checkReplyMessage(telebot, msg, ext);
      }
    }
  }

  logMessage = async(msg: TelegramBot.Message, meta: TelegramBot.Metadata) => {
    const {pg} = this.ext;

    console.log('logMessage', msg.text);

    try {
      await pg()
      .insert({
        message_type: meta.type,
        telegram_id: msg.from.id,
        received_message: msg.text,
        msg_json: JSON.stringify(msg)
      })
      .into('telegram_logs');
    } catch (err) {
      console.log('error', err);
      this.logger.error(JSON.stringify(err));
    }
  }
}