/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();
export default {
  cmcApiKey: process.env.CMC_API_KEY,
  baseUrl: process.env.BASE_URL,
};
