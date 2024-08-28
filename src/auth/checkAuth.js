import { findById } from "../services/apiKey.service.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

export const apiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers[HEADER.API_KEY];
    if (!apiKey) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const objKey = await findById(apiKey);
    if (!objKey) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.objKey = objKey;
    return next();
  } catch (error) {}
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions.includes(permission)) {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};
