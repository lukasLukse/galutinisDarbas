import { v4 as uuidv4 } from "uuid";
import UserModel from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const REGISTER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    const response = await new UserModel(user);

    await response.save();

    return res
      .status(201)
      .json({ message: "Your register is succsesfull.", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
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
      { expiresIn: "15m" }
    );

    return res.status(200).json({ token: token, userId: user.id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

export { REGISTER, LOGIN };
