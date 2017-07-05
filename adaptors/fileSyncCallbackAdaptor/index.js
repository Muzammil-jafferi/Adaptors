let fs = require("fs")
let fileExists = require('file-exists');

class FileSyncAdapter {
	constructor(name) {
		this.name = name
	}
	save(newData, callback) {
		newData.id = (Math.floor((Math.random() * 10) + 1)) + (new Date().getTime());
		var a = {}
		a[newData.id] = newData
		fs.stat('newFileSync.json', function(err) {
			if (err) {
				fs.writeFile('newFileSync.json', JSON.stringify(a), function(err, data) {
					if (err) {
						callback(err);
					} else {
						callback(null, data)
					}
				});
			} else {
				fs.readFile('newFileSync.json', 'utf8', function(err, readData) {
					if (err) {
						callback(err)
					} else {
						var makeData = JSON.parse(readData)
						makeData[newData.id] = newData
						fs.writeFile('newFileSync.json', '\n' + JSON.stringify(makeData), function(err, data) {
							if (err) {
								callback(err);
							}
							callback(null, newData.id)
						})
					}
				})
			}
		})
	}

	update(id, edit, callback) {
		fs.readFile('newFileAsync.json', 'utf-8', function(err, readData) {
			if (err) {
				callback(err);
			} else {
				let editData = JSON.parse(readData)
				Object.assign(id, edit)
				fs.writeFile('newFileSync.json', JSON.stringify(editData), function(err,data) {
					if (err) {
						callback(err);
					} else {
						callback(null, id)
					}
				})
			}
		})
	}

	delete(id, callback) {
		fs.readFile('newFileSync.json', 'utf8', function(err, readData) {
			if (err) {
				throw err
				callback(err);
			} else {
				let deleteData = JSON.parse(readData)
				delete deleteData[id]
				fs.writeFile('newFileSync.json', JSON.stringify(deleteData), function(err) {
					if (err) {
						throw err
						callback(err);
					}else {
						callback(null)
					}
				})
			}
		})
	}
	getParticular(id, callback) {
		fs.readFile('newFileSync.json', 'utf8', function(err, readData) {
			if (err) {
				callback(err)
			} else {
				let getData = JSON.parse(readData)
				let getParticularData = getData[id]
				callback(getParticularData)
			}
		})
	}
	getAll(callback) {
		fs.readFile('newFileSync.json', 'utf8', function(err, readData) {
			if (err) {
				callback(err)
			} else {
				let getData = JSON.parse(readData)
				callback(getData)

			}
		})
	}

}
module.exports = FileSyncAdapter