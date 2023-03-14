const jwt =require('jsonwebtoken')
const db = require('./db.js')

// userDetails={
//     1000:{accno:1000,username:"akku",password:"akku1",balance:0,transaction:[]},
//     1001:{accno:1001,username:"ammu",password:"ammu1",balance:1000,transaction:[]},
//     1002:{accno:1002,username:"sree",password:"sree1",balance:1000,transaction:[]},
//     1003:{accno:1003,username:"kavi",password:"kavi1",balance:1000,transaction:[]},
//     1004:{accno:1004,username:"panju",password:"panju1",balance:1000,transaction:[]}
//   }

register=(uname,Accno,pass)=>{
    // var userData=this.userDetails
    // if(Accno in userDetails){
      // findOne is asynchronous method...........because different port can be used in server(3000) and database(27017)
      return db.User.findOne({accno:Accno}).then(user=>{
        if (user) {
          return{
            status:false,
            message:"User already exist",
            statusCode:401
    
          }
        }
        else{
          const newuser = new db.User({
            accno:Accno,username:uname,password:pass,balance:0,transaction:[]
          })
          // save in db
          newuser.save()
              return{
        status:true,
        message:"User sucessfully registered",
        statusCode:200
      }
        }
      })
    
    }
    // before mongodb use this............
  //   else{
  //     userDetails[Accno]={accno:Accno,username:uname,password:pass,balance:0,transaction:[]}
  //     return{
  //       status:true,
  //       message:"User sucessfully registered",
  //       statusCode:200
  //     }
  //   }
  // }
  login=(acno,pass)=>{

    // var userData=this.userDetails
    // if(acno in userDetails)
    return db.User.findOne({accno:acno,password:pass}).then(user=>{
      if(user){
          currentUser=user.username;
          currentAcno=acno
          // tocken generation.
          const tocken=jwt.sign({currentAcno},"sceretKey")  // 
            return{
              status:true,
              message:"Login successfully",
              statusCode:200,
              currentUser,
              currentAcno,
              tocken    
        }
      }else{
        return{
          status:false,
          message:"Password or account incorrect",
          statusCode:401
  
        }
      }
    })
  }
  // deposit
  deposit=(acno,pass,amnt)=>
  {
    // let userData=this.userDetails
    var amt=parseInt(amnt)
    // if(acno in userDetails)
    return db.User.findOne({accno:acno,password:pass}).then(user=>{
      if(user){
        user.balance+=amt;
        user.transaction.push({Type:"credit",Amount:amnt})
        currentBalance = user.balance;
        user.save()
        return {
          status:true,
            message:`desposit${amnt} balance is ${currentBalance}`,
            statusCode:200,
            
        }
      }
      else{
        return{
          status:false,
          message:"account number or password incorrect",
          statusCode:401
        }
      }
    })
  
   
  }

// withdraw
  withdraw=(acno,pass,amount)=>
  {
    var amt = parseInt(amount)
    // var userData= this.userDetails
    return db.User.findOne({accno:acno,password:pass}).then(user=>{
      if (user) {
        if(amt<=user.balance){

        user.balance-=amt
        user.transaction.push({Type:"Debit",Amount:amount})
        // console.log(userData);
        // currentBalance=user.balance
        user.save();
        return {
          status:true,
          message:`withdraw${amt} balance is ${user.balance}`,
          statusCode:200,
        }
      }
      else{
        return{
          status:false,
          message:"Insufficient amount",
          statusCode:401
        }
      }
    }
    else{
      return{
        status:false,
        message:"password or account number incorrect",
        statusCode:401
      }
    }
    })
 
  }
  transaction=(accno)=>{
    return db.User.findOne({accno}).then(user=>{
      if(user){
        return {
          status:true,
          statusCode:200,
          transaction:user.transaction,
    
        }
      }
      // else{
      //   return{
      //     status:false,
      //     message:"please register",
      //     statusCode:401
      //   }
      // }
    })    
  }

  deleteAccount=(accountNumber)=>{
    return db.User.deleteOne({accno:accountNumber}).then(user=>{
      if(user){
        return{
          status : true,
          statusCode:200,
          message:'account deleted'
        }
      }
      else{
        return{
          status:false,
          message:"user not exist",
          statusCode:401
        }
      }
    })
  }

//   export functions
module.exports={
    register,
    login,
    deposit,
    withdraw,
    transaction,
    deleteAccount
    
}