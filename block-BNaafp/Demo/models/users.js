var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt');
var userSchema=new Schema({
    email:{type:String,require:true},
    password:{type:String,require:true,unique:true},
},{timestamps:true})



//pre(save)hook
userSchema.pre('save',async function(next){
    
    if(this.password && this.isModified('password')){
      this.password=await bcrypt.hash(this.password,10);
        
    }else{
        next();
    }

})

//method
userSchema.methods.verifyPassword= async function(password){
  try{
    var result=await bcrypt.compare(password,this.password);
       return result; 
  }catch(error){
      return error;
  }
  bcrypt.compare();
}

module.exports=mongoose.model('User',userSchema);