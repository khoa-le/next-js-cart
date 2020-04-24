# Migration `20200407222635-update_relation`

This migration has been generated by Khoa Le at 4/7/2020, 10:26:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `next-js-cart`.`ProductsOnAttributes` (
    `attribute_value_id` int NOT NULL ,
    `product_id` int NOT NULL ,
    PRIMARY KEY (`product_id`,`attribute_value_id`)
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `next-js-cart`.`categoriesOnproducts` (
    `category_id` int NOT NULL ,
    `product_id` int NOT NULL ,
    PRIMARY KEY (`category_id`,`product_id`)
) 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `next-js-cart`.`_categoryToproduct` ;

ALTER TABLE `next-js-cart`.`ProductsOnAttributes` ADD FOREIGN KEY (`attribute_value_id`) REFERENCES `next-js-cart`.`attribute_value`(`attribute_value_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `next-js-cart`.`ProductsOnAttributes` ADD FOREIGN KEY (`product_id`) REFERENCES `next-js-cart`.`product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `next-js-cart`.`categoriesOnproducts` ADD FOREIGN KEY (`product_id`) REFERENCES `next-js-cart`.`product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `next-js-cart`.`categoriesOnproducts` ADD FOREIGN KEY (`category_id`) REFERENCES `next-js-cart`.`category`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `next-js-cart`.`_categoryToproduct` ADD FOREIGN KEY (`A`) REFERENCES `next-js-cart`.`category`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `next-js-cart`.`_categoryToproduct` ADD FOREIGN KEY (`B`) REFERENCES `next-js-cart`.`product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE `next-js-cart`.`categories_products`;

DROP TABLE `next-js-cart`.`product_attribute`;

CREATE UNIQUE INDEX `customer.email` ON `next-js-cart`.`customer`(`email`);
DROP INDEX `idx_customer_email` ON `next-js-cart`.`customer`;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200407222635-update_relation
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,175 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "mysql"
+  url      = env("DATABASE_URL")
+}
+
+model attribute {
+  attribute_id Int    @default(autoincrement()) @id
+  name         String
+}
+
+model attribute_value {
+  attribute_id       Int
+  attribute_value_id Int    @default(autoincrement()) @id
+  value              String
+
+  @@index([attribute_id], name: "idx_attribute_value_attribute_id")
+}
+
+model audit {
+  audit_id   Int      @default(autoincrement()) @id
+  code       Int
+  created_on DateTime
+  message    String
+  order_id   Int
+
+  @@index([order_id], name: "idx_audit_order_id")
+}
+
+model category {
+  category_id   Int     @default(autoincrement()) @id
+  department_id Int
+  description   String?
+  name          String
+  products product[]
+
+  @@index([department_id], name: "idx_category_department_id")
+}
+
+model customer {
+  address_1          String?
+  address_2          String?
+  city               String?
+  country            String?
+  credit_card        String?
+  customer_id        Int     @default(autoincrement()) @id
+  day_phone          String?
+  email              String  @unique
+  eve_phone          String?
+  mob_phone          String?
+  name               String
+  password           String
+  postal_code        String?
+  region             String?
+  shipping_region_id Int     @default(1)
+
+  @@index([shipping_region_id], name: "idx_customer_shipping_region_id")
+}
+
+model department {
+  department_id Int     @default(autoincrement()) @id
+  description   String?
+  name          String
+}
+
+model orders {
+  auth_code    String?
+  comments     String?
+  created_on   DateTime
+  customer_id  Int?
+  order_id     Int       @default(autoincrement()) @id
+  reference    String?
+  shipped_on   DateTime?
+  shipping_id  Int?
+  status       Int       @default(0)
+  tax_id       Int?
+  total_amount Float     @default(0)
+
+  @@index([customer_id], name: "idx_orders_customer_id")
+  @@index([shipping_id], name: "idx_orders_shipping_id")
+  @@index([tax_id], name: "idx_orders_tax_id")
+}
+
+model order_detail {
+  attributes   String
+  item_id      Int    @default(autoincrement()) @id
+  order_id     Int
+  product_id   Int
+  product_name String
+  quantity     Int
+  unit_cost    Float
+
+  @@index([order_id], name: "idx_order_detail_order_id")
+}
+
+model product {
+  description      String
+  discounted_price Float   @default(0)
+  display          Int     @default(0)
+  image            String?
+  image_2          String?
+  name             String
+  price            Float
+  product_id       Int     @default(autoincrement()) @id
+  thumbnail        String?
+  categories category[]
+
+  @@index([name, description], name: "idx_ft_product_name_description")
+}
+
+model ProductsOnAttributes {
+  attribute_values attribute_value @relation(fields:[attribute_value_id],references:[attribute_value_id])
+  attribute_value_id Int
+  products product @relation(fields:[product_id],references:[product_id])
+  product_id         Int
+
+  @@id([product_id, attribute_value_id])
+}
+
+
+model review {
+  created_on  DateTime
+  customer_id Int
+  product_id  Int
+  rating      Int
+  review      String
+  review_id   Int      @default(autoincrement()) @id
+
+  @@index([customer_id], name: "idx_review_customer_id")
+  @@index([product_id], name: "idx_review_product_id")
+}
+
+model shipping {
+  shipping_cost      Float
+  shipping_id        Int    @default(autoincrement()) @id
+  shipping_region_id Int
+  shipping_type      String
+
+  @@index([shipping_region_id], name: "idx_shipping_shipping_region_id")
+}
+
+model shipping_region {
+  shipping_region    String
+  shipping_region_id Int    @default(autoincrement()) @id
+}
+
+model shopping_cart {
+  added_on   DateTime
+  attributes String
+  buy_now    Boolean  @default(true)
+  cart_id    String
+  item_id    Int      @default(autoincrement()) @id
+  product_id Int
+  quantity   Int
+
+  @@index([cart_id], name: "idx_shopping_cart_cart_id")
+}
+
+model tax {
+  tax_id         Int    @default(autoincrement()) @id
+  tax_percentage Float
+  tax_type       String
+}
+
+model categoriesOnproducts {
+  products        product      @relation(fields: [product_id], references: [product_id])
+  product_id      Int       // product id
+  categories    category  @relation(fields: [category_id], references: [category_id])
+  category_id  Int       // category id
+  @@id([category_id, product_id])
+}
+
```

