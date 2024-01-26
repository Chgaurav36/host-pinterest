const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const dotenv = require("dotenv");
dotenv.config();

const connectdb = async()=> {
  try {
  //  await mongoose.connect('mongodb+srv://pin:pin1234@cluster0.mfrlru7.mongodb.net/?retryWrites=true&w=majority');
   await mongoose.connect(process.env.MONGO_CPNNECT_URI);
   
  } catch (error) {
   console.log(error);
   }
}
connectdb().then(()=>{
  console.log("Successfull");
}).catch((e)=>{
  console.log(e);
})


const userSchema = mongoose.Schema ({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  contact: Number,
  boards: {
    type: Array,
    default: []
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post"
    }
  ]
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);
