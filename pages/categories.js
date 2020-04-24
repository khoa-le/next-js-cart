import Categories from '../components/category/Categories'

const CategoriesPage = ({categories}) => (
    <Categories categories={categories} />
)


export async function getStaticProps(ctx) {
    const {PrismaClient} = await import('@prisma/client');
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany();
    return {props: {categories: categories}}
}

export default CategoriesPage