import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ username, password }) {
  const prisma = new PrismaClient();
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  //
  const password_salt = crypto.randomBytes(16).toString("hex");
  const password_hash = crypto
    .pbkdf2Sync(password, password_salt, 1000, 64, "sha512")
    .toString("hex");
  const user = await prisma.customer.create({
    data: { email: username, password: password_hash, salt: password_salt },
  });

  return user;
}

export async function findUser({ username, password }) {
  // Here you should lookup for the user in your DB and compare the password:
  //
  const prisma = new PrismaClient();
  const user = await prisma.customer.findOne({
    where: { email: username },
  });
  if (user) {
    const password_hash = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
      .toString("hex");
    const passwordsMatch = user.password === password_hash;
    if (passwordsMatch) {
      return user;
    }
  }
  return null;
}

export async function findUserByUsername(username) {
  const prisma = new PrismaClient();
  const user = await prisma.customer.findOne({
    where: { email: username },
  });
  if (!user) {
    throw new Error("Can not found user");
  }

  return user;
}

export async function resetPassword({ username, password }) {
  console.log(username)
  const prisma = new PrismaClient();
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  //
  const password_salt = crypto.randomBytes(16).toString("hex");
  const password_hash = crypto
    .pbkdf2Sync(password, password_salt, 1000, 64, "sha512")
    .toString("hex");
  const user = await prisma.customer.update({
    where: { email: username },
    data: { password: password_hash, salt: password_salt },
  });

  return user;
}
