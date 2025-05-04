import  { createContext, useContext, useReducer, ReactNode } from 'react';

// interface CartItem {
//   name: string;
//   modelFile: string;
//   colors: Record<string, string>;
//   textures: Record<string, string>;
// }
interface CartItem {
  name: string;
  modelFile: string;
  color: string;
  texture: string;
}



interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  cart: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
}>({
  cart: { items: [] },
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((_, idx) => idx !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (index: number) => dispatch({ type: 'REMOVE_ITEM', payload: index });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
