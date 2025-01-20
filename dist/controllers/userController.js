import { User } from '../models/user.js';
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User
            .findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json({ message: 'User and associated thoughts deleted!' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const deleteFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
