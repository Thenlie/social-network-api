const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with that ID!' })
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    createUser({ body }, res) {
        User.create(body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with that ID!' })
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with that ID!' })
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.fid }}, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with that ID!' })
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.fid }}, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with that ID!' })
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    }
}

module.exports = userController;