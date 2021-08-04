const axios = require('axios')

exports.homeRoutes = (req,res)=> {
    //make a GET request to /api/users
    axios.get('http://localhost:4000/api/users')
    .then(function(response){
        res.render('index',{users: response.data})
    })
    .catch(err => {
        res.send(err);
    })
}

exports.addUserRoutes = (req,res)=> {
    res.render('adduser')
}
exports.updateUserRoutes = (req,res)=> {
    axios.get('http://localhost:4000/api/users',{params : {id: req.query.id}})
    .then(function(userdata){
        res.render("update_user",{ user : userdata.data})
    })
    .catch(err => {
        res.send({message:"Under Maintainence"})
    })
}