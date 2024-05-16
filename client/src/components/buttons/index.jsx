// eslint-disable-next-line react/prop-types
export default function Button({ txt, handleUserDash, ariaLabel, stile }) {
  return (
    <button
      onClick={handleUserDash}
      aria-label={ariaLabel}
      className={`${stile}relative h-12 w-32 sm:w-40  overflow-hidden border shadow-2xl transition duration-300 hover:text-white hover:bg-blue-800  rounded`}
    >
      <span className="relative z-10">{txt}</span>
    </button>
  );
}
