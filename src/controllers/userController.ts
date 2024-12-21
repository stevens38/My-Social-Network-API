import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User, Thoughts } from '../models/index.js';


/**
 * GET All Students /students
 * @returns an array of Students
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const user = await User.find();

        const userObj = {
            user,
        }

        res.json(userObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Student based on id /students/:id
 * @param string id
 * @returns a single Student object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { usertId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({
                user,
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST Student /students
 * @param object student
 * @returns a single Student object
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
/**
 * DELETE Student based on id /students/:id
 * @param string id
 * @returns string 
*/

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        const thought = await Thoughts.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { user: req.params.userId } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no thought found',
            });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * POST Assignment based on /students/:studentId/assignments
 * @param string id
 * @param object assignment
 * @returns object student 
*/

export const addAssignment = async (req: Request, res: Response) => {    //addAssignment needs updated to....
    console.log('You are adding an assignment');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.usertId },
            { $addToSet: { assignments: req.body } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * DELETE Assignment based on /students/:studentId/assignments
 * @param string assignmentId
 * @param string studentId
 * @returns object student 
*/

export const removeAssignment = async (req: Request, res: Response) => {       //removeAssignment needs updated to....
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.usertId },
            { $pull: { assignments: { assignmentId: req.params.assignmentId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
