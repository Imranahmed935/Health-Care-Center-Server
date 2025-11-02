import express from "express";
import { scheduleController } from "./schedule.controller";

const router =  express.Router();

router.get("/", scheduleController.scheduleForDoctor)
router.post("/create-schedule", scheduleController.createSchedule)
router.delete("/:id", scheduleController.scheduleDelete)

export const scheduleRoutes = router