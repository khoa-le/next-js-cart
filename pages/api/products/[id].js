import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export default async function handle(req, res) {
    const {
        query: {
            id,
        }
    } = req
    const product = await prisma.product.findOne({where: {product_id: parseInt(id)}})
    return res.json(product)
}