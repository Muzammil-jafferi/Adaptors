// API key of app  : blte5c2d521b31de70c
const request = require("request")

class NetworkAdaptor {
	constructor(name) {
		this.name = name
	}

	save(data, callback) {
		let option = {
			"method": "POST",
			"url": "https://api.built.io/v1/classes/"+this.name+"/objects/",
			"headers": {
				"application_api_key": "blte5c2d521b31de70c"
			},
			"json": {
				"object": data
			}
		}
		request(option, function(err, database) {
			if (err) {
					callback(err)
			} else {
				callback(null, database.body.object.uid)
			}
		})
	}
	update(id, edit, callback) {
		let option = {
			"method": "PUT",
			"url": "https://api.built.io/v1/classes/"+this.name+"/objects/" + id,
			"headers": {
				"application_api_key": "blte5c2d521b31de70c"
			},
			"json": {
				"object": edit
			}
		}
		request(option, function(err, database) {
			if (err) {
				callback(err)
			} else {
				callback(null, database.body.object.uid)
			}
		})
	}
	delete(id, callback) {
		let option = {
			"method": "DELETE",
			"url": "https://api.built.io/v1/classes/"+this.name+"/objects/" + id,
			"headers": {
				"application_api_key": "blte5c2d521b31de70c"
			},
		}
		request(option, function(err, database) {
			if (err) {
				callback(err)
			} else {
				callback(null, null)
			}
		})
	}
}

module.exports = NetworkAdaptor