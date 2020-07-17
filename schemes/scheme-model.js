const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first()
}

function findSteps(id) {
    return db('schemes as sc')
        .join('steps as st', 'sc.id', 'st.scheme_id')
        .select('st.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
        .where({ scheme_id: id })
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(res => {
            return findById(res)
        })
}

function update(changes, id) {
    return db("schemes")
		.where({ id })
		.update(changes)
		.then(() => findById(id));
}

function remove(id) {
    return findById(id).then((scheme) => {
		return db("schemes")
			.where({ id })
			.del()
			.then(() => scheme);
	});
}