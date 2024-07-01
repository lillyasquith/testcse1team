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


const createThread = async (req, res) => {
  const newThread = {
    title: req.body.title,
    author: req.body.author,
    publishedDate: req.body.publishedDate,
    content: req.body.content,
    tags: req.body.tags,
    };
  const response = await mongodb
  .getDb()
  .db()
  .collection('thread')
  .insertOne(newThread);
  if (response.acknowledged) {
    res.status(201).json(response);
  }
  else {
    res.status(500).json(response.error || 'Some error occured while updating the Thread');
  }
};

const updateThread = async (req, res) => {
const ThreadId = new ObjectId(req.params.id);
const newData = {
  title: req.body.title,
  author: req.body.author,
  publishedDate: req.body.publishedDate,
  content: req.body.content,
  tags: req.body.tags,
  };
  const response = await mongodb
  .getDb()
  .db()
  .collection('thread')
  .replaceOne({_id: ThreadId}, newData);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'Some error occured while updating the Thread');
  }
};


const getAuthorThreads = async (req, res, next) => {
  try {
    const { authorName } = req.params;
    const result = await mongodb
      .getDb()
      .db()
      .collection('thread')
      .find({ author: authorName });
    result.toArray().then((list) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(list);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occured while fetching threads', error });
  }
};


const deleteThread = async (req, res) => {
const ThreadId = new ObjectId(req.params.id);
const response = await mongodb
 .getDb()
 .db()
 .collection('thread')
 .deleteOne({_id: ThreadId});
 if (response.deletedCount > 0) {
    res.status(200).send();
 }
 else {
    res.status(500).json(response.error || 'Some error occured while updating the Thread');
 }
}


module.exports = {
    getAll,
    getSingle,
    createThread,
    updateThread,
    getAuthorThreads,
    deleteThread
  };