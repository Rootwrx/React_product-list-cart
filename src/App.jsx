import { useState } from "react";
import { CATEGORIES, DIETARIES, PRODUCTS } from "./assets/data";
import { SideBar } from "./SideBar";
import { Header } from "./Header";
import { Products } from "./Products";
import Cart from "./Cart";
import { FilterSection } from "./FilterSection";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState({
    categories: [],
    dietaries: [],
  });

  const hanldeToggleCart = () => setIsCartOpen((p) => !p);

  const filteredProducts = PRODUCTS.filter((p) => {
  
    const categoryOk  =  checkedFilters.categories.length ===0|| checkedFilters.categories.includes(p.category)

    const dietaryOk =   checkedFilters.dietaries.length===0||checkedFilters.dietaries.some(dietary=>p.dietary.includes(dietary))
    return categoryOk && dietaryOk ;
  });



  const handleAddToCart = (product) =>
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);

  const hanldeChangeQuantity = (id, q) => {
    const index = cartItems.findIndex((el) => el.id === id);
    const product = cartItems[index];
    if (q === 1 && product.quantity === product.quantityInStock) return;
    product.quantity += q;
    const items = [...cartItems];
    if (product.quantity === 0) items.splice(index, 1);
    else items[index] = product;
    setCartItems(items);
  };

  const handleDeleteItem = (id) =>
    setCartItems((prev) => prev.filter((el) => el.id !== id));

  const handleClearCart = () => setCartItems([]);

    const handleFilter = (type,v) => {
      setCheckedFilters(filters=> {
        const existe = checkedFilters[type].includes(v) ;
        const newFilters= { 
            ...filters,
            [type]:existe ? filters[type].filter(el=>el !==v): [...filters[type] , v]
      
          }
          console.log(newFilters)
          return newFilters ;
      })

  };
  return (
    <div className="min-h-screen bg-gray-50">

      <Header onToggleCart={hanldeToggleCart} />

      <main className="container mx-auto flex gap-8 mt-10">


        <SideBar>
          <FilterSection
          title="Categories"
          options={CATEGORIES}
          checked={checkedFilters.categories}
          onChange={(v) => handleFilter("categories",v)}
          />
          <FilterSection
            title="Dietaries"
            options={DIETARIES}
            checked={checkedFilters.dietaries}
            onChange={(v) => handleFilter("dietaries",v)}
          />
        </SideBar>



        <Products
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
