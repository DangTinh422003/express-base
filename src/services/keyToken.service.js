import { keyTokenModel } from "../models/keytoken.model.js";

class KeyTokenService {
  async createKeyToken({ userId, publicKey }) {
    try {
      const publicKeyString = publicKey.toString();
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });

      return tokens ? publicKeyString : null;
    } catch (error) {
      return error;
    }
  }
}

export const keyTokenService = new KeyTokenService();
