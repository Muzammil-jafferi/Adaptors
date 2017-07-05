let database = {}

class ObjectAdapter {
	constructor(name) {
		this.name = name
	}

	save(newData, callback) {
		newData.id = (Math.floor((Math.random() * 1000) + 1)) + (new Date().getTime());
		// if not found  then create
		if (!database[this.name])
			database[this.name] = {}

		database[this.name][newData.id] = newData
		console.log("1223",database[this.name][newData.id])
		callback(null, database[this.name][newData.id].id)
	}
	update(id, edit, callback) {
		// Merging data with one another
		var data = database[this.name];
		Object.assign(data[id], edit)
		console.log("qq",database[this.name][id])
		callback(null, database[this.name][id].id)
	}

	delete(id, callback) {
		var wholeData = database[this.name]
			// Deleting Particular data
		delete wholeData[id]
		callback(null)
	}
	getParticular(id, callback) {
		callback(null, database[this.name][id])
	}
	getAll(callback) {
		callback(null, database[this.name])
	}
}

module.exports = ObjectAdapter