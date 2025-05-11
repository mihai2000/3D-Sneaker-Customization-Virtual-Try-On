import { createContext } from "react";
import { CartItem } from "../providers/CartProvider";


export interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void; 
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);
