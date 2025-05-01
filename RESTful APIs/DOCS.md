# Pillars of building REST APIs

## ✅ What is a REST API?

REST (Representational State Transfer) is an architectural style for building APIs using HTTP methods like GET, POST, PUT, DELETE.

Key Concepts:

- Based on resources (e.g., /users, /posts)
- Communicates via HTTP
- Returns data in JSON (usually)
- Follows statelessness

📌 Example:

```
GET /users → get list of users
POST /users → create a user
GET /users/5 → get user with id 5
PUT /users/5 → update user 5
DELETE /users/5 → delete user 5
```

## ✅ Designing RESTful APIs

Principles:

- Use nouns not verbs in URLs → /posts, not /getPosts

- Use HTTP methods to indicate action

- Use status codes (200, 201, 404, 500, etc.)

- Structure URLs hierarchically → /users/:id/posts

Example Structure:

```
GET /api/v1/users → all users
GET /api/v1/users/:id → one user
POST /api/v1/posts → create a post
```

## ✅ Understanding Stateless Communication

Stateless means:

- Server does not store session data

- Each request must contain all required information

🧠 This is why we use JWTs or tokens in headers:

```
Authorization: Bearer <your-token>
```

## ✅ Versioning in RESTful APIs

API changes over time, so versioning helps:

- Keep old apps working

- Allow upgrades safely

📌 Use /v1/, /v2/ in the URL:

```
GET /api/v1/users
GET /api/v2/users  ← maybe with extra fields or better performance
```

## ✅ Validating API Inputs

Never trust client input!

Use libraries like:

- express-validator

- joi (often paired with celebrate)

- validator.js

📌 Example using express-validator:

```
const { body, validationResult } = require("express-validator");

app.post("/signup", [
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  // continue to save user
});
```

📌 Example using joi:

```
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const validate = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

app.post("/signup", validate, signupHandler);
```

📌 Example using joi with celebrate:

```
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const app = express();
app.use(express.json());

// Define a Joi schema for validation
const userSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
});

// Route with Celebrate and Joi validation
app.post('/signup', celebrate({ body: userSchema }), (req, res) => {
  // If validation passed, continue with the request handling
  res.status(200).json({ message: 'User successfully signed up!' });
});

// Celebrate's error handling middleware (catches Joi validation errors)
app.use(errors());

// Your Custom Error handler comes after celebrate's error handler

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## ✅ Security Handling

🛡️ You MUST protect your API from common attacks:

(1) Rate Limiting
Use express-rate-limit to prevent spam or brute force:

```
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // limit each IP to 100 requests per 15 min
});
app.use(limiter);
```

(2) Helmet.js

Adds security headers like:

- Content-Security-Policy

- XSS-Protection

- Strict-Transport-Security

📌 Use helmet with rate-limit together.

```
const helmet = require('helmet');
app.use(helmet());
```

(3) XSS (Cross Site Scripting)
Attackers inject malicious JS → sanitize inputs:

- Use xss-clean or express-validator with proper sanitization.

(4) CSRF (Cross Site Request Forgery)
Attacker tricks user to perform actions on your app.

- Not needed for REST APIs if you use JWTs.

- But if you’re using sessions/cookies → use csurf middleware.

(5) DOS (Denial of Service)
Flooding server with requests → use:

- rate-limit

- compression for fast responses

- helmet for headers

## 🆚 Should I Use helmet or Individual Middleware?

Use both:

- helmet for secure headers

- express-rate-limit for DoS

- xss-clean, mongo-sanitize, and express-validator for input protection

Each serves a different layer of defense (defense-in-depth).
