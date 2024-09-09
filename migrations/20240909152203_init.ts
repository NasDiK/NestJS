import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (builder) => {
    builder.increments('id', {primaryKey: true});
    builder.string('username').unique();
  });

  await knex.schema.createTable('telegram_users', (builder) => {
    builder.integer('user_id').unique();
    builder.integer('telegram_id');
  });

  await knex.schema.createTable('telegram_logs', (builder) => {
    builder.timestamps(true, true, false);
    builder.string('message_type');
    builder.integer('telegram_id');
    builder.text('received_message');
    builder.text('msg_json');
  })

  await knex.schema.createTable('telegram_callback_messages', (builder) => {
    builder.integer('telegram_id');
    builder.integer('message_id');
    builder.string('callback_type')

    builder.unique(['telegram_id', 'callback_type'])
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('telegram_users');
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('telegram_logs');
  await knex.schema.dropTable('telegram_callback_messages');
}

