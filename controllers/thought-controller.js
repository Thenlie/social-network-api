const { Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' })
                }
                res.json(data)
            })
            .catch(err => res.status(400).json(err));
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' })
                }
                res.json(data)
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with that ID!' })
                }
                res.json(data)
            })
            .catch(err => res.status(400).json(err));
    }
}

// api/thoughts/:thoughtId/reactions
// router.route('/:id/reactions').post();
// router.route('/:id/reactions/:rid').delete();

module.exports = thoughtController;