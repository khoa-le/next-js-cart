const faker = require("faker");

function PageContext() {
  return {
    cart: {
      userCart: {
        cart_id: faker.random.uuid(),
        mask_id: faker.random.uuid(),
        grand_total: faker.random.number(),
        total_qty: faker.random.number(),
        cart_item: [
          {
            item_id: faker.random.uuid(),
            product_id: faker.random.number(),
            product_name: faker.random.words(),
            qty: faker.random.number(),
            price: faker.random.number(),
            product:{
              image: faker.random.image(),
            }
          }
        ]
      }
    }
  };
}

module.exports = {
  PageContext
};
