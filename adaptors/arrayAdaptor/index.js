let database = []
class ArrayAdapter {
	constructor(name) {
		this.name = name
	}
	save(newData, callback) {
		newData.id = (Math.floor((Math.random() * 1000) + 1)) + (new Date().getTime());
		// if not found  then create
		if (!database[this.name])
			database[this.name] = []

		database[this.name][newData.id] = newData
			// return database[this.name][newData.id]
		callback(null, database[this.name][newData.id].id)
	}
	update(id, edit, callback) {
		// Merging data with one another
		var data = database[this.name];
		Object.assign(data[id], edit)
			// return database[this.name][id];
		callback(null, database[this.name][id])
	}

	delete(id, callback) {
		var index = database[this.name].indexOf(id)
			// Deleting Particular data
		database[this.name].splice(index, 1)
		callback(null)
	}
	getParticular(id, callback) {
		callback(null, database[this.name][id])
	}
	getAll(callback) {
		callback(null, database[this.name])
	}
}
module.exports = ArrayAdapter