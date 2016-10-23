
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('groups', function(table) {
            table.increments('id').primary();
            table.string('title');
            table.string('description');
            table.timestamps();
        }),
        knex.schema.createTable('lessons', function(table) {
            table.increments('id').primary();
            table.integer('group_id').index().references('id').inTable('groups');
            table.integer('user_id').index().references('id').inTable('users');
            table.string('title');
            table.text('description');
            table.decimal('rent_cost');
            table.timestamps();
        }),
        knex.schema.createTable('students', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.string('email');
            table.string('phone');
            table.specificType('photo', 'jsonb[]');
            table.timestamps();
        }),
        knex.schema.createTable('users_groups', function(table) {
            table.integer('group_id').index().references('id').inTable('groups');
            table.integer('user_id').index().references('id').inTable('users');
        }),
        knex.schema.createTable('abonement_types', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.text('description');
            table.decimal('price');
            table.integer('lessons');
            table.integer('weeks').default(5);
            table.timestamps();
        }),
        knex.schema.createTable('abonements', function(table) {
            table.increments('id').primary();
            table.integer('student_id').index().references('id').inTable('students');
            table.integer('abonement_type_id').index().references('id').inTable('abonement_types');
            table.date('expire');
            table.integer('remaining');
            table.timestamps();
        }),
        knex.schema.createTable('visits', function(table) {
            table.increments('id').primary();
            table.integer('abonement_id').index().references('id').inTable('abonements');
            table.integer('count');
            table.string('type');
            table.integer('student_id').index().references('id').inTable('students');
            table.integer('group_id').index().references('id').inTable('groups');
            table.timestamps();
        }),
        knex.schema.createTable('sales', function(table) {
            table.increments('id').primary();
            table.decimal('amount');
            table.string('type').index();
            table.integer('visit_id').index().references('id').inTable('visits');
            table.integer('user_id').index().references('id').inTable('users');
            table.timestamps();
        }),
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
        knex.schema.dropTable('sales'),
        knex.schema.dropTable('visits'),
        knex.schema.dropTable('abonements'),
        knex.schema.dropTable('students_groups'),
        knex.schema.dropTable('users_groups'),
        knex.schema.dropTable('abonement_types'),
        knex.schema.dropTable('students'),
        knex.schema.dropTable('lessons'),
        knex.schema.dropTable('groups'),
  ]);
};
