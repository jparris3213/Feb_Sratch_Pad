const { Schema, model } = required("mongoose");
const bcrypt = require( "bcrypt" );

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must be an email address!"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    user_galleries: [{
        type: String,
        required: false,
    }],

});

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model("User", userSchema);

module.exports = User