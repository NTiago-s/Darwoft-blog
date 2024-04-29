// eslint-disable-next-line react/prop-types
export default function Button({ txt, handleUserDash, ariaLabel }) {
  return (
    <button
      onClick={handleUserDash}
      aria-label={ariaLabel}
      className="relative h-12 w-32 sm:w-40 overflow-hidden border border-colorSecondary text-colorSecondary shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-colorSecondary before:duration-300 before:ease-out hover:text-white hover:shadow-colorSecondary hover:before:h-40 hover:before:w-40 hover:before:opacity-80 rounded"
    >
      <span className="relative z-10">{txt}</span>
    </button>
  );
}
