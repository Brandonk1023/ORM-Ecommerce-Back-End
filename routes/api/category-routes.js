const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
    }
  })
    .then(catData => res.json(catData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
  // find category by id
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(catData => {
      if (!catData) {
        res.status(404).json({ message: 'No data found with id' })
        return
      }
      res.json(catData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
  // create category
  Category.create({
    category_name: req.body.category_name
  })
    .then(catData => res.json(catData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update category
  Category.update({
    category_name: req.body.category_name
  },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(catData => {
    if (!catData) {
      res.status(404).json({message: 'No data found with id'})
      return
    }
    res.json(catData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete category
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(catData => {
    if (!catData) {
      res.status(404).json({message: 'No data found with id'})
      return
    }
    res.json(catData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

module.exports = router;
