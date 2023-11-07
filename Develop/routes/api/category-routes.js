const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
 // find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Oops! There was a problem!' });
  }
});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
try {
  const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
  if (!category) {
    res.status(404).json({ message: 'Category not found' });
    return;
  }
  res.status(200).json(category);
} catch (err) {
  res.status(500).json(err);
}
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category); //200 means success
  } catch (err) {
    res.status(400).json(err); //400 code means server couldn't understand request
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!category[0]) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
 try {
  const deleteCategory = await Category.destroy({ where: { id: req.params.id } });
  if (!deleteCategory)  {
    res.status(404).json({ message: 'Category not found' });
    return;
  }
  res.status(200).json(deleteCategory);
 } catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;
