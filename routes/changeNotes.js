const express = require('express')

const {getdb,objectId} = require("../database/mongoDB");

const router = express.Router()

router.get('/posts/:id', async function (req, res) {
    let query = 'SELECT * FROM notes where id = ?';
    const [post] = await db.collection("posts").find({_id:new objectId(req.params.id)}).toArray();
    if (!post || post.length == 0) {
      return res.status(404).send('<h1> Sorry, we cannot find that note! </h1>');
    }
    res.render("post",{post:post})
  });



  router.get('/posts/:id/edit', async function (req, res) {
    const [post] = await db.collection("posts").find({_id:new objectId(req.params.id)}).toArray();
    try {   
      const authers = await db.collection("authers").find({}).toArray();

      res.render("updatepost",{post:post,authers:authers});
    } catch (error) {
      next(error)
    }
   
  });
  


  router.post('/posts/:id/edit', async function (req, res) {
    let auther = null;
    try{
      console.log(req.fields)
      auther = await db.collection("authers").find({_id:new objectId(req.fields.auther)}).toArray();
      auther = auther[0]

      }catch (err) {
        console.error(err)
      return res.send({success: false})
    } 
    post = {
      auther_id:auther._id,
      title:req.fields.title,
      summary:req.fields.summary,
      content:req.fields.content,
      modified_date:new Date(),
      auther:{
        name:auther.name,
        mail:auther.mail
      }
    };
  
    try{
    await db.collection("posts").updateOne({_id:new objectId(req.params.id)},{$set:post})
    res.send({success: true})
    }catch (err) {
      console.error(err)
    res.send({success: false})
    }
  });
  


  router.post('/posts/:id/delete', async function (req, res) {
    
    try{
      await db.collection("posts").deleteOne({_id:new objectId(req.params.id)})
      res.send({success: true})
    }catch (err) {
      console.error(err)
      res.send({success: false})
    }
  });
  
  
  



module.exports = router