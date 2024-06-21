import Links from "./links/Links";

const Navbar = () => {
  return (
    <div className="px-6 flex bg-gray-900 text-white text-xl items-center justify-between border-b-2 border-gray-600 mobile:h-12 tablet:h-16">
      <div className="flex justify-center">
        <Links />
      </div>
    </div>
  );
};
export default Navbar;
