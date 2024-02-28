import { createHash } from "crypto";
import { getServerSession } from "next-auth";
import { options } from "./auth-api";

export const userSession = async (): Promise<UserModel | null> => {
  const session = await getServerSession(options);
  if (session && session.user) {
    return session.user as UserModel;
  }

  return null;
};

export const userHashedId = async (): Promise<string> => {
  const user = await userSession();
  if (user) {
    return hashValue(user.email);
  }

  throw new Error("User not found");
};

export type UserModel = {
  name: string;
  image: string;
  email: string;
};

export const hashValue = (value: string): string => {
  const hash = createHash("sha256");
  hash.update(value);
  return hash.digest("hex");
};


// import { createHash } from "crypto";
// import { getServerSession } from "next-auth";
// import { options } from "./auth-api";

// export const userSession = async (): Promise<UserModel | null> => {
//   if (process.env.NODE_ENV === 'development') {
//     // During development, return a mock user
//     return {
//         name: 'mock-user',
//         image: 'mock-image',
//         email: 'mock-email'
//     };
//   }

//   const session = await getServerSession(options);
//   if (session && session.user) {
//     return session.user as UserModel;
//   }

//   return null;
// };

// export const userHashedId = async (): Promise<string> => {
//   if (process.env.NODE_ENV === 'development') {
//     // During development, return a mock hashed id/user id
//     return 'mock-hashed-id';
//   }
  
//   const user = await userSession();
//   if (user) {
//     return hashValue(user.email);
//   }

//   throw new Error("User not found");
// };

// export type UserModel = {
//   name: string;
//   image: string;
//   email: string;
// };

// export const hashValue = (value: string): string => {
//   const hash = createHash("sha256");
//   hash.update(value);
//   return hash.digest("hex");
// };