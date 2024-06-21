import { z } from "zod";

export const prodAuth = z.object({
  name: z.string().nonempty({ message: "Product Name is required" }),
  price: z
    .number({ message: "Price is Required" })
    .nonnegative({ message: "Invalid Price" })
    .positive(),
  description: z.string().nonempty({ message: "Description is required" }),
  image: z.string().optional(),
});
