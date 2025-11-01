import { Request } from "express";
import { fileUploader } from "../../helper/imageUpload";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";

const getAllPatient = async ({limit1, page1}:{limit1:number, page1:number}) => {
  const skip = (page1 -1)* limit1;
  const patients = await prisma.user.findMany({
    skip,
    take:limit1
  });
  return patients
};

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadCloudinary(req.file);
    req.body.patient.profilePhoto = uploadResult?.secure_url
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashPassword
      },
    });
    return await tnx.patient.create({
      data: req.body.patient
    });
  });
  return result;
};

export const userService = {
  createPatient,
  getAllPatient
};
