import { MiddlewareFn } from "type-graphql";

export const logger: MiddlewareFn = async (
  { root, args, context, info },
  next
) => {
  console.log("logger ", root, args, context, info);

  return next();
};
