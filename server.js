var express = require('express')
var app     = express()

app.use(express.static(__dirname + "/public"))

app.get('/contactlist', function (req, res) {
	console.log("I received a GET request")

	person1 = {
			name: 'Rick',
			email: 'rick@gmail.com',
			number: '(222) 222-2222'
		},

		person2 = {
			name: 'John',
			email: 'john@gmail.com',
			number: '(333) 333-3333'
		},

		person3 = {
			name: 'Hilda',
			email: 'hilda@gmail.com',
			number: '(444) 444-4444'
		}

		var contactlist = [person1, person2, person3]
		res.json(contactlist)
})
    
app.listen(3000)
console.log('server running on port 3000')