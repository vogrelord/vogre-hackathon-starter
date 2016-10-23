
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('pages', function(table) {
            table.increments('id').primary();
            table.string('slug').index();
            table.string('title');
            table.text('text');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pages'),
  ]);
};
