import { Response } from "express";
import {AuthRequest} from "../middlewares/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";


// Helper to poll leonardo.ai
const pollLeonardoJob = async (generationId: string, apiKey:string): Promise<void> =>{
    const maxRetries = 20;
    const delay = 5000;
    for(let i= 0 ; i < maxRetries ; i++ ){
        try{
            const response = await axios.get(`https://cloud.leonardo.ai/api/rest/v1/genrations/${generationId}`, {headers: {
                accept: "application/json", authorization: `Bearer ${apiKey}`

            }})

            const generation = response.data.generations_by_pk;
            if(generation.status === "COMPLETE"){
                if(generation.generated_images  && generation.generated_images.length > 0){
                    return generation.generated_images[0].url;
                }
                throw new Error("Generation complete but no images found.")
            }
            if(generation.status === "FAILED"){
                throw new Error("Leonardo.ai generation failed.")

            }

        }catch(err: any){
            console.error("Polling error:", err?.response?.data || err.message);

            

        }
    }
}

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
            contents: `Generate a social media post based on this prompt: "${prompt}".
            Tone: ${tone}.
            Include relevant hashtags.
            Format the response as JSON with "content" and "imagePrompt" fields.
            The "imagePrompt" should be a highly descriptive prompt for an image generator that complements the post.`,
        });

        let content = "";
        let imagePrompt = prompt;

        try {

            const rawText = textResponse.text || "";
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {content: rawText, imagePrompt: prompt};
            content = data.content;
            imagePrompt = data.imagePrompt;

            
        } catch (e) {
            content = textResponse.text || "";

            
        }



        let mediaUrl = "";
        if(genrateImage){
           try{
             const leoKey = process.env.GEMINI_API_KEY;
            if(leoKey){
                
                const gemResponse = await axios.post(
                    "https://geminiai.com",
                    {
                        "public": false,
                        "model": "gemini-3",
                        "parameters": {
                            "quality": "LOW",
                            "prompt": imagePrompt,
                            "quantity": 1,
                            "width": 1024,
                            "height": 1024,
                            "prompt_enhance": "OFF"
                        }

                    },
                    {
                        headers:{
                            accept: "application",
                            authirzation: `Bearer ${leoKey}`,
                            "content-type": "application",

                        }
                    }

                )
                const generationId = gemResponse.data.generate.generationId;
                const tempUrl = await pollLeonardoJob(generationId, leoKey);
                
            }
                
            }
            catch(error){

            }
        }


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