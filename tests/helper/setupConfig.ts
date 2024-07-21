import dotenv from "dotenv";

dotenv.config({ path: ".env.staging" });

const { ALAMAT_URL: URL, FTK_ID: ID } = process.env as {
  ALAMAT_URL: string;
  FTK_ID: string;
};

export { URL, ID };
