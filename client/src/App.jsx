import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
function App() {
  return (
    <main className="w-screen h-screen">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
