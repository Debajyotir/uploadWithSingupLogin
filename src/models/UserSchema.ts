import mongoose from 'mongoose';



const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 8 },
});


const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
