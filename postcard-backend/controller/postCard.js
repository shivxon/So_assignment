const Postcard = require('../models/postcard')

const addPostCard = async(req, res) => {
    try {
        let postObj = {
            postCard: req.body.postcard,
            userId: req.user._id
        }
        let postcard = await Postcard.create(postObj)
        if (postcard) return res.status(200).send({ 'message': 'success' })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
const getPostCard = async(req, res) => {
    try {
        let postcard = await Postcard.find({ userId: req.user._id, }).sort({ createdAt: -1 })
        if (postcard) return res.status(200).send(postcard)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

const deletPostCard = async(req, res) => {
    try {
        let postcard = await Postcard.findOneAndDelete({ _id: req.params.id, })
        if (postcard) return res.status(200).send({ message: 'succces' })
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

const getPostCardById = async(req, res) => {
    try {
        let postcard = await Postcard.findOne({ _id: req.params.id, })
        if (postcard) return res.status(200).send(postcard)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
const updatePostCard = async(req, res) => {
    try {
        let postcard = await Postcard.findOneAndUpdate({ _id: req.body.id, userId: req.user._id }, {
            $set: {
                postCard: req.body.form.postcard
            }
        })
        if (postcard) return res.status(200).send(postcard)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}


module.exports = {
    addPostCard,
    getPostCard,
    deletPostCard,
    getPostCardById,
    updatePostCard
};