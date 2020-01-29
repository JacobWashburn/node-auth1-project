const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
};

function find() {
    return db('users').select('id', 'user_name');
}

function findBy(filter) {
    return db('users')
        .select('id', 'user_name', 'user_password')
        .where('user_name', filter)
        .first();
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            return findById(ids[0]);
        });
}

function findById(id) {
    return db('users')
        .select('id', 'user_name', 'user_password')
        .where({id})
        .first();
}
