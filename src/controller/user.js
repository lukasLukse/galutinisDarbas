import { v4 as uuidv4 } from "uuid";
import UserModel from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REGISTER = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = {
      id: uuidv4(),
      name: name,
      email: email,
      password: hash,
    };

    const response = await new UserModel(user);

    await response.save();

    return res
      .status(201)
      .json({ message: "Registration successful.", response });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Your email or password is bad." });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Your email or password is bad." });
    }

    const token = jwt.sign(
      { email: user.email, userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "45m" }
    );

    return res.status(200).json({ token: token, userId: user.id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const VALIDATE_LOGIN = async (req, res) => {
  try {
    res.status(200).json({ message: "user ok" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

export { REGISTER, LOGIN, VALIDATE_LOGIN };
