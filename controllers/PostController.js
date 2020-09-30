const {Post, Tag, TagNews} = require("../models")

class PostController {

  static posts(req, res){
    Post.findAll({
      include: Tag,
      order: ["id"]
    })
    .then(posts => res.render('posts', {posts, session: req.session}))
    .catch(err => res.send(err))
  }

  static postsAdd(req, res){
    let tags = null
    Tag.findAll()
    .then(data => {
      tags = data
      res.render('postsAdd', {tags, session: req.session})
    })
    .catch(err => res.send(err))
  }

  static postPostsAdd(req, res){
    Post.create({
      title: req.body.title,
      content: req.body.content
    })
    .then(post => {
      let tags = null
      tags = req.body.TagId.map(el => {
        return {PostId: post.id, TagId: el}
      })
      console.log(tags)
      return TagNews.bulkCreate(tags)
    })
    .then(data => res.redirect("/posts"))
    .catch(err => res.send(err))
  }

  static postsEdit(req, res){
    let tags = null
    Tag.findAll()
    .then(data => {
      tags = data
      return Post.findByPk(req.params.id,{
        include: Tag
      })
    })
    .then(post => {
      let sama = post.Tags.map(el => {
        return el.id
      });
      res.render('postsEdit', {post, tags, sama, session: req.session})
    })
    .catch(err => res.send(err))
  }

  static postPostsEdit(req, res){
    let idPost = null
    Post.destroy({
      where:{
        id:req.params.id
      }
    })
    Post.create({
      title: req.body.title,
      content: req.body.content
    })
    .then(post => {
      let tags = null
      tags = req.body.TagId.map(el => {
        return {PostId: post.id, TagId: el, session: req.session}
      })
      console.log(tags)
      return TagNews.bulkCreate(tags)
    })
    .then(data => res.redirect("/posts"))
    .catch(err => res.send(err))
  }

  static postsDelete(req, res){
    // res.send(req.params.id)
    Post.destroy({
      where:{
        id:req.params.id
      }
    })
    .then(data => res.redirect("/posts"))
    .catch(err => res.send(err))
  }

}


module.exports = PostController