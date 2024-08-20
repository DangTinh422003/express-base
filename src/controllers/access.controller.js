import { accessService } from "../services/access.service.js";

class AccessController {
  async signUp(req, res, next) {
    try {
      res.status(201).json(await accessService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  }
}

export const accessController = new AccessController();
