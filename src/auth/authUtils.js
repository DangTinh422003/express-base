import jwt from "jsonwebtoken";

export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: "30 days",
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log("🚀 ~ createTokenPair ~ error:", error);
  }
};
