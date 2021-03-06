# Migration `20200522163041-updatedb_20200`

This migration has been generated by Khoa Le at 5/22/2020, 4:30:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `next-js-cart`.`cart_item` DROP FOREIGN KEY `cart`,
DROP FOREIGN KEY `product`;

ALTER TABLE `next-js-cart`.`order_address` DROP FOREIGN KEY `fk_city_order_address`,
DROP FOREIGN KEY `fk_order_address`,
DROP FOREIGN KEY `fk_region_order_address`;

ALTER TABLE `next-js-cart`.`order_detail` DROP FOREIGN KEY `fk_order`,
DROP FOREIGN KEY `fk_product`;

ALTER TABLE `next-js-cart`.`cart_item` ADD FOREIGN KEY (`cart_id`) REFERENCES `next-js-cart`.`cart`(`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `next-js-cart`.`cart_item` ADD FOREIGN KEY (`product_id`) REFERENCES `next-js-cart`.`product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `next-js-cart`.`order_address` ADD FOREIGN KEY (`city_id`) REFERENCES `next-js-cart`.`directory_city`(`city_id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `next-js-cart`.`order_address` ADD FOREIGN KEY (`order_id`) REFERENCES `next-js-cart`.`order`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `next-js-cart`.`order_address` ADD FOREIGN KEY (`region_id`) REFERENCES `next-js-cart`.`directory_region`(`region_id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `next-js-cart`.`order_detail` ADD FOREIGN KEY (`order_id`) REFERENCES `next-js-cart`.`order`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `next-js-cart`.`order_detail` ADD FOREIGN KEY (`product_id`) REFERENCES `next-js-cart`.`product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE

CREATE UNIQUE INDEX `cart.mask_id` ON `next-js-cart`.`cart`(`mask_id`);
DROP INDEX `index` ON `next-js-cart`.`cart`
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200407225319-update_attribute_master..20200522163041-updatedb_20200
--- datamodel.dml
+++ datamodel.dml
@@ -3,24 +3,25 @@
 }
 datasource db {
   provider = "mysql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 model attribute {
-  attribute_id Int    @default(autoincrement()) @id
-  name         String
+  attribute_id    Int               @default(autoincrement()) @id
+  name            String
+  attribute_value attribute_value[]
 }
 model attribute_value {
-  attribute_id       Int
-  attribute_value_id Int    @default(autoincrement()) @id
-  value              String
-  attribute    attribute  @relation(fields: [attribute_id], references: [attribute_id])
+  attribute_id         Int
+  attribute_value_id   Int                    @default(autoincrement()) @id
+  value                String
+  attribute            attribute              @relation(fields: [attribute_id], references: [attribute_id])
+  ProductsOnAttributes ProductsOnAttributes[]
+  product              product[]              @relation(references: [product_id])
-  products product[]
-
   @@index([attribute_id], name: "idx_attribute_value_attribute_id")
 }
 model audit {
@@ -32,34 +33,77 @@
   @@index([order_id], name: "idx_audit_order_id")
 }
+model cart {
+  cart_id        Int         @default(autoincrement()) @id
+  created_at     DateTime?
+  customer_email String?
+  customer_id    Int?
+  grand_total    Float?
+  mask_id        String      @unique
+  total_qty      Int         @default(0)
+  updated_at     DateTime?
+  cart_item      cart_item[]
+}
+
+model cart_item {
+  cart_id      Int
+  created_at   DateTime?
+  item_id      Int       @default(autoincrement()) @id
+  options      String?
+  price        Float?
+  product_id   Int
+  product_name String?
+  qty          Int?
+  updated_at   DateTime?
+  cart         cart      @relation(fields: [cart_id], references: [cart_id])
+  product      product   @relation(fields: [product_id], references: [product_id])
+
+  @@index([cart_id], name: "index2")
+  @@index([product_id], name: "index3")
+  @@unique([product_id, cart_id], name: "UniqueProductOnCart")
+}
+
+model categoriesOnproducts {
+  category_id Int
+  product_id  Int
+  category    category @relation(fields: [category_id], references: [category_id])
+  product     product  @relation(fields: [product_id], references: [product_id])
+
+  @@id([category_id, product_id])
+  @@index([product_id], name: "product_id")
+}
+
 model category {
-  category_id   Int     @default(autoincrement()) @id
-  department_id Int
-  description   String?
-  name          String
-  products product[]
+  category_id          Int                    @default(autoincrement()) @id
+  department_id        Int
+  description          String?
+  name                 String
+  categoriesOnproducts categoriesOnproducts[]
+  product              product[]              @relation(references: [product_id])
   @@index([department_id], name: "idx_category_department_id")
 }
 model customer {
-  address_1          String?
-  address_2          String?
-  city               String?
-  country            String?
-  credit_card        String?
-  customer_id        Int     @default(autoincrement()) @id
-  day_phone          String?
-  email              String  @unique
-  eve_phone          String?
-  mob_phone          String?
-  name               String
-  password           String
-  postal_code        String?
-  region             String?
-  shipping_region_id Int     @default(1)
+  address_1            String?
+  address_2            String?
+  city                 String?
+  country              String?
+  credit_card          String?
+  customer_id          Int     @default(autoincrement()) @id
+  day_phone            String?
+  email                String  @unique
+  eve_phone            String?
+  mob_phone            String?
+  name                 String?
+  password             String
+  postal_code          String?
+  region               String?
+  reset_password_token String?
+  salt                 String
+  shipping_region_id   Int?    @default(1)
   @@index([shipping_region_id], name: "idx_customer_shipping_region_id")
 }
@@ -68,64 +112,113 @@
   description   String?
   name          String
 }
-model orders {
-  auth_code    String?
-  comments     String?
-  created_on   DateTime
-  customer_id  Int?
-  order_id     Int       @default(autoincrement()) @id
-  reference    String?
-  shipped_on   DateTime?
-  shipping_id  Int?
-  status       Int       @default(0)
-  tax_id       Int?
-  total_amount Float     @default(0)
+model directory_city {
+  city_id       Int             @default(autoincrement()) @id
+  code          String?
+  default_name  String?
+  region_id     Int?
+  order_address order_address[]
+  @@index([region_id], name: "region_idx")
+}
+
+model directory_region {
+  code          String?
+  country_id    String?
+  default_name  String?
+  region_id     Int             @default(autoincrement()) @id
+  order_address order_address[]
+
+  @@index([country_id], name: "idx_country")
+}
+
+model order {
+  auth_code      String?
+  comments       String?
+  created_on     DateTime
+  customer_id    Int?
+  order_id       Int             @default(autoincrement()) @id
+  payment_method String?
+  reference      String?
+  shipped_on     DateTime?
+  shipping_id    Int?
+  status         Int             @default(0)
+  tax_id         Int?
+  total_amount   Float           @default(0)
+  order_address  order_address[]
+  order_detail   order_detail[]
+
   @@index([customer_id], name: "idx_orders_customer_id")
   @@index([shipping_id], name: "idx_orders_shipping_id")
   @@index([tax_id], name: "idx_orders_tax_id")
 }
+model order_address {
+  address          String
+  city_id          Int
+  email            String           @default("")
+  entity_id        Int              @default(autoincrement()) @id
+  first_name       String           @default("")
+  last_name        String           @default("")
+  order_id         Int
+  phone            String           @default("")
+  region_id        Int
+  directory_city   directory_city   @relation(fields: [city_id], references: [city_id])
+  order            order            @relation(fields: [order_id], references: [order_id])
+  directory_region directory_region @relation(fields: [region_id], references: [region_id])
+
+  @@index([city_id], name: "fk_city_order_address")
+  @@index([order_id], name: "fk_order_address")
+  @@index([region_id], name: "fk_region_order_address")
+}
+
 model order_detail {
   attributes   String
-  item_id      Int    @default(autoincrement()) @id
+  item_id      Int     @default(autoincrement()) @id
   order_id     Int
   product_id   Int
   product_name String
   quantity     Int
   unit_cost    Float
+  order        order   @relation(fields: [order_id], references: [order_id])
+  product      product @relation(fields: [product_id], references: [product_id])
   @@index([order_id], name: "idx_order_detail_order_id")
+  @@index([product_id], name: "product_idx")
 }
 model product {
-  description      String
-  discounted_price Float   @default(0)
-  display          Int     @default(0)
-  image            String?
-  image_2          String?
-  name             String
-  price            Float
-  product_id       Int     @default(autoincrement()) @id
-  thumbnail        String?
-  attribute_values attribute_value[]
-  categories category[]
+  description          String
+  discounted_price     Float                  @default(0)
+  display              Int                    @default(0)
+  image                String?
+  image_2              String?
+  name                 String
+  price                Float
+  product_id           Int                    @default(autoincrement()) @id
+  thumbnail            String?
+  cart_item            cart_item[]
+  categoriesOnproducts categoriesOnproducts[]
+  order_detail         order_detail[]
+  ProductsOnAttributes ProductsOnAttributes[]
+  attribute_value      attribute_value[]      @relation(references: [attribute_value_id])
+  category             category[]             @relation(references: [category_id])
   @@index([name, description], name: "idx_ft_product_name_description")
 }
 model ProductsOnAttributes {
-  attribute_values attribute_value @relation(fields:[attribute_value_id],references:[attribute_value_id])
   attribute_value_id Int
-  products product @relation(fields:[product_id],references:[product_id])
   product_id         Int
+  attribute_value    attribute_value @relation(fields: [attribute_value_id], references: [attribute_value_id])
+  product            product         @relation(fields: [product_id], references: [product_id])
   @@id([product_id, attribute_value_id])
+  @@index([attribute_value_id], name: "attribute_value_id")
 }
-
 model review {
   created_on  DateTime
   customer_id Int
   product_id  Int
@@ -166,14 +259,5 @@
 model tax {
   tax_id         Int    @default(autoincrement()) @id
   tax_percentage Float
   tax_type       String
-}
-
-model categoriesOnproducts {
-  products        product      @relation(fields: [product_id], references: [product_id])
-  product_id      Int       // product id
-  categories    category  @relation(fields: [category_id], references: [category_id])
-  category_id  Int       // category id
-  @@id([category_id, product_id])
-}
-
+}
```


