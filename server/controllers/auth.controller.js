import Ngo from "../models/ngo.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const signup = async (req, res, next) => {
  const { fullname, email, password, phone, address, skills, organizationName, organizationNumber, mission, role  } = req.body;

  let emailExistingUser = await User.findOne({ email });
  // Check if email exists in Ngo collection
  let emailExistingNgo = await Ngo.findOne({ email });

  let phoneExistingUser = await User.findOne({phone})
  let phoneExistingNgo = await Ngo.findOne({phone})

  // If email exists in either collection, send a 400 Bad Request response
  

  const hashedPassword = bcryptjs.hashSync(password, 10);
  if (role === "user") {
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      phone,
      address,
      skills,
      role,
    });
    try {
      if (emailExistingUser || emailExistingNgo) {
        // return res.status(400).json("Email Already Exists");
        next(errorHandler(404, "Email Already Exists"))
        return;

      }
      if (phoneExistingUser || phoneExistingNgo) {
        // return res.status(400).json("Email Already Exists");
        next(errorHandler(404, "Phone Number Already Registered"))
        return;

      }
      await newUser.save();

      res.status(201).json("User created successfully!");
    } catch (error) {
      next(error);
    }
  } else {
    const newNgo = new Ngo({ organizationName, organizationNumber, email, password: hashedPassword, phone, address, mission, role });
    try {
      if (emailExistingUser || emailExistingNgo) {
        next(errorHandler(404, "Email Already Exists"))
        return;

      }
      if (phoneExistingUser || phoneExistingNgo) {
        // return res.status(400).json("Email Already Exists");
        next(errorHandler(404, "Phone Number Already Registered"))
        return;

      }
      await newNgo.save();
      res.status(201).json("Ngo created successfully!");
    } catch (error) {
      next(error);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let validUser = await User.findOne({ email });
    if (!validUser) {
      validUser = await Ngo.findOne({ email });
    }
    if (!validUser) {
        validUser = await Admin.findOne({ email });
      }

    if (!validUser) {
      return next(errorHandler(404, "Email not registered!"));
    }
    let validPassword;
    if(validUser.role==="admin"){
        validPassword = await Admin.findOne({password})
    }else{
        validPassword = bcryptjs.compareSync(password, validUser.password);

    }
    if (!validPassword) return next(errorHandler(401, "Invalid password!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({rest});
    console.log(validUser);
  } catch (error) {
    next(error);
  }
};
