let config = require("../config.json")
	// To check the source available by config file of adapter.
	// if not set then take a default adapter(arrayAdapter).
let adaptor = require('../adaptors/arrayAdaptor')
if (config.adaptors)
	adaptor = require('../adaptors/' + config.adaptors)

class Middleware {
	constructor(name) {
		this.adaptor = new adaptor(name)
	}
	connect(a) {
		if (config.adaptors == "mongoAdaptor") {
			return this.adaptor.connect(a)
		} else {
			console.log("no Connect")
				// return blank callback if connect not found
			return a()
		}
	}
	save(newData,cb) {
		return this.adaptor.save(newData,cb)
	}
	update(id, data, edit,cb) {
		return this.adaptor.update(id, data, edit,cb)
	}
	delete(id,cb) {
		this.adaptor.delete(id,cb)
	}
	getParticular(id, cb) {
		return this.adaptor.getParticular(id, cb)
	}
	getAll(cb) {
		return this.adaptor.getParticular(cb)
	}
}
module.exports = Middleware