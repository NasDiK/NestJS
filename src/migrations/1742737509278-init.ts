import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Init1742737509278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const inviteTable = new Table({
          name: 'invites',
          comment: 'Приглашения',
          columns: [
            {name: 'fromId', type: 'integer', isNullable: false},
            {name: 'toId', type: 'integer', isNullable: false},
            {name: 'inviteType', type: 'smallint', isNullable: false},
            {name: 'createdAt', type: 'timestamp', isNullable: false, default: 'now()'},
          ],
          foreignKeys: [
            {columnNames: ['fromId'], referencedColumnNames: ['id'], referencedTableName: 'users'},
            {columnNames: ['toId'], referencedColumnNames: ['id'], referencedTableName: 'users'}
          ]
        });
        const logTable = new Table({
          name: 'logs',
          comment: 'Логи',
          columns: [
            {name: 'userId', type: 'integer', isNullable: true},
            {name: 'body', type: 'varchar', isNullable: false},
            {name: 'type', type: 'smallint', isNullable: false},
            {name: 'level', type: 'smallint', isNullable: false},
            {name: 'createdAt', type: 'timestamp', isNullable: false, default: 'now()'},
          ],
        });
        const roomTable = new Table({
          name: 'rooms',
          comment: 'Каналы',
          columns: [
            {name: 'id', type: 'serial', isPrimary: true},
            {name: 'title', type: 'varchar', isNullable: false, length: '255'},
          ]
        });
        const roomMessagesTable = new Table({
          name: 'roomMessages',
          comment: 'Сообщения в канале',
          columns: [
            {name: 'id', type: 'serial', isPrimary: true},
            {name: 'content', type: 'text', isNullable: false},
            {name: 'roomId', type: 'integer', isNullable: false},
            {name: 'fromUserId', type: 'integer', isNullable: false},
            {name: 'createdAt', type: 'timestamp', isNullable: false, default: 'now()'},
          ],
          foreignKeys: [
            {columnNames: ['fromUserId'], referencedColumnNames: ['id'], referencedTableName: 'users'},
            {columnNames: ['roomId'], referencedColumnNames: ['id'], referencedTableName: 'rooms'}
          ]
        });
        const usersTable = new Table({
          name: 'users',
          comment: 'Пользователи',
          columns: [
            {name: 'id', type: 'serial', isPrimary: true},
            {name: 'username', type: 'varchar', length: '100', isNullable: false, isUnique: true},
            {name: 'fullName', type: 'varchar', length: '255', isNullable: false},
            {name: 'password', type: 'varchar', length: '255', isNullable: false},
            {name: 'createdAt', type: 'timestamp', isNullable: false, default: 'now()'},
            {name: 'blockedUntil', type: 'timestamp', isNullable: true},
          ]
        });
        const usersContactsTable = new Table({
          name: 'userContacts',
          comment: 'Контакты пользователей',
          columns: [
            {name: 'userFirst', type: 'integer', isPrimary: true},
            {name: 'userSecond', type: 'integer', isPrimary: true}
          ],
          foreignKeys: [
            {columnNames: ['userFirst'], referencedColumnNames: ['id'], referencedTableName: 'users'},
            {columnNames: ['userSecond'], referencedColumnNames: ['id'], referencedTableName: 'users'}
          ]
        });
        const userRightsTable = new Table({
          name: 'usersRights',
          comment: 'Права пользователей',
          columns: [
            {name: 'userId', type: 'integer', isPrimary: true},
            {name: 'service', type: 'smallint', isNullable: false},
            {name: 'rights', type: 'integer', isNullable: false}
          ],
          foreignKeys: [
            {columnNames: ['userId'], referencedColumnNames: ['id'], referencedTableName: 'users'},
          ]
        });
        const userMessagesTable = new Table({
          name: 'userMessages',
          comment: 'Сообщения пользователей',
          columns: [
            {name: 'id', type: 'serial', isPrimary: true},
            {name: 'messageFrom', type: 'integer', isNullable: false},
            {name: 'messageTo', type: 'integer', isNullable: false},
            {name: 'sendedAt', type: 'timestamp', isNullable: false},
            {name: 'readedAt', type: 'timestamp', isNullable: true},
            {name: 'content', type: 'text', isNullable: false},
          ],
          foreignKeys: [
            {columnNames: ['messageFrom'], referencedColumnNames: ['id'], referencedTableName: 'users'},
            {columnNames: ['messageTo'], referencedColumnNames: ['id'], referencedTableName: 'users'}
          ]
        });
        const userRoomsTable = new Table({
          name: 'userRooms',
          comment: 'Комнаты пользователей пользователей',
          columns: [
            {name: 'userId', type: 'integer', isPrimary: true},
            {name: 'roomId', type: 'integer', isPrimary: true},
            {name: 'rights', type: 'integer', isPrimary: true},
          ],
          foreignKeys: [
            {columnNames: ['userId'], referencedColumnNames: ['id'], referencedTableName: 'users'},
            {columnNames: ['roomId'], referencedColumnNames: ['id'], referencedTableName: 'rooms'}
          ]
        });

        await queryRunner.createTable(usersTable);
        await queryRunner.createTable(userRightsTable);
        await queryRunner.createTable(roomTable);
        await queryRunner.createTable(roomMessagesTable);
        await queryRunner.createTable(inviteTable);
        await queryRunner.createTable(userRoomsTable);
        await queryRunner.createTable(usersContactsTable);
        await queryRunner.createTable(userMessagesTable);
        await queryRunner.createTable(logTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('logs');
      await queryRunner.dropTable('userMessages');
      await queryRunner.dropTable('userContacts');
      await queryRunner.dropTable('userRooms');
      await queryRunner.dropTable('invites');
      await queryRunner.dropTable('roomMessages');
      await queryRunner.dropTable('rooms');
      await queryRunner.dropTable('usersRights');
      await queryRunner.dropTable('users');
    }

}
