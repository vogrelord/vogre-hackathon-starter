
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('abonement_types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('abonement_types').insert({name: '8', price: 3000, weeks:5, lessons: 8}),
        knex('abonement_types').insert({name: '16', price: 5000, weeks:5, lessons: 16}),
        knex('abonement_types').insert({name: '8 студент', price: 2400, weeks:5, lessons: 8}),
        knex('abonement_types').insert({name: '16 студент', price: 4000, weeks:5, lessons: 16}),
        knex('abonement_types').insert({name: '8 первый раз с парой', price: 2800, weeks:5, lessons: 8}),
        knex('abonement_types').insert({name: '16 первый раз с парой', price: 4800, weeks:5, lessons: 16}),
        knex('abonement_types').insert({name: '8 студент первый раз с парой', price: 2200, weeks:5, lessons: 8}),
        knex('abonement_types').insert({name: '16 студент первый раз с парой', price: 3800, weeks:5, lessons: 16}),
      ]);
    });
};
