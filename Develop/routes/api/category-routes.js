const router = require('express').Router();
const { Category, Product } = require('../../models');

// route to get all categories
router.get('/', async (req, res) => {
  try {
    const allCatData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCatData)

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get one category by id
router.get('/:id', async (req, res) => {
  try {
    const oneCatData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(oneCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to post a new category
router.post('/', async (req, res) => {
  try {
    const newCatData = await Category.create(req.body);
    res.status(200).json(newCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to update category
router.put('/:id', async (req, res) => {
  try {
    const updateCatData = await Category.findByPk(req.params.id);

    if (!updateCatData) {
      res.status(404).json({ error: 'Unable to find category' });
      return;
    }

    const [numRowsUpdated] = await Category.update(req.body, { where: { id: req.params.id } });

    if (numRowsUpdated === 0) {
      res.status(500).json({ error: 'Failed to update category' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully' });

  } catch (err) {
    res.status(500).json(err);
  }
});


// route to delete category
router.delete('/:id', async (req, res) => {
  try {
    const deleteCatData = await Category.findByPk(req.params.id);

    if (!deleteCatData) {
      res.status(404).json({ error: 'Unable to find category' });
      return;
    }
    
    await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteCatData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// exports routes
module.exports = router;