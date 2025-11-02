import express from "express";
import { scheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router =  express.Router();

router.get("/",auth(UserRole.DOCTOR, UserRole.ADMIN), scheduleController.scheduleForDoctor)
router.post("/create-schedule", scheduleController.createSchedule)
router.delete("/:id", scheduleController.scheduleDelete)

export const scheduleRoutes = router