import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = { apiKey: process.env.OPENAI_API_KEY };

const openAI = new OpenAI(configuration);

export default openAI;
