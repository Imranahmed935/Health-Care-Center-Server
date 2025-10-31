import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../helper/imageUpload";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.patientValidation.parse(
      JSON.parse(req.body.data)
    );
    return userController.createPatient(req, res, next);
  }
);

export const userRoutes = router;
