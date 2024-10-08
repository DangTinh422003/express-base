import { accessService } from "../services/access.service.js";

class AccessController {
  async signUp(req, res, next) {
    res.status(201).json(await accessService.signUp(req.body));
  }
}

export const accessController = new AccessController();
