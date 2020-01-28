
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('user_name', 128)
          .notNullable()
          .unique();
      tbl.string('user_password',500)
          .notNullable();
      tbl.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
