import { FiShoppingCart } from "react-icons/fi";

export const Header = ({ onToggleCart }) => (
  <header className="sticky top-0  z-10">
    <div className="container rounded-lg bg-white shadow-sm mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Sweet Delights</h1>
      <button
        onClick={onToggleCart}
        className="relative p-2 hover:text-red-500 transition-colors"
      >
        <FiShoppingCart className="text-2xl" />
      </button>
    </div>
  </header>
);
