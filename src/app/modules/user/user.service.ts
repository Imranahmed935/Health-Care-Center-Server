import { Request } from "express";

import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { Admin, Doctor, UserRole } from "@prisma/client";
import { fileUploader } from "../../helper/imageUpload";

const getAllPatient = async ({limit1, page1, searchTerm, sortby, sortOrder, role, status}:{limit1:number, page1:number,searchTerm:any, sortby:any, sortOrder:any, role:any, status:any}) => {
  const skip = (page1 -1)* limit1;
  const patients = await prisma.user.findMany({
    skip,
    take:limit1,
    where:{
      email:{
        contains:searchTerm,
        mode:"insensitive"
      },
      status:status,
      role:role
    },
    orderBy:sortby && sortOrder?{
      [sortby]:sortOrder
    }:{
      createdAt:"asc"
    }
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

const createAdmin = async (req: Request): Promise<Admin> => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadCloudinary(file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: req.body.admin
        });

        return createdAdminData;
    });

    return result;
};


const createDoctor = async (req: Request): Promise<Doctor> => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadCloudinary(file);
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
    }
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdDoctorData = await transactionClient.doctor.create({
            data: req.body.doctor
        });

        return createdDoctorData;
    });

    return result;
};



export const userService = {
  createPatient,
  getAllPatient,
  createAdmin,
  createDoctor
};
