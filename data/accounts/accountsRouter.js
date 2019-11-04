const express = require('express');
const knex = require('../dbConfig');
const router = express.Router();


router.get('/', (req,res) => {
 knex
 ('accounts')
 .then(accounts => {
   res.json(accounts)
 })
 .catch(err => {
   res.status(500).json({message: "could not list accounts"})
 })
})

router.get('/:id', (req, res) => {
  knex('accounts')
  .where('id', '=', req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    res.status(500).json({ error: 'Failed to get posts from database' });
  });
})

router.post('/', (req, res) => {
  knex('accounts')
  .insert({name: req.body.name, budget: req.body.budget})
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    res.status(500).json({ error: 'Failed to get posts from database, need both name and budget' });
  });
})

router.put('/:id', (req, res) => {
  // validate the data before calling the database

  knex('accounts')
    .where({ id: req.params.id })
    .update({name: req.body.name, budget: req.body.budget})
    .then(count => {
      // count: how many records/rows were updated
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update post' });
    });
});

router.delete('/:id', (req, res) => {
  // validate the data before calling the database

  knex('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      // count: how many records/rows were delete
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to delete post' });
    });
});
module.exports = router;
