import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const {limit, page} =req.query;
  const limit1 = Number(limit);
  const page1 = Number(page)
  const result = await userService.getAllPatient({limit1, page1});
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"Patient Retrived Successfully!!",
    data:result
  })
});  


const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"Patient Created Successfully!!",
    data:result
  })
});

export const userController = {
  createPatient,
  getAllPatient
};
