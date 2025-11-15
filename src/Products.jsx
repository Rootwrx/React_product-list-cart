import { Product } from "./Product";

export const Products = ({
  products,
  cartItems,
  onDeleteItem,
  onChangeQuantity,
  onAddToCart,
}) => (
  <section className="flex-1 grid gap-3 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
    {products.map((product) => (
      <Product
        key={product.id}
        product={product}
        cartItems={cartItems}
        onDeleteItem={onDeleteItem}
        onChangeQuantity={onChangeQuantity}
        onAddToCart={onAddToCart}
      />
    ))}
  </section>
);
