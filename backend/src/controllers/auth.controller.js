const logger = require("../utils/logger");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(`Validation failed during registration: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.error(`Registration attempt with existing email: ${email}`);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    logger.info(`New user registered: ${email}`);

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(`Validation failed during login: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.error(`Login failed - user not found: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.error(`Login failed - wrong password: ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    logger.info(`User logged in successfully: ${email}`);

    res.json({ token });

  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    next(error);
  }
};
