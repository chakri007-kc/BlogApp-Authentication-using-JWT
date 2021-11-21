const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')

router.get('/',async(req,res)=>{
    const user = await User.find()
    res.json(user)
})

router.post('/api/register', async(req,res) => {
    try{
        const newPassword = await bcrypt.hash(req.body.password,10)
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        }
        await User.create(user)
        
        res.json({status : 'ok'})   
    }
    catch(err){
        res.json({status : 'error' , error : 'Duplicate email'})
    }
})

router.post('/api/login', async(req,res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if(!user){
        return  { status: 'error' , error: 'Invalid login' }
    }

    const isPasswordValid = await bcrypt.compare(req.body.password,user.password)

    if(isPasswordValid){
        const token = jwt.sign({
            name: user.name,
            email: user.email
        },'secret123')
        return res.json({status:'ok' , user: token})
    }
    else{
        return res.json({status:'error' , user: false})
    }
})

router.get('/api/todo',async(req,res) => {
    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email;
        const user = await User.findOne({email:email})
        // console.log(user.name)
        return res.json({status:'ok' , list : user.list})
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})

router.post('/api/todo/add',async(req,res) => {
    const token = req.headers['x-access-token']
    var new_post = {title:req.body.title,des:req.body.des} 
    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email;
        const user = await User.findOneAndUpdate(
            { email: email },
            { $push: {list: new_post}}
            
        )

        return res.json({status:'ok'})
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})

router.delete('/api/todo/:id',async(req,res) => {
    const token = req.headers['x-access-token']
    var delete_post={_id : req.params.id}
    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email;
        // console.log(email)
        console.log(req.params.id)
        const user = await User.findOneAndUpdate(
            { email: email },
            { $pull: {list:  delete_post } },
            {new:true}
        )
        .then(templates => console.log(templates))
        .catch(err => console.log(err));

        return res.json({status:'ok'})
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})

router.put('/api/todo/update/:id',async(req,res) => {
    // console.log('hey')
    const token = req.headers['x-access-token']
    var new_post = {title:req.body.title,des:req.body.des} 
    try{
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email;
        // console.log(email)
        const user1 = await User.findOne({
            email: email
        })
        console.log(req.params.id,user1._id)

        const user = await User.findOne(
            { email: email }
        )

        // console.log(user)

        await user.list.findOneAndUpdate({ id: req.params.id},{
            $set :  new_post
        })
        // const user = await User.findOneAndUpdate(
        //     { email: email },                                                                    
        //     { $set: {list$post:  new_post } }
        // )
        // .then(templates => console.log(templates))
        // .catch(err => console.log(err));

        return res.json({status:'ok'})
    }
    catch(err){
         return res.json({status:'error' , error:'invalid token'})
    }
})




module.exports = router;