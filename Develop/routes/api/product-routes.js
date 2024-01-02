const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// route to get all products
router.get('/', async (req, res) => {
  try {
    const allProductsData = await Product.findAll({
      include: [
        { model: Category }, 
        { model: Tag, through: ProductTag },
      ],
    });
    res.status(200).json(allProductsData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const oneProductData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category }, 
        { model: Tag, through: ProductTag },
      ],
    });
    res.status(200).json(oneProductData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// route to update a product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// route to delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleteProductData = await Product.findByPk(req.params.id);

    if (!deleteProductData) {
      res.status(404).json({ error: 'Unable to find product' });
      return;
    }

    await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deleteProductData);
  } catch (err) {
    
    console.error(err);
    res.status(500).json(err);
  }
});

// exports routes
module.exports = router;