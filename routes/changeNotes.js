const express = require('express')

const dp = require("../database/mongoDB");


const router = express.Router()


router.get('/notes/:id', async function (req, res) {
    let query = 'SELECT * FROM notes where id = ?';
    const [note] = await dp.query(query,[req.params.id]);
    if (!note || note.length == 0) {
      return res.status(404).send('<h1> Sorry, we cannot find that note! </h1>');
    }
    res.render("note",{note:note[0]})
  });



  router.get('/notes/:id/edit', async function (req, res) {
    let query = 'SELECT * FROM notes where id = ?';
    const [note] = await dp.query(query,[req.params.id]);
  
    if (!note || note.length == 0) {
      return res.status(404).send('<h1> Sorry, we cannot find that note! </h1>');
    }
  
    res.render("updatenote",{note:note[0]});
  });
  


  router.post('/notes/:id/edit', async function (req, res) {
    let query = 'UPDATE  notes SET auther_name=?, title=?, summary=?, content=? WHERE  id = ?';
  
    list = [
      req.fields.auther,
      req.fields.title,
      req.fields.summary,
      req.fields.content,
      req.params.id
    ];
    console.log(list,req.fields);
    try{
    await dp.query(query,list);
    res.send({success: true})
    }catch (err) {
    console.log(err)    
    res.send({success: false})
    }
  });
  


  router.post('/notes/:id/delete', async function (req, res) {
    let query = 'delete from notes where id = ?';
    try{
      await dp.query(query,[req.params.id]);
      res.send({success: true})
    }catch (err) {
      res.send({success: false})
    }
  });
  
  
  



module.exports = router