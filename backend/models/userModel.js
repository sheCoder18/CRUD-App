import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    age: {
      type: Number,
      required: true,
    },

    dob: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(v);
        },
        message: "Date of birth should be in YYYY-MM-DD format",
      },
    },
    phone: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "Phone number must be 10 digits",
      },
    },
    profession: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    full_address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("crud-mern", userSchema);
