let fs = require('fs')
var fsAccess = require('fs-access')

class FileAsyncAdapter {
	constructor(name) {
		this.name = name

	}

	save(newData,callback) {
		newData.id = (Math.floor((Math.random() * 10) + 1)) + (new Date().getTime());
		var a = {}
		a[newData.id] = newData
		fs.stat('newFileAsync.json', function(err) {
			console.log(err)
			if (err) {
				fs.writeFile('newFileAsync.json', JSON.stringify(a), function(err, data) {
					if (err) {
						callback(err);
					} else {
						console.log("abc", newData.id)
						callback(null, newData.id)
					}
				});
			} else {
				fs.readFile('newFileAsync.json', 'utf8', function(err, readData) {
					console.log("pqr")
					if (err) {
						callback(err)
					} else {
						var makeData = JSON.parse(readData)
						makeData[newData.id] = newData
						fs.writeFile('newFileAsync.json', '\n' + JSON.stringify(makeData), function(err, data) {
							if (err) {
								callback(err);
							}
							console.log(newData, "321")
							callback(null, newData.id)
						})
					}
				})
			}
		})
	}

	update(id, edit,callback) {
		console.log("hii")
		fs.readFile('newFileAsync.json', 'utf-8', function(err, readData) {
			if (err) {
				callback(err);
			} else {
				let editData = JSON.parse(readData)
				console.log(editData, "pp")
				console.log(id, "jj")
				Object.assign(editData[id], edit)
				fs.writeFile('newFileAsync.json', JSON.stringify(editData), function(err, data) {
					if (err) {
						callback(err);
					} else {
						callback(null, id)

					}
				})
			}
		})

	}

	delete(id,callback) {
		console.log("hhh")
			fs.readFile('newFileAsync.json', 'utf8', function(err, readData) {
				if (err) {
					throw err
					callback(err);
				} else {
					let deleteData = JSON.parse(readData)
					console.log(deleteData[id], "mm")
					delete deleteData[id]
					fs.writeFile('newFileAsync.json', JSON.stringify(deleteData), function(err) {
						if (err) {
							throw err
							callback(err);
						} else {
							console.log("delete1")
							callback()
						}
					})
				}
		})
	}
	getParticular(id, callback) {
		fs.readFile('newFileAsync.json', 'utf8', function(err, readData) {
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
		fs.readFile('newFileAsync.json', 'utf8', function(err, readData) {
			if (err) {
				callback(err)
			} else {
				let getData = JSON.parse(readData)
				callback(getData)

			}
		})
	}
}

module.exports = FileAsyncAdapter