import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";
import { userFilterableFields } from "./user.constant";
import pick from "../../helper/pick";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields) 
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]) 

    const result = await userService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrive successfully!",
        meta: result.meta,
        data: result.data
    })
})
  
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
  getAllFromDB,
  createAdmin,
  createDoctor
};
