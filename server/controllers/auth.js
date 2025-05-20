import passport from "passport";
import { validationResult } from "express-validator";
import { hashPassword } from "../utils/hash.js";
import { findUserByEmail, insertUser } from "./user.js";

// Registration Middleware
const registerUser = async (req, res, next) => {
  const { full_name, email, password } = req.body;

  // Validate user input
  const errors = validationResult(req);

  // Return errors if exists
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({ error: errorMessages });
  }

  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists! Try another email." });
    }

    // Hash password
    const { salt, hash } = await hashPassword(password);

    // Insert user
    await insertUser(full_name, email, hash, salt);

    // Return success message
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

// Login Middleware
const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res
        .status(500)
        .json({ message: "An error occurred during login." });
    }
    if (!user) {
      // Send the failure message when authentication fails
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Login failed." });
      }

      // For debugging cookie issues in production
      console.log("Session ID at login:", req.sessionID);
      console.log("Is authenticated:", req.isAuthenticated());

      // Send a successful response with the user object
      return res
        .status(200)
        .json({ message: "You logged in successfully", user }); // Send the user object on success
    });
  })(req, res, next);
};

// Check Authentication Middelware
const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You need to be authenticated" });
  }
  next();
};

// Logout Middelware
const logoutUser = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "You logged out successfully" });
  });
};

// Get Authentication Status
const getAuthStatus = (req, res) => {
  // Log debugging information
  console.log("Session ID at status check:", req.sessionID);
  console.log("Session:", req.session);
  console.log("Is authenticated:", req.isAuthenticated());

  if (req.isAuthenticated()) {
    res.status(200).json({
      isAuthenticated: true,
      user: {
        id: req.user.id,
        full_name: req.user.full_name,
        email: req.user.email,
      },
    });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
};

export { registerUser, loginUser, isAuthenticated, logoutUser, getAuthStatus };
