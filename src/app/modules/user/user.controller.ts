import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const {limit, page, searchTerm, sortby, sortOrder, role, status} =req.query;
  const limit1 = Number(limit) || 10;
  const page1 = Number(page) || 1
  const result = await userService.getAllPatient({limit1, page1, searchTerm, sortby, sortOrder, role, status});
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
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"Patient Created Successfully!!",
    data:result
  })
});
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"Patient Created Successfully!!",
    data:result
  })
});

export const userController = {
  createPatient,
  getAllPatient,
  createAdmin,
  createDoctor
};
