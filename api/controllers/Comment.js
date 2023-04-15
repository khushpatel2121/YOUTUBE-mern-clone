import Users from "../models/users.js";
import Video from "../models/video.js";
import Comment from "../models/Comment.js"
import { createError } from "../error.js";

export const addcomment = async(req,res,next) => {
const comment = new Comment({...req.body, userId:req.user.id })
    try {
    const savedComment = await comment.save();
    res.status(200).send(savedComment);
} catch (err) {
    next(err);
}
};

export const deletecomment = async (req,res,next) =>{
    try{
      const comment = await Comment.findById(req.params.id);
      const video = await Video.findById(req.params.id);
      if(req.user.id === comment.userId || req.user.id === video.userId){
       const deletedCommet = await Comment.findByIdAndDelete(req.params.id);
       res.status(200).json("comment is deleted");
      }else{
        next(createError(403,"you can only delete your commments"))
      }
    }catch(err){
       next(err);
    }
}

export const getcomments = async (req,res,next) => {
    try {
        const comment = await Comment.find({videoId:req.params.videoId});
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
}