import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useFormStore } from "@/lib/useFormStore";
import { prodAuth } from "@/lib/validators";
import { updateProduct } from "@/lib/apiMethods";

type Data = z.infer<typeof prodAuth>;

type Product = {
  _id: any;
  name: string;
  price: number;
  description: string;
  image: string;
};

type ProductDetailsProps = {
  product: Product;
  setOpen: (open: boolean) => void;
};

const UpdateDetails = ({ product, setOpen }: ProductDetailsProps) => {
  const { setIsValid, setFormData } = useFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Data>({
    resolver: zodResolver(prodAuth),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Data> = async (data: Data) => {
    await updateProduct(product._id, data);
    setFormData(data);
    setOpen(false);
  };

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid, setIsValid]);

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Name<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Product name"
            defaultValue={product.name}
            id="name"
            {...register("name")}
          />
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Price<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Price"
            defaultValue={product.price}
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          <span className="text-red-500 text-sm">{errors.price?.message}</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">
            Description<span className="text-red-400">*</span>
          </span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Description"
            defaultValue={product.description}
            id="description"
            {...register("description")}
          />
          <span className="text-red-500 text-sm">
            {errors.description?.message}
          </span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-bold mb-1">Image URL</span>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="URL"
            defaultValue={product.image}
            id="image"
            {...register("image")}
          />
          <span className="text-red-500 text-sm">{errors.image?.message}</span>
        </label>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              isValid
                ? "bg-blue-600 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDetails;
