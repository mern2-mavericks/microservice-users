import { model, Schema } from "mongoose";

const userSchema = new Schema({
	username: { type: String, require: true },
	email: { type: String, require: true },
	password: { type: String, require: true },
})

export const User = model("User", userSchema);

