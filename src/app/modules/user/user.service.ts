import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import { userSearchableFields } from "./user.constant";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and Password is required"
    );
  }
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password,
    envVars.BCRYPT_SALT_ROUND
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const getAllUsers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);
  const usersData = queryBuilder
    .filter()
    .search(userSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};
const getSingleUser = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return {
    data: user,
  };
};
export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
};
