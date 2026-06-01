import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "./AuthContext";
//skapar en context
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  //om användaren är inloggad eller inte
  const { authed } = useAuth();
  //kollar på localStorage för att se om det finns några sparade favoriter, annars startar med en tom array
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("carnordic-favorites");
    return saved ? JSON.parse(saved) : [];
  });
  //körs när authed ändras, alltså när användaren loggar in eller ut
  useEffect(() => {
    async function loadFavorites() {
      //hämta från backend om användaren är inloggad
      if (authed) {
        try {
          const data = await api.getFavorites();
          setFavorites(data);
        } catch (error) {
          //tom
          setFavorites([]);
        }
      } else {
        const saved = localStorage.getItem("carnordic-favorites");
        setFavorites(saved ? JSON.parse(saved) : []);
      }
    }

    loadFavorites();
  }, [authed]);

  async function toggleFavorite(product) {
    const productId = product._id;
    //kollar om produkten redan är favorit
    const alreadyFavorite = favorites.some(
      (favorite) => favorite._id === productId,
    );

    if (authed) {
      try {
        if (alreadyFavorite) {
          //om det redan är favorit, ta bort den
          const updatedFavorites = await api.removeFavorite(productId);
          setFavorites(updatedFavorites);
        } else {
          //om det inte är favorit, lägg till den
          const updatedFavorites = await api.addFavorite(productId);
          //uppdaterar listan
          setFavorites(updatedFavorites);
        }
      } catch (error) {
        console.log("Kunde inte uppdatera favoriter:", error);
      }
    } else {
      //om ingen är inloggad, hanteras favoriter i localStorage
      let updatedFavorites;

      if (alreadyFavorite) {
        //ta bort produkten från favoritlistan
        updatedFavorites = favorites.filter(
          (favorite) => favorite._id !== productId,
        );
      } else {
        //lägg till produkten i favoritlistan
        updatedFavorites = [...favorites, product];
      }
      //uppdatera
      setFavorites(updatedFavorites);
      //sparar i localStorage
      localStorage.setItem(
        "carnordic-favorites",
        JSON.stringify(updatedFavorites),
      );
    }
  }
  //kolla om produkten är favorit eller inte, används för att visa rätt ikon i produktlistan
  function isFavorite(productId) {
    return favorites.some((favorite) => favorite._id === productId);
  }
  //antal
  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
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
