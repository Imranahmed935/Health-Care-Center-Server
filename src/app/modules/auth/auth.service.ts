import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { UserStatus } from "@prisma/client";
import { jwtHelper } from "../../helper/jwtHelper";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const checkPass = await bcrypt.compare(payload.password, user.password);
  if (!checkPass) {
    throw new Error("Password is incorrect!");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    "abcd",
    "1h"
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    "abcdefgh",
    "90d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const authService = {
  login,
};
