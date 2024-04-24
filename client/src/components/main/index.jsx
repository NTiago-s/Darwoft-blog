/* eslint-disable react/prop-types */
import Header from "../header";
import SearchBar from "../searchBar";
const Main = ({ children }) => {
  return (
    <section className="flex justify-between h-screen w-screen py-6 px-10">
      <Header />
      {children}
      <SearchBar />
    </section>
  );
};

export default Main;
