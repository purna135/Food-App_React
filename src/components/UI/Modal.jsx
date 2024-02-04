import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ childern, open, calssName = "" }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {childern}
    </dialog>,
    document.getElementById("modal")
  );
}
