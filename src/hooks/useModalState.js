import { useState, useCallback } from "react";

export const useModalState = (initialData = null) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initialData);
  
  const openModal = useCallback((newData = null) => {
    setData(newData);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setData(null);
    setIsOpen(false);
  }, []);

  return {
    data,
    isOpen,
    setData,
    openModal,
    setIsOpen,
    closeModal,
  };
};
