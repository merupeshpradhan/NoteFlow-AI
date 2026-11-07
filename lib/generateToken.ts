import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string | number) => {
  return jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET as string, // Type assertion ensures it's treated as a string
    {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "15m") as any,
    },
  );
};

export const generateRefreshToken = (userId: string | number) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "7d") as any,
  });
};
