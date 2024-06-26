export const getAllProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("error fetching products");
  }
  return res.json();
};

export const getProduct = async (id: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("error fetching product");
  }
  return res.json();
};

export const addProduct = async (product: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("error adding product");
  }
  return res.json();
};

export const deleteProduct = async (id: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("error deleting product");
  }
  return res.json();
};

export const updateProduct = async (id: any, product: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("error updating product");
  }
  return res.json();
};
