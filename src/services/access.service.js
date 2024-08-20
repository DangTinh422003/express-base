import bcrypt from "bcrypt";
import crypto from "crypto";
import { shopModel } from "../models/shop.model.js";
import { keyTokenService } from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";

const RoleShop = {
  SHOP: "shop",
  WRITER: true,
  EDITOR: true,
  ADMIN: true,
};

class AccessService {
  async signUp({ name, email, password }) {
    try {
      const shopHolder = await shopModel.findOne({ email }).lean();
      if (shopHolder) {
        return {
          code: "xxx",
          message: "Shop already exists",
          status: "error",
        };
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
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

        const publicKeyString = await keyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
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
          publicKeyString,
          privateKey
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
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  }
}

export const accessService = new AccessService();
