const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('thread').find();
  result.toArray().then((thread) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(thread);
  });
};

const getSingle = async (req, res, next) => {
  const threadId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('thread')
    .find({ _id: threadId });
  result.toArray().then((list) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(list[0]);
  });
};



module.exports = {
    getAll,
    getSingle
  };