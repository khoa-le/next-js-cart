import { PrismaClient } from "@prisma/client";
import useAppContext from "../../../utils/middleware/appcontext";

const prisma = new PrismaClient();

const Region = async (req, res) => {
  const regions = await prisma.directory_region.findMany({
    where: {
      country_id: "VN"
    }
  });
  res.json(regions);
};

export default useAppContext(Region);
