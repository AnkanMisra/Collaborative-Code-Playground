import mongoose  from "mongoose"; 
import bcrypt from "bcryptjs" //for encrypting the password
import validator from 'validator' // for Email validation
import {phone} from 'phone' //for contact No validation

//UserSchema contains the field name ,email,contactNumber,password and confirmPassword
const userSchema=mongoose.Schema({

    name:{
        type:String,
        recquired:[true,'A name is required']
    },
    email:{
        type:String,
        recquired:[true,'A email is required'],
        validate:[validator.isEmail,'Please provide a valid email']
    },
    contactNumber:{
        type:String,
        recquired:[true,'A email is required'],
        validate:function(el){
           
            const result = phone(el, { country: 'IND' });
                return result.isValid;
          },
          message:'Password and confirm password are not the same'
    },
    password:{
        type:String,
        recquired:[true,'password is recquired']
    },
    confirmPassword:{
        type:String,
        recquired:[true,'confirm password is recquired'],
        validate:function(el){
            return el===this.password
          },
          message:'Password and confirm password are not the same'
    }
})

//Encrypting the password for security and setting confirmPassword to undefined for more security
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
      }
    
      this.password=await bcrypt.hash(this.password,4)
    
      this.confirmPassword=undefined
      next()
})

//Exporting the user model
const user=mongoose.model('user',userSchema)

export default user