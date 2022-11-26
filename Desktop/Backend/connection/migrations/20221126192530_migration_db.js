/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("name", 255).notNullable().unique();
      table.string("phone", 255).notNullable().unique();
      table.string("username", 255).notNullable().unique();
      table.string("email", 255).notNullable().unique();
      table.string("password", 255).notNullable();
      table.integer("level").unsigned();
    })
    .createTable("devices", function (table) {
      table.increments("id");
      table.string("code_device", 255).notNullable().unique();
      table.string("alamat", 255).notNullable().unique();
    })
    .createTable("condition", function (table) {
      table.increments("id");
      table.integer("device_id").notNullable().unique();
      table.foreign("device_id").references("devices.id");
      table.integer("lux").notNullable();
      table.float("temperature").notNullable();
      table.float("humidity").notNullable();
    })
    .createTable("access", function (table) {
      table.increments("id");
      table.integer("user_id").notNullable();
      table.foreign("user_id").references("users.id");
      table.integer("device_id").notNullable();
      table.foreign("device_id").references("devices.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("access")
    .dropTableIfExists("condition")
    .dropTableIfExists("users")
    .dropTableIfExists("devices");
};
