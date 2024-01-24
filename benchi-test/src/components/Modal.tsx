import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectIsModalOpen, setIsModalOpen } from "../redux/movieSlice";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsModalOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
      <div className="relative z-10 bg-white rounded-lg max-w-md max-h-fit p-6 flex flex-col items-center">
        <div className="w-full text-center">{children}</div>
        <button
          onClick={() => dispatch(setIsModalOpen(false))}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
