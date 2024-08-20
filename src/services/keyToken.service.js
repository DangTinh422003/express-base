import { keyTokenModel } from "../models/keytoken.model.js";

class KeyTokenService {
  async createKeyToken({ userId, publicKey, privateKey }) {
    try {
      // const publicKeyString = publicKey.toString();
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey: publicKeyString,
      // });

      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  }
}

export const keyTokenService = new KeyTokenService();
