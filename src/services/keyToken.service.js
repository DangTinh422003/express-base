import { keyTokenModel } from "../models/keytoken.model.js";

class KeyTokenService {
  async createKeyToken({ userId, publicKey, privateKey }) {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return tokens || null;
    } catch (error) {
      return error;
    }
  }
}

export const keyTokenService = new KeyTokenService();
