import { Response } from "express";
import {AuthRequest} from "../middlewares/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";


// Generate post
// POST /api/posts/genrate
export const genratePost = async (req: AuthRequest, res: Response): Promise<void> =>{
    try{
        const {prompt, tone, genrateImage} = req.body;

        const apiKey = process.env.GEMINI_API_KEY;
        if(!apiKey){
            res.status(400).json({message: "Gemini API is missing. Please add it to your server/.env file."})
            return;
        }
        const ai = new GoogleGenAI({apiKey});

        // Generate Text 
        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a social `,
        });
    }catch(error){


    }

}

// Get generations 
// GET /api/posts/generation
export const getGenrations = async (req: AuthRequest, res: Response): Promise<void> => {
    
} 


// Get posts 
// GET /api/posts
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {

} 

// Scheduled posts 
// POST /api/posts
export const scheduledPost = async (req: AuthRequest, res: Response): Promise<void> => {

} 