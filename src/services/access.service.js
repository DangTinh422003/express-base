import bcrypt from "bcrypt";
import crypto from "crypto";
import { shopModel } from "../models/shop.model.js";
import { keyTokenService } from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import { BadRequestError } from "../core/error.response.js";

const RoleShop = {
  SHOP: "shop",
  WRITER: true,
  EDITOR: true,
  ADMIN: true,
};

class AccessService {
  async signUp({ name, email, password }) {
    const shopHolder = await shopModel.findOne({ email }).lean();
    if (shopHolder) {
      throw new BadRequestError("Error: Shop already exists");
    }

    const SALT = 10;
    const hashPassword = await bcrypt.hash(password, SALT);

    const newShop = await shopModel.create({
      name,
      email,
      password: hashPassword,
      roles: [RoleShop.SHOP],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await keyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        return {
          code: "xxx",
          message: "Error when create publicKey",
          status: "error",
        };
      }

      const { accessToken, refreshToken } = await createTokenPair(
        {
          id: newShop._id,
          email: newShop.email,
          roles: newShop.roles,
        },
        keyStore.publicKey,
        keyStore.privateKey
      );

      console.log({ accessToken, refreshToken });

      return {
        code: 201,
        message: "Shop created successfully",
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email", "roles"],
            object: newShop,
          }),
          tokens: {
            accessToken,
            refreshToken,
          },
        },
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  }
}

export const accessService = new AccessService();
