import mongoose, { Schema, model, models ,Document} from "mongoose";


export interface IUser extends Document {
  name:string
  email: string;
  password: string;
  role: "user" | "admin";
  image?: string
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: { 
      type: String, 
      required: true, 
      unique: true
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },
    image: { 
      type: String, 
      default: "/" 
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const User = models?.User || model<IUser>("User", userSchema);

export default User;