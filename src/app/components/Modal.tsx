import React from "react";

interface ModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = ({ children, openModal, setOpenModal }: ModalProps) => {
  return (
    <>
      {openModal && (
        <div className="bg-black/50 fixed inset-0">
          <div className="flex justify-center items-center h-full">
            <div className=" relative flex flex-col items-center justify-center bg-blue-800 w-1/2 h-1/2 p-5 rounded-2xl">
              {children}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-5 text-2xl mb-3 hover:text-red-600 cursor-pointer"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
