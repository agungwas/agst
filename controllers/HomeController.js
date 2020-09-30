const { Post, Tag } = require("../models")

class HomeController{
    static home(req, res) {
        Post.findAll({
            include: Tag
        })
        .then(tag => {  
            
        })
    }
}

module.exports = HomeController