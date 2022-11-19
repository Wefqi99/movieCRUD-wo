const express = require("express");
const app = express();

//pasword: OM78NHcASEKkB48e
//user: wefqi99
//connectionString: mongodb+srv://wefqi099:<password>@cluster0.ls59kvg.mongodb.net/?retryWrites=true&w=majority

app.use(express.static(__dirname + '/client'))


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require("mongoose");

const mongooseUri = "mongodb+srv://wefqi099:OM78NHcASEKkB48e@cluster0.ls59kvg.mongodb.net/movieDatabase"
mongoose.connect(mongooseUri, {useNewUrlParser: true}, {useUnifiedTopology: true})
const movieSchema = {
	title: String,
	comments: String
}
const Movie = mongoose.model("movie", movieSchema);



async function main() {

	const mongooseUri = "mongodb+srv://wefqi099:OM78NHcASEKkB48e@cluster0.ls59kvg.mongodb.net/movieDatabase"

	const client = new MongoClient(mongooseUri);

	try {
		await client.connect();
	} catch (ex) {
		console.log(ex)
	} finally {
		await client.close();
	}

	try {
		deleteByName(client, "Thor")
	} catch (ex) {
		console.log(ex)
	}
}


app.post("/create", function(req, res){
	let newNote = new Movie({
		title: req.body.title,
		comments: req.body.comments
	})
	
	newNote.save();
	res.redirect("/");
})

app.delete("/delete", async function (req) {
	const mongooseUri = "mongodb+srv://wefqi099:OM78NHcASEKkB48e@cluster0.ls59kvg.mongodb.net/movieDatabase"

	const client = new MongoClient(mongooseUri);

	try {
		await client.connect();
	} catch (ex) {
		console.log(ex)
	} finally {
		await client.close();
	}
	
	await client.db("movieDatabase").collection("movies").deleteOne({title: req});

})

app.put("/update"), async function(req, res) {

	const mongooseUri = "mongodb+srv://wefqi099:OM78NHcASEKkB48e@cluster0.ls59kvg.mongodb.net/movieDatabase"

	const client = new MongoClient(mongooseUri);

	try {
		await client.connect();
	} catch (ex) {
		console.log(ex)
	} finally {
		await client.close();
	}

	Movie.findByIdAndUpdate()
}


const renderNotes = (notesArray) => {
	let text = "Movies Collection:\n\n";
	notesArray.forEach((note)=>{
		text += "Title: " + note.title  + "\n";
		text += "Comments: " + note.comments  + "\n";
		text += "ID:" + note._id + "\n\n";
	})
	text += "Total Count: " + notesArray.length;
	return text
}

app.get("/read", function(request, response) {
	Movie.find({}).then(notes => { 
		response.type('text/plain');
		response.send(renderNotes(notes));
	})
})


const port = process.env.PORT || 3000
app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})

async function deleteByName(client, nameOfMovie) {
	const result = await client.db("movieDatabase").collection("movies").deleteOne({title: nameOfMovie});
	console.log("deleted")
}



