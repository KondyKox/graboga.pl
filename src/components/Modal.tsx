import { ReactNode } from "react";

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
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="gradient-bg rounded-lg p-16 w-96 shadow-lg flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Modal;
