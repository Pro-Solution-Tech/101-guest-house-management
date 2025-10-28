import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://imgs.search.brave.com/3WZ_P1qGgTWlS-JwL-jDRzhAl5QBOFF0h0q8T2gnuA8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXByY2VudGVyLmdv/di9pbWFnZS1yZXBv/c2l0b3J5L2JsYW5r/LXByb2ZpbGUtcGlj/dHVyZS5wbmcvQEBp/bWFnZXMvaW1hZ2Uu/cG5n",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
