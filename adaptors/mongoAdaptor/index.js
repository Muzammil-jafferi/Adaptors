class mongoAdapter {
	constructor(name) {
		this.name = name
		this.DB = {}
	}
	connect(callback) {
		// using this in callback || bind is the way
		var that = this
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://127.0.0.1:27017/mongoAdaptors', function(err, db) {
			if (err)
				callback(err)

			console.log("Connected")
			that.DB = db
			callback()
		});
	}
	save(newData, callback) {
		newData.id = (Math.floor((Math.random() * 10) + 1)) + (new Date().getTime());
		let col = this.DB.collection(this.name)
			// insert keyword is used to insert the data 
			console.log("@@",newData)
		col.insert(newData, function(err, data) {
			if (err) {
				throw err;
				callback(err)
			} else {
				col.findOne({
					id: newData.id
				}, function(err, oneData) {
					callback(null, oneData.id)
				})
			}
		})
	}
	update(data, edit, callback) {
		let col = this.DB.collection(this.name)
		console.log("123",edit)
			// findOneAndUpdate keyword is used to find first and update in it
		col.findOneAndUpdate({
			id: data
		}, {
			$set: edit
		}, function(err, updatedData) {
			if (err) {
				throw err;
				callback(err)
			} else {
				// findOne keyword is used to find the single data if givent query matches or it return the first in that.
				col.findOne({
					id: data
				}, function(err, oneData) {
					console.log("12",oneData)
					callback(null, oneData.id)
				})
			}
		})
	}
	delete(data, callback) {
		let col = this.DB.collection(this.name)
			// findOneAndUpdate keyword is used to find first and delete it
		col.findOneAndDelete({
			id: data
		}, function(err, getdata) {
			if (err) {
				callback(err)
			} else {
				callback(null, getdata)
			}
		})
	}
	getAll(callback) {
		this.DB.collection(this.name).find({}, function(err, wholeData) {
			if (err) {
				callback(err)
			} else {
				callback(wholeData)
			}
		})
	}
	getParticular(data, callback) {
		this.DB.collection(this.name).findOne({
			id: data.id
		}, function(err, singleData) {
			if (err) {
				callback(err)
			} else {
				callback(singleData)
			}
		})
	}

}

module.exports = mongoAdapter