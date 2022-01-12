const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' });
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id }}, {new: true});
            })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' });
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' });
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((thought) => {
                return User.findOneAndUpdate({ username: thought.username }, { $pull: { thoughts: params.id }}, {new: true});
            })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' });
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, { $push: { reactions: body }}, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' });
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, { $pull: { reactions: { reactionId: params.rid }}}, { new: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' });
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    }
}

// api/thoughts/:thoughtId/reactions
// router.route('/:id/reactions').post();
// router.route('/:id/reactions/:rid').delete();

module.exports = thoughtController;