import {Routes, Route, Router} from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import PlayPuzzle from "./pages/PlayPuzzle";
import PuzzleTile from "./pages/PuzzleTile";

function App() {

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={ <PlayPuzzle />} />
        <Route path="/puzzleTile" element={ <PuzzleTile />} />
      </Routes>


    </div>
  )
}

export default App
