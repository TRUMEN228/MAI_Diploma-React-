import { useState } from "react";

export function useModal() {
  const [modalActive, setModalActive] = useState(false);
  const [content, setContent] = useState();

  const modalClose = () => {
    setModalActive(false);
  }

  const modalActivate = (content) => {
    setModalActive(true);
    setContent(content);
  }

  return {
    modalActive,
    content,
    modalClose,
    modalActivate
  };
}