import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { CharacterProvider } from "./context/CharacterContext";

function App() {
  return (
    <>
      <CharacterProvider>
        <Navbar />
        <Home />
      </CharacterProvider>
    </>
  );
}

export default App;
