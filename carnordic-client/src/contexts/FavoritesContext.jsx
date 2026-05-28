import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  //Lägger till en produkt i favoriterna, gör inget om den redan finns där
  function addToFavorites(product) {
    setFavorites((prevFavorites) => {
      const alreadyFavorite = prevFavorites.find(
        (favorite) => favorite.id === product.id,
      );

      if (alreadyFavorite) {
        return prevFavorites;
      }

      return [...prevFavorites, product];
    });
  }
  //Tar bort en produkt från favoriterna
  function removeFromFavorites(productId) {
    setFavorites(
      (prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== productId), //tar bort produkten med det id:t
    );
  }

  //Lägger till eller tar bort en produkt från favoriterna beroende på om den redan finns där eller inte
  function toggleFavorite(product) {
    const alreadyFavorite = favorites.find(
      (favorite) => favorite.id === product.id,
    );

    if (alreadyFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }

  //Kollar om en produkt finns i favoriterna
  function isFavorite(productId) {
    const favorite = favorites.find((favorite) => favorite.id === productId);
    if (favorite) {
      return true;
    } else {
      return false;
    }
  }

  //Antal produkter i favoriterna
  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
