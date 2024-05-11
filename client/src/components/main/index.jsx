/* eslint-disable react/prop-types */
import Header from "../header";
const Main = ({ children }) => {
  return (
    <section className="flex justify-evenly h-screen w-screen py-6 px-10">
      <Header />
      {children}
    </section>
  );
};

export default Main;
