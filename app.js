const path = require('path');

const { v4: uuidv4 } = require("uuid");
const express = require("express");
const formidable = require('express-formidable');

const dp = require("./database/mongoDB");
const router = require("./routes/changeNotes");




app = express();

app.use('/public',express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const formidableConfig ={
  uploadDir: __dirname + "public/uploads", 
  keepExtensions: true, 
  filename: (req, file, cb) => { 
    const uniqueName = uuidv4();
    
    const extension = path.extname(file.name);

    cb(null, uniqueName + extension);
  }
}
app.use(formidable(formidableConfig));


app.use(router);


//================================================================



app.get('/', function (req, res) {
  res.redirect("/notes");
});

app.get('/notes', async function (req, res) {
  let query = 'SELECT id, title, summary, auther_name, note_date FROM notes';
  const [notes] = await dp.query(query);
  res.render("notes",{notes:notes})
});



app.get('/createnote', async function (req, res) {
  res.render("createnote",{})
});


app.post('/createnote', async function (req, res) {
  let query = 'insert into notes (auther_name, title, summary, content) VALUES (?)';
  list = [
    req.fields.auther,
    req.fields.title,
    req.fields.summary,
    req.fields.content
  ];
  console.log(list,req.fields);
  try{
  await dp.query(query,[list]);
  res.send({success: true})
  }catch (err) {
    
  res.send({success: false})
  }
});




//===================================================================


app.use((req, res, next) => {
    res.status(404).send('<h1> Sorry, we cannot find that! </h1>');
  });

app.use((err,req, res, next) => {
    console.error(err)
    res.status(500 || err.status).send('<h1> Sorry, something went wrong </h1>');
  });


port = 3000
app.listen(port,(err, req, res)=>{
    if (err){
        console.error(err)
    }
    console.log("listenning on port " +port + ".......")
})
