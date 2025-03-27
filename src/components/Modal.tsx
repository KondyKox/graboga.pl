import { ReactNode } from "react";
import { FaXmark } from "react-icons/fa6";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 w-full bg-slate-900 bg-opacity-70 p-8">
      <div className="gradient-bg bg-gradient rounded-lg p-16 w-full lg:w-2/3 shadow-lg flex flex-col justify-center items-center relative">
        <button
          onClick={onClose}
          className="btn absolute top-4 right-4 border-none hover:bg-transparent"
        >
          <FaXmark className="w-8 h-8 font-bold text-primary hover:text-red-500 transition-colors duration-300 ease-in-out" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
