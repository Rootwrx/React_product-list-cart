import { useState } from "react";
import { PRODUCTS } from "./assets/data";
import { SideBar } from "./SideBar";
import { Header } from "./Header";
import { Content } from "./Content";
import Cart from "./Cart";

export default function App() {
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedDietaries, setCheckedDietaries] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const hanldeToggleCart = () => setIsCartOpen((p) => !p);

  const filteredProducts = PRODUCTS.filter((p) => {
    const categoryOk =
      checkedCategories.length === 0 || checkedCategories.includes(p.category);
    const dietaryOk =
      checkedDietaries.length === 0 ||
      p.dietary.some((d) => checkedDietaries.includes(d));
    return categoryOk && dietaryOk;
  });

  const toggleValue = (value, set) => {
    set((prev) =>
      prev.includes(value) ?
        prev.filter((el) => el !== value)
      : [...prev, value]
    );
  };

  const handleFilterByDietary = (d) => toggleValue(d, setCheckedDietaries);
  const handleFilterByCategory = (d) => toggleValue(d, setCheckedCategories);

  const handleAddToCart = (product) => {
    product = { ...product, quantity: 1 };
    setCartItems((prev) => [...prev, product]);
  };

  const hanldeChangeQuantity = (id, op) => {
    const index = cartItems.findIndex((el) => el.id === id);
    const product = cartItems[index];
    if (op === 1 && product.quantity === product.quantityInStock) return;
    product.quantity += op;
    const items = [...cartItems];
    if (product.quantity === 0) items.splice(index, 1);
    else items[index] = product;
    setCartItems(items);
  };

  const handleDeleteItem = (id) =>
    setCartItems((prev) => prev.filter((el) => el.id !== id));

  const handleClearCart = () => setCartItems([]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onToggleCart={hanldeToggleCart} />
      <main className="container mx-auto flex gap-8 mt-10">
        <SideBar
          checkedDietaries={checkedDietaries}
          checkedCategories={checkedCategories}
          onFilterByCategory={handleFilterByCategory}
          onFilterByDietary={handleFilterByDietary}
        />
        <Content
          onDeleteItem={handleDeleteItem}
          onChangeQuantity={hanldeChangeQuantity}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          products={filteredProducts}
        />

        <Cart
          onClearCart={handleClearCart}
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
          onChangeQuantity={hanldeChangeQuantity}
          onDeleteItem={handleDeleteItem}
          cartItems={cartItems}
        />
      </main>
    </div>
  );
}
