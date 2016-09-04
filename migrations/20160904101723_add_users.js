
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('username');
            table.string('password');
            table.string('name');
            table.string('email');
            table.specificType('avatar', 'jsonb[]');
            table.timestamps();
        })]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
        knex.schema.dropTable('users'),
  ]);
};
