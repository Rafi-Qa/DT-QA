import dotenv from "dotenv";

dotenv.config({ path: ".env.staging" });

const {
  ADMIN: adminEmail,
  NURSE: nurseEmail,
  DOCTOR: doctorEmail,
  LAB: labEmail,
  APOTEKER: apotekerEmail,
  KASIR: kasirEmail,
  PASSWORD: password,
} = process.env as {
  ADMIN: string;
  NURSE: string;
  DOCTOR: string;
  LAB: string;
  APOTEKER: string;
  KASIR: string;
  PASSWORD: string;
};

export {
  adminEmail,
  nurseEmail,
  doctorEmail,
  labEmail,
  apotekerEmail,
  kasirEmail,
  password,
};
