import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { createError } from "../error.js";
import Video from "../models/video.js";

import User from "../models/users.js"

//update
export const update = async (req,res,next)=>{
    if(req.user.id === req.params.id){
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,
                {
                $set:req.body
            },
            {new:true}
            );
            res.status(200).json(updateUser);
        }catch(err){
            next(err);
        }
       
    }
    else{
        return next(createError(403,"You can update only your account"));
    }
}

//delete
export const deleteUser = async (req,res,next)=>{
    if(req.user.id === req.params.id){
        try{
            const deleteUser = await User.findByIdAndDelete(req.params.id
            
            );
            res.status(200).json("user has been deleted");
        }catch(err){
            next(err);
        }
       
    }
    else{
        return next(createError(403,"You can delete only your account"));
    }
}

//get 

export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

//subscribe

export const subscribe = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json("Subscription successfull.")
    } catch (err) {
      next(err);
    }
  };

//unsubscribe
export const unsubscribe = async (req, res, next) => {
    try {
      try {
        await User.findByIdAndUpdate(req.user.id, {
          $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
          $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription successfull.")
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  };
  //like
export const like = async(req,res,next)=>{
    const id = req.user.id;
    const videoid = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoid,{
            $addToSet:{likes:id},
            $pull:{dislikes:id},
        });
        res.status(200).json("Video liked");
    } catch (err) {
        next(err);
    }
}

export const dislike = async(req,res,next)=>{
    const id = req.user.id;
    const videoid = req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoid,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        });
        res.status(200).json("video disliked")
    } catch (err) {
        next(err);
    }
}
  