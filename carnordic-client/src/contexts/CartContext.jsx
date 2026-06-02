import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null); // Skapar en kontext för varukorgen

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    //Hämtar varukorgen från localStorage
    const savedCart = localStorage.getItem("carnordic-cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });
  //När varukorgen ändras så sparas den i localStorage så att de finns kvar
  useEffect(() => {
    localStorage.setItem("carnordic-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  //Lägger till en produkt i varukorgen, ökar antal om den redan finns i varukorgen
  //Användas i ProductsPage och ProductDetail
  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  }

  //tar bort en produkt helt från varukorgen
  //Användas i CartPage
  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId),
    );
  }

  //ökar antal av en produkt i varukorgen
  //användas i CartPage på + knappen
  function increaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  //minskar antal av en produkt i varukorgen och tar bort om de bara finns en kvar
  //användas i CartPage på - knappen
  function decreaseQuantity(productId) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  //tömmer hela varukorgen
  //eventuellt inte användas
  function clearCart() {
    setCartItems([]);
  }
  //räknar ut totalpriset i varukorgen
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  //räknar antal produkter i varukorgen, vet inte om den ska användas
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

//Custom hook så man slipper skriva useContext(CartContext) och istället bara att använda useCart() i komponenter som behöver komma åt varukorgen
export function useCart() {
  return useContext(CartContext);
}
