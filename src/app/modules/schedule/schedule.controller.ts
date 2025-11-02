import { NextFunction, Request, Response } from "express";
import { scheduleService } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { IJWTPayload } from "../../types/common";


const createSchedule = async (req:Request, res:Response, next:NextFunction)=>{
  const result = await scheduleService.createSchedule(req.body)
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:"Schedule Book successfully!",
    data:result
  })
}

const scheduleForDoctor = async (req: Request & { user?: IJWTPayload }, res: Response)=>{
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const filters = pick(req.query, ["startDateTime", "endDateTime"])
  const user = req.user;
  const result = await scheduleService.scheduleForDoctor( user as IJWTPayload,filters, options)
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:"Schedule get successfully!",
    data:result
  })

}
const scheduleDelete = async (req:Request, res:Response, next:NextFunction)=>{
  const result = await scheduleService.scheduleDelete(req.params.id)
  sendResponse(res,{
    statusCode:200,
    success:true,
    message:"Schedule deleted successfully!",
    data:result
  })

}

export const scheduleController = {
createSchedule,
scheduleForDoctor,
scheduleDelete
}