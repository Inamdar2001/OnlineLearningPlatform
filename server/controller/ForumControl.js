import createforum from "../services/createForServ.js";
import { forumModel } from "../models/ForumModel.js";
let createForum = async (req, res, next) => {
    try {
        let forum = await createforum(req, next);
        res.status(200).json({
            success: true,
            message: "forum is created successfully",
            forum
        });
    } catch (error) {
        next(error)
    }
};

let getForums = async (req, res, next) => {
    try {
        let forumlist = await forumModel.find();
        if (forumlist.length === 0) {
            return next(new Error("forum are not present"))
        }
        res.status(200).json({
            success: true,
            message: "forum list get successfully",
            forumlist
        });
    } catch (error) {
        next(error)
    }
};

let addComment = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { text } = req.body
        let { _id } = req.user
        let forum = await forumModel.findByIdAndUpdate(id, {
            $push: {
                comments: { userId: _id, text: text },
            },
        }, { new: true });
        res.status(200).json({
            success: true,
            message: "comment add successfully at forum",
            forum
        });



    } catch (error) {
        console.log(error)
        next(error)
    }
}

export { createForum, getForums, addComment }