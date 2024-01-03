const express = require('express')

const {getdb,objectId} = require("../database/mongoDB");

const router = express.Router()

router.get('/posts/:id', async function (req, res) {
  try {
    const [post] = await db.collection("posts").find({_id:new objectId(req.params.id)}).toArray();
    if (!post || post.length == 0) {
      return res.status(404).render("404");
    }
    res.render("post",{post:post})
  } catch (error) {
    console.error(error)
    return res.status(500).render("500")
  }

  });



  router.get('/posts/:id/edit', async function (req, res) {
    const [post] = await db.collection("posts").find({_id:new objectId(req.params.id)}).toArray();
    try {   
      const authers = await db.collection("authers").find({}).toArray();

      res.render("updatepost",{post:post,authers:authers});
    } catch (error) {
      return res.status(500).render("500")
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
 
  









  router.get('/posts/:id/comments', async function (req, res) {
    try {
      const where = {post_id:new objectId(req.params.id)}
      console.log(req.query.skip)
      const options = {skip:+req.query.skip, limit:5}
      const comments = await db.collection("comments").find(where,options).toArray();
      if (!comments || comments.length == 0) {
        return res.json({success: true});
      }else {
        
        return res.json({success: true,comments: comments});
      }

    } catch (error) {
      console.error(error)
      return res.json({success: false});
    }
  
    });




    

  router.post('/posts/:id/comment', async function (req, res) {
    const post_id = req.params.id;
    try {
      const [post] = await db.collection("posts").find({_id:new objectId(post_id)}).toArray();
      if (post) {
        comment={
          post_id:new objectId(post_id),
          title:req.fields.title,
          content:req.fields.content
        }
        
        let dbres =  await db.collection("comments").insertOne(comment)
        // console.log(dbres,comment);
        return res.json({success: true});
      }
      return res.json({success: false});

    } catch (error) {
      console.error(error)
      return res.json({success: false});
    }
  
  });
  
  



module.exports = router