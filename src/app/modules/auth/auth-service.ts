
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
const loginUser = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!password || !isUserExist.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }

  const isPasswordCorrect = await bcryptjs.compare(
    password as string,
    isUserExist.password
  );

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and Password is required"
    );
  }

  const userTokens = createUserTokens(isUserExist);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}

export const AuthServices = {
  loginUser,
  getNewAccessToken
};
