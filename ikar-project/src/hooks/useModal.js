import { useState } from "react";

export function useModal() {
  const [modalActive, setModalActive] = useState(false);

  const modalClose = () => {
    setModalActive(false);
  }

  const modalActivate = () => {
    setModalActive(true);
  }

  return {
    modalActive,
    modalClose,
    modalActivate
  };
}