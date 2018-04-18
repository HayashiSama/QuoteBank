// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.use(express.static( __dirname + '/QuoteRanks/dist' ));


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quotes');

var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    quotes: {type: Array, default: []},
}, {timestamps: true });

//Each quote will be {quote: quote, votes: numVotes

mongoose.model('Author', AuthorSchema)

var Author = mongoose.model('Author')


app.get('/authors', function(req, res) {
    Author.find({}, function(err, authors) {
        console.log(authors)
        if(err){
            res.json({message:"error", error: err})
        }
        else{
            res.json({message: "Success", data: authors})
        }
        
        
    }) 
})
app.get('/author/:id', function(req, res) {
    Author.findOne({_id: req.params.id}, function(err, author) {
        
        if(err){
            res.json({message:"error", error: err})
        }
        else{
            res.json({message: "Success", author: author})
        }
        
        
    }) 
})

app.post('/new', function(req, res){
	var newAuth = new Author(req.body);
	console.log("making new author");
	newAuth.save(function (err){
		if(err){
			console.log("error creating")
			res.json({message:"error creating"});
		}
		else{
			res.json({message:"Success", id: newAuth._id})
		}
	})
})

app.put('/edit', function(req, res){
	console.log("editing author")
	Author.findOne({_id: req.body.id}, function(err, author){
		console.log(author)
		author.name = req.body.name;
		author.save(function(err){
			if(err){
				console.log("error creating")
				res.json({message: err});
			}
			else{
				res.json({message:"Success", id: author._id})
			}
		})

	})
})

app.delete('/deletequote/:id/:quote', function(req, res){

	console.log("deleting author id: ", req.params.id)
	Author.findOne({_id: req.params.id}, function(err, author){
		if(err){
			res.json({message: err})
		}
		else{
			for(var i = 0; i < author.quotes.length; i++){
				if(author.quotes[i].quote == req.params.quote){
					console.log("match found")
					author.quotes.splice(i, 1);
					author.markModified('quotes')
					author.save(function(err){
						if(err){
							res.json({message: "Error removing quote from array"})
						}
						else{
							res.json({message: "Success"})
						}
					})
				}

			}
		}
	})
})

app.put('/addquote', function(req, res){
	console.log(req.body)
	var found = false;
	if(req.body.quote.length < 3){
		
		res.json({message:"Error, quote must be at least 3 characters"})
	}

	else{
		Author.findOne({_id: req.body.id}, function(err, author){
			if(err){
				console.log("error adding quote");
				res.json({message: err});
			}
			else{

				for(var i = 0; i < author.quotes.length; i++){
					if(author.quotes[i].quote == req.body.quote){
						found = true;
						res.json({message: "Quote already exists"})
					}
				}

				if(!found){
						console.log("new quote")
						author.quotes.push({quote: req.body.quote, votes: 0});
						author.markModified('quotes');
						author.save(function(err){
							if(err){
								console.log("error saving after adding quote")
								res.json({message: err});
							}
							else{
								console.log("success adding")
								res.json({message: "Success"})
							}
						})
					}
				
			}
		})
	}
})

app.put('/vote', function(req, res){
	console.log(req.body)
	Author.findOne({_id: req.body.id}, function(err, author){
		if(err){
			console.log("error voting quote");
			res.json({message: err});
		}
		else{
			for(var i = 0; i < author.quotes.length; i++){
				if(author.quotes[i].quote == req.body.quote.quote){
					
					author.quotes[i].votes += req.body.increment;
					console.log(author.quotes[i]);
					author.markModified('quotes')
					author.save(function(err){
						if(err){
							console.log("error saving after voting quote")
							res.json({message: err});
						}
						else{
							
							res.json({message: "Success"});
						}
					})
				}
			}

		}		
	})

})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./QuoteRanks/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})