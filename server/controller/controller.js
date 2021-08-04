var UserDb = require ('../model/model')

//create and save new user

exports.create = (req,res) => {
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"})
        return;
    }

    //new user
    const user = new UserDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status:req.body.status
    })

    //save user
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/adduser')
        })
        .catch(err=> {
            res.status(500).send({
                message: err.message || "Some Error occured while creating"
            })
        })
}

//retrieve and return all/single user
exports.find = (req,res) => {

    if(req.query.id){
        const id = req.query.id;

        UserDb.findById(id)
        .then(data => {
            if(data){
                res.status(404).send({message:"Not Found User with id:"+id})
            }
            else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error retrievignuser with id:"+id})
        })
    }
    else{
    UserDb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message:err.message || "Error occured while retrieving user data"})
    })
    }
}

//update a new identified user by user id
exports.update = (req,res) => {
    if(!req.body){
        return res.status(400)
        .send({message: "Data to update cannot be empty"})
    }

    const id = req.params.id;
    UserDb.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
        if(!data){
            res.status(404).send({message: `Cannot Update User with ${id}. Maybe user Not Found`})
        }
        else
        {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send ({message:"Error in updating User Info"})
    })

}

//delete a user 
exports.delete = (req,res) => {
    const id = req.params.id;

    UserDb.findByIdAndDelete(id)
    .then(data => {
        if(!data)
        {
            res.status(404).send ({message : `Cannot delete with ${id}.Maybe id is wrong`})
        }
        else{
            res.send({message: "User deleted Successfully"})
        }
    })
    .catch(err => {
        res.status(500).send({message:"Could not delete user with="+id})
    })
}