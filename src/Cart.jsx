import { CartItem } from "./CartItem";

const Cart = ({
  cartItems,
  isCartOpen,
  setIsCartOpen,
  onDeleteItem,
  onChangeQuantity,
  onClearCart, // new prop
}) => {
  const numberOfItems = cartItems.reduce((acc, el) => acc + el.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, el) => acc + (el.salePrice ?? el.price) * el.quantity,
    0
  );

  return (
    <div
      className={
        "fixed inset-0 z-20 flex justify-end" + (!isCartOpen ? " hidden" : "")
      }
    >
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black opacity-60"
      ></div>

      {/* Cart Panel */}
      <div className="relative z-30 w-96 max-w-full h-full bg-white shadow-xl p-5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Your Cart ({numberOfItems} {numberOfItems === 1 ? "item" : "items"})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ?
          <div className="flex flex-col items-center justify-center flex-1">
            <img
              src="/icons/illustration-empty-cart.svg"
              alt="Empty Cart"
              className="w-48 h-48"
            />
            <p className="text-gray-500 mt-4">Your cart is empty</p>
          </div>
        : <div className="flex-1 overflow-y-auto">
            {cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                item={cartItem}
                onChangeQuantity={onChangeQuantity}
                onDeleteItem={onDeleteItem}
              />
            ))}
          </div>
        }

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="mt-4 border-t pt-4 flex flex-col gap-3">
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {/* Clear Cart Button */}
            <button
              onClick={onClearCart}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Clear Cart
            </button>

            <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
