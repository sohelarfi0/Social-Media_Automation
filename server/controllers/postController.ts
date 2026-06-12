import { Response } from "express";
import {AuthRequest} from "../middlewares/authMiddleware.js";



// Generate post
// POST /api/posts/genrate
export const genratePost = async (req: AuthRequest, res: Response): Promise<void> =>{
    

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