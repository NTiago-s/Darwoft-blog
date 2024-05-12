/* eslint-disable react/prop-types */
const InputField = ({ id, html, label, type, register, change }) => {
  return (
    <div>
      <label
        htmlFor={html}
        className="gap-2 flex flex-col text-white font-semibold text-xl"
      >
        {label}
        <input
          id={id}
          type={type}
          {...register}
          className="rounded-xl w-full px-2 text-black "
          onChange={change}
        />
      </label>
    </div>
  );
};

export default InputField;
