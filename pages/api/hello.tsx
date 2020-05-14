import { Request, Response } from "express";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (_req: Request, res: Response) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
