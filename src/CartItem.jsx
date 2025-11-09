import { FiTrash } from "react-icons/fi";

export const CartItem = ({ item, onChangeQuantity, onDeleteItem }) => {
  const {
    id,
    name,
    price,
    salePrice,
    quantity,
    quantityInStock,
    image: { thumbnail },
  } = item;

  const displayPrice = salePrice ?? price;

  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-3 mb-3">
      {/* Product Image */}
      <img
        src={thumbnail}
        alt={name}
        className="w-16 h-16 rounded-lg object-cover"
      />

      {/* Product Info */}
      <div className="flex-1 flex flex-col ml-4">
        <span className="font-semibold text-gray-800">{name}</span>
        <span className="text-gray-600 text-sm">
          ${displayPrice.toFixed(2)}
        </span>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => (quantity == 1 ? null : onChangeQuantity(id, -1))}
          className="w-6 h-6 flex items-center justify-center border rounded-full border-gray-300 hover:bg-gray-100"
        >
          -
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          onClick={() => onChangeQuantity(id, 1)}
          className="w-6 h-6 flex items-center justify-center border rounded-full border-gray-300 hover:bg-gray-100"
          disabled={quantity === quantityInStock}
        >
          +
        </button>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDeleteItem(id)}
        className="ml-4 text-red-600 hover:text-red-800"
      >
        <FiTrash size={18} />
      </button>
    </div>
  );
};
