const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
    return;
  }

  res.status(403).send({
    message: "Require Admin Role!",
  });
};

const isRecruiter = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "recruiter" || req.user.role === "admin")
  ) {
    next();
    return;
  }

  res.status(403).send({
    message: "Require Recruiter Role!",
  });
};

const isHiringManager = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "hiring_manager" || req.user.role === "admin")
  ) {
    next();
    return;
  }

  res.status(403).send({
    message: "Require Hiring Manager Role!",
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isRecruiter,
  isHiringManager,
};
