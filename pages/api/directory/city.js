import { PrismaClient } from "@prisma/client";
import useAppContext from "../../../utils/middleware/appcontext";

const City = async (req, res) => {
  const {
    query: { region_id },
  } = req;
  if (region_id == "") {
    return res.json([]);
  }
  const prisma = new PrismaClient();
  const cities = await prisma.directory_city.findMany({
    where: {
      region_id: parseInt(region_id),
    },
  });
  res.json(cities);
};

export default useAppContext(City);
