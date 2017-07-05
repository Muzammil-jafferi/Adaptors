let Middleware = require("./middleware");

class User extends Middleware {
	constructor() {
		super('user')
	}
	connect(cb) {
		return super.connect(cb)
	}
	save(data,cb) {
		return super.save(data,cb)
	}
	update(id, edit, cb) {
		return super.update(id, edit, cb)
	}
	delete(id,cb) {
		super.delete(id,cb)
	}
	getParticular(id, cb) {
		return super.getParticular(id, cb)
	}
	getAll(cb) {
		return super.getParticular(cb)
	}
}

class Product extends Middleware {
	constructor() {
		return super('product')
	}
	connect(cb) {
		return super.connect(cb)
	}
	save(data, cb) {
		return super.save(data, cb)
	}
	update(id, edit, cb) {
		return super.update(id, edit, cb)
	}
	delete(id, cb) {
		super.delete(id, cb)
	}
	getParticular(id, cb) {
		return super.getParticular(id, cb)
	}
	getAll(cb) {
		return super.getParticular(cb)
	}
}
let data = {
	name: "karan",
	age: "05",
	email: "karan@gmail.com"
}
let data1 = {
	productName: "MI",
	price: 13000,
	company: "REDMI"
}
let edit = {
	name: "muzzu",
	age: 55
}

let a = new User
/*a.save(data).then((successMessage) => {
	//console.log("save");
	a.update(data.id, edit).then((successMessage1) => {
		//console.log("updated",successMessage1)
		a.delete(successMessage1)

	})
})
*/

a.connect(function(err) {
	if (err) {
		console.log(err)
	} else {
		a.save(data, function(err, dataDetails) {
			if (err) {
				// throw err;
				console.log("Error", err)
			} else {
				console.log("Saved", dataDetails)
				a.update(dataDetails, edit, function(err, updatedData) {
					if (err) {
						throw err;
					} else {
						console.log("updated", updatedData)
						a.delete(updatedData, function(err, deletedData) {
							if (err) {
								console.log(err)
							} else {
								console.log("deleted", deletedData)
								console.log("Done all task")

							}
						})
					}
				})
			}
		})
	}
})