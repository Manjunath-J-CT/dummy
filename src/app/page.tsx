import ProductPage from "@/components/products/ProductPage";

const Home = async () => {
  return (
    <div className="bg-gray-200 min-h-[100vh]">
      <ProductPage key="home"/>
    </div>
  );
};

export default Home;
