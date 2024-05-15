/* eslint-disable react/prop-types */
import FormUserEdit from "../form/formUserEdit";
import { CloseIcon } from "../icons/icons";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-fit overflow-y-scroll h-screen items-center justify-center bg-gray-900 z-30">
      <div className="flex flex-col gap-2 bg-primary-blue-60 rounded-lg items-center relative">
        <div className="flex flex-col">
          <button
            className="p-2 rounded-full text-black bg-red bg-red-500 absolute top-2 right-2"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex justify-center w-full text-center my-6">
          <h4 className="text-white font-extrabold text-2xl underline">
            Editá tus datos
          </h4>
        </div>
        <div className="px-6">
          <FormUserEdit />
        </div>
      </div>
    </div>
  );
};

export default Modal;
