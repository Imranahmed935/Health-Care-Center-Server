import z, { string } from "zod";

const patientValidation = z.object({
  password: string(),
  patient: z.object({
    name: z.string().nonempty("Name is required!"),
    email: z.string().nonempty("Email is required!!"),
    address: z.string().optional(),
  },)
});

export const userValidation = {
  patientValidation,
};
