const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tags.findAll({ include: [{ model: Product }] });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Tags not found!!' });
  }
});

 // find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tags = await Tags.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!tags) {
      res.status(404).json({ message: 'Tags not found' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
  });

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tags = await Tags.create(req.body);
    res.status(200).json(tags); //200 means success
  } catch (err) {
    res.status(400).json(err); //400 code means server couldn't understand request
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tags = await Tags.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tags[0]) {
      res.status(404).json({ message: 'Tags not found' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
   const deleteTags = await Tags.destroy({ where: { id: req.params.id } });
   if (!deleteTags)  {
     res.status(404).json({ message: 'Tags not found' });
     return;
   }
   res.status(200).json(deleteTags);
  } catch (err) {
   res.status(500).json(err);
  }
 });

module.exports = router;
