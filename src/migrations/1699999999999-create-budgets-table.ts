import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateBudgetsTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'budgets',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'amount', type: 'decimal', precision: 12, scale: 2, isNullable: false },
          { name: 'period', type: 'varchar', isNullable: false },
          { name: 'startDate', type: 'date', isNullable: false },
          { name: 'endDate', type: 'date', isNullable: false },
          { name: 'category', type: 'varchar', isNullable: true },
          { name: 'userId', type: 'uuid', isNullable: false },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'budgets',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('budgets');
    if (!table) {
      return;
    }
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('budgets', foreignKey);
    }
    await queryRunner.dropTable('budgets');
  }
}
