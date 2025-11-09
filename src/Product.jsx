import { FiTrash } from "react-icons/fi";

export const Product = ({
  product,
  cartItems,
  onDeleteItem,
  onChangeQuantity,
  onAddToCart,
}) => {
  const {
    image: { desktop },
    name,
    category,
    price,
    id,
    quantityInStock,
    rating,
    dietary,
    onSale,
    salePrice,
  } = product;

  const inCart = cartItems.find((el) => el.id === id);
  return (
    <div
      className={
        "max-w-fit bg-white rounded-2xl shadow-md p-3 flex flex-col justify-between transition-transform hover:scale-[1.02] hover:shadow-lg border border-transparent" +
        (inCart ? " border-red-300" : "")
      }
    >
      {/* Image */}
      <div className="relative">
        <img
          src={desktop}
          alt={name}
          className="rounded-xl w-full aspect-4/3 object-cover"
        />
        {onSale && (
          <span className="absolute top-2 left-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
            SALE
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1 mt-3 flex-1">
        <span className="font-semibold text-gray-800 truncate">{name}</span>
        <span className="text-sm text-gray-500">{category}</span>
        <span className="text-sm text-yellow-600">⭐ {rating}</span>
        <div className="text-sm mt-1">
          {onSale ?
            <>
              <span className="text-red-600 font-semibold">${salePrice}</span>{" "}
              <span className="line-through text-gray-400 text-xs">
                ${price}
              </span>
            </>
          : <span className="text-gray-800 font-semibold">${price}</span>}
        </div>
        {quantityInStock === 0 ?
          <span className="text-red-600 text-xs bg-red-100 w-fit px-2 py-0.5 rounded-full mt-1">
            Out of stock
          </span>
        : <span className="text-green-600 text-xs bg-green-100 w-fit px-2 py-0.5 rounded-full mt-1">
            In stock: {quantityInStock}
          </span>
        }
        <div className="flex flex-wrap gap-1 mt-1">
          {dietary.map((d) => (
            <span
              key={d}
              className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Product Action */}
      {quantityInStock !== 0 && (
        <div className="mt-3  w-full flex items-center justify-center">
          {inCart ?
            <div className="flex  justify-between items-center gap-2">
              <span className="rounded-md px-3 py-1 text-white bg-red-500 flex items-center gap-2">
                <button
                  onClick={() => onChangeQuantity(id, -1)}
                  className="border border-white h-5 w-5 flex items-center justify-center rounded-full"
                >
                  <img src="/icons/icon-decrement-quantity.svg" />
                </button>
                <span className="text-sm">x{inCart.quantity}</span>
                <button
                  onClick={() => onChangeQuantity(id, 1)}
                  className="border border-white h-5 w-5 flex items-center justify-center rounded-full"
                >
                  <img src="/icons/icon-increment-quantity.svg" />
                </button>
              </span>
              <button
                onClick={() => onDeleteItem(id)}
                className=" bg-red-100 text-red-600 p-2 rounded-md hover:bg-red-200"
              >
                <FiTrash className="text-sm" />
              </button>
            </div>
          : <button
              onClick={() => onAddToCart(product)}
              className="text-sm bg-red-500 px-3 py-1.5 rounded-md text-white hover:bg-red-600"
            >
              Add to cart
            </button>
          }
        </div>
      )}
    </div>
  );
};
