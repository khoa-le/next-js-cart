import React from "react";
import {GlobalConfiguration} from "../../utils/global";
import Category from "../../components/category/Category";
import { PrismaClient } from "@prisma/client";

export default function CategoryPage({ category, products,page }) {
  return <Category category={category} products={products} page={page} />;
}

export const getServerSideProps = async (context) => {
  const {
    ProductListing: { PerPage },
  } = GlobalConfiguration;
  let {
    query: { page },
  } = context;
  page = page == undefined ? 1 : parseInt(page);

  const prisma = new PrismaClient();
  const category = await prisma.category.findOne({
    where: {
      category_id: parseInt(context.params.id),
    },
  });
  const products = await prisma.product.findMany({
    where: {
      category: {
        some: {
          category_id: parseInt(context.params.id),
        },
      },
    },
    skip: (page - 1) * PerPage,
    first: PerPage+1,
  });

  return {
    props: {
      category: category,
      products: products,
      page:page,
    },
  };
};
