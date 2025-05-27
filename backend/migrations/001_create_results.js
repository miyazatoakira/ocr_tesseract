export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
  await knex.schema.createTable('results', tbl => {
    tbl.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    tbl.string('filename').notNullable();
    tbl.text('text').notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
}
export async function down(knex) {
  await knex.schema.dropTable('results');
}
