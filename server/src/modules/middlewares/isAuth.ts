import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";

import { ContextType } from "../../types/ContextType";

export const isAuth: MiddlewareFn<ContextType> = async ({ context }, next) => {
  if (!context.req.session!.uid) {
    throw new AuthenticationError("User not Authenticated");
  }

  return next();
};
