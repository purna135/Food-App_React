import Modal from "./UI/Modal.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formating";

export default function Cart() {
  const cartCtx = useContext(CartContext);

  const cartTotal = cartCtx.items.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  return (
    <Modal calssName="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p></p>
    </Modal>
  );
}
