import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateWalletsTable1729876543210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallets',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'name', type: 'varchar' },
          { name: 'type', type: 'enum', enum: ['cash', 'bank', 'mobile_money'] },
          { name: 'balance', type: 'decimal', precision: 12, scale: 2, default: 0 },
          { name: 'currency', type: 'varchar', length: '5', default: "'NGN'" },
          { name: 'userId', type: 'uuid' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'wallets',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wallets');
  }
}
