const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with that ID!' })
                }
                res.json(data)
            })
            .catch(err => res.status(400).json(err));
    },
    createUser({ body }, res) {
        User.create(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with that ID!' })
                }
                res.json(data)
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with that ID!' })
                }
                res.json(data)
            })
            .catch(err => res.status(400).json(err));
    }
}

// api/users/:userId/friends/:friendId
// router.route('/:id/friends/:fid').post();
// router.route('/:id/friends/:fid').delete();

module.exports = userController;