const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address:{type:String,required:true},
    image:{type:String,required:true},
    tokens: { type: String, default: '' },
  });

  adminSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      if (!this.password.startsWith('$2b$')) {
        try {
          const hashedPassword = await bcrypt.hash(this.password, 10);
          this.password = hashedPassword;
          next();
        } catch (error) {
          return next(error);
        }
      } else {
        return next();
      }
    } else {
      return next();
    }
  });
  
  const AdminLog = mongoose.model('AdminLog', adminSchema);
  module.exports = AdminLog;
  