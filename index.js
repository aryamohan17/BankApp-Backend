// import data service file
const dataservice =require('./service/dataservices')
// import jsonweblibrary
const jwt = require('jsonwebtoken') 

// import cors
const cors = require('cors')

// import express
    const express = require("express")

    // create application
    const app = express()

    // connection string to front end integration
    app.use(cors({origin:'http://localhost:4200'}))
       // parse json to js :- order is very imp.........
       app.use(express.json())
       const jsonwebtoken=(req,res,next)=>{
        // tocken passed through body
       try{ 
        // TOCKEN IN BODY
        // const tocken=req.body.tocken
        // TOCKEN IN HEADERS
        const tocken=req.headers['access_tocken']

        const data=jwt.verify(tocken,"sceretKey")
        // when we are verify middle it will be stuck, then using next() method
        next()
        }
        catch{
            res.status(422).json({
                statusCode:422,
                status:false,
                message:"please login first"
            })
        }
       }

    // register app
    app.post('/register',(req,res)=>{
        // this place use Uname Accno and password exist in  
        dataservice.register(req.body.uName,req.body.Accno,req.body.pass).then(result=>{
            res.status(result.statusCode).json(result)
        })
    })
         // login app
    app.post('/login',(req,res)=>{
        // this place use Uname Accno and password exist in  
        dataservice.login(req.body.Accno,req.body.pass).then(result=>{
            res.status(result.statusCode).json(result)
        })
    })
       
   // deposit app
   app.post('/deposit',jsonwebtoken,(req,res)=>{
    // this place use Uname Accno and password exist in  
    dataservice.deposit(req.body.acc,req.body.pass,req.body.amnt).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
   // withdraw app
   app.post('/withdraw',jsonwebtoken,(req,res)=>{
    // this place use Uname Accno and password exist in  
    dataservice.withdraw(req.body.acc,req.body.pass,req.body.amnt).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
// transaction
app.post('/transaction',jsonwebtoken,(req,res)=>{
    dataservice.transaction(req.body.acc).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// delete
app.delete('/delete/:accno',jsonwebtoken,(req,res)=>{
    dataservice.deleteAccount(req.params.accno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
    
    // create port
    app.listen(3000,()=>{console.log("server started at port number 3000");})
















    




    // argument order is 
    // app.get('/' ,(req,res)=>{
    //     res.send('get method ........ sucess')
    // })
    // app.post('/' ,(req,res)=>{
    //     res.send('post method ........ sucess')
    // })
    // app.patch('/' ,(req,res)=>{
    //     res.send('patch method ........ sucess')
    // }) 
    // app.put('/' ,(req,res)=>{
    //     res.send('put method ........ sucess')
    // })
    // app.delete('/' ,(req,res)=>{
    //     res.send('delete method ........ sucess')
    // })