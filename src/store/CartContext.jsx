import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const newItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      newItems[existingItemIndex] = updatedItem;
    } else {
      newItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: newItems };
  }

  if (item.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingItemIndex];
    if (existingItem.quantity === 1) {
      const newItems = [...state.items];
      newItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      newItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: newItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const cartContext = {
    item: cart.items,
    addItem: (item) => dispatchCartAction({ type: "ADD_ITEM", item: item }),
    removeItem: (id) => dispatchCartAction({ type: "REMOVE_ITEM", id: id }),
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
