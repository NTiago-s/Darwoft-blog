export const Footer = () => {
  return (
    <footer className="bg-white  shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex sm:items-center justify-end">
          <ul className="flex flex-wrap items-center mb-2 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="https://navarrotiago.vercel.app"
                className="hover:underline me-4 md:me-6"
                target="_blank"
                rel="noreferrer"
              >
                Sobre mi
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/tiago-navarro-30bba2291/"
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
