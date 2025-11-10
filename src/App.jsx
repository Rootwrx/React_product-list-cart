import { useState } from "react";
import { FILTERS, PRODUCTS, toggleCheckBox } from "./assets/data";
import { SideBar } from "./SideBar";
import { Header } from "./Header";
import { Content } from "./Content";
import Cart from "./Cart";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState({
    [FILTERS.CATEGORIES]: [],
    [FILTERS.DIETARIES]: [],
  });

  const hanldeToggleCart = () => setIsCartOpen((p) => !p);

  const filteredProducts = PRODUCTS.filter((p) => {
    const categoryOk =
      checkedFilters[FILTERS.CATEGORIES].length === 0 ||
      checkedFilters[FILTERS.CATEGORIES].includes(p.category);
    const dietaryOk =
      checkedFilters[FILTERS.DIETARIES].length === 0 ||
      p.dietary.some((d) => checkedFilters[FILTERS.DIETARIES].includes(d));
    return categoryOk && dietaryOk;
  });

  const handleFilter = (type, value) => {
    toggleCheckBox(FILTERS[type], value, setCheckedFilters);
  };

  const handleAddToCart = (product) =>
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);

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
        <SideBar checkedFilters={checkedFilters} onFilter={handleFilter} />
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
