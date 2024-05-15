/* eslint-disable react/prop-types */
import { Footer } from "../footer";
import Header from "../header";
import CreatePublication from "../createPublication";
const Main = ({ children }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col w-full min-h-screen py-6 md:px-0 lg:px-4 px-4">
        <div className="flex md:hidden">
          <CreatePublication />
        </div>
        <div className="hidden md:flex md:fixed mt-6 ml-3">
          <Header />
        </div>
        {children}
      </div>
      <Footer />
    </section>
  );
};

export default Main;
