import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import generateTiles from "../utils/generateTiles";
import PuzzleBoard from "../components/PuzzleBoard";
import shuffleTiles from "../utils/shuffleTiles";
import WinModal from "../components/WinModal";

function PlayPuzzle() {

    const location = useLocation();
    const navigate = useNavigate();

    const { imagePreview, gridSize } = location.state || {};

    const [tiles, setTiles] = useState([]);
    const [moveCount, setMoveCount] = useState(0);
    const [time, setTime] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isSolved, setIsSolved] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //Generate and shuffle tile
    useEffect(() => {
        if (gridSize) {
            const generatedTiles = generateTiles(gridSize);
            const shuffledTiles = shuffleTiles(generatedTiles, gridSize, 100);

            console.log("Shuffled Tiles:", shuffledTiles); // DEBUG
            setTiles(shuffledTiles);
        }
    }, [gridSize]);

    //set timer
    useEffect(() => {
        if (!isGameStarted || isSolved) return;

        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isGameStarted, isSolved]);

    //win detection 
    useEffect(() => {
        if (tiles.length === 0) return;

        const isCorrect = tiles.every((tile) => {
            return tile.currentIndex === tile.correctIndex
        });

        if (isCorrect) {
            setIsSolved(true);
            setShowModal(true);
            updateBestScore();
        }
    }, [tiles]);

    //To save the best scorer
    // useEffect(() => {
    //     if (!isSolved || moveCount === 0) return;

       

    //     let best = null;

    //     try {
    //         const storedScore = localStorage.getItem("bestScore");
    //         best = storedScore ? JSON.parse(storedScore) : null;

    //     } catch (error) {
    //         console.error("Invalid bestScore in localStorage, resetting...");
    //         localStorage.removeItem("bestScore");
    //     }

    //     const currentScore = {
    //         moves: moveCount,
    //         time: time,
    //     };

    //     if (!best || moveCount < best.moves || (moveCount === best.moves && time < best.time)) {
    //         localStorage.setItem("bestScore", JSON.stringify(currentScore));
    //     }
    // }, [isSolved, moveCount, time]);

    const updateBestScore = () => {
         let best = null;

        try {
            const storedScore = localStorage.getItem("bestScore");
            best = storedScore ? JSON.parse(storedScore) : null;

        } catch (error) {
            console.error("Invalid bestScore in localStorage, resetting...");
            localStorage.removeItem("bestScore");
        }

        const currentScore = {
            moves: moveCount,
            time: time,
        };

        if (!best || moveCount < best.moves || (moveCount === best.moves && time < best.time)) {
            localStorage.setItem("bestScore", JSON.stringify(currentScore));
        }

    }

    const handleTileClick = (clickedTile) => {
        if (isSolved) return;

        const emptyTile = tiles.find((tile) => tile.isEmpty);

        const clickedIndex = clickedTile.currentIndex;
        const emptyIndex = emptyTile.currentIndex;

        const clickedRow = Math.floor(clickedIndex / gridSize);
        const clickedCol = clickedIndex % gridSize;

        const emptyRow = Math.floor(emptyIndex / gridSize);
        const emptyCol = emptyIndex % gridSize;

        const isAdjecent =
            (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
            (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow);

        if (!isAdjecent) return;

        //Swap tiles 
        const newTiles = tiles.map((tile) => {
            if (tile.id === clickedTile.id) {
                return { ...tile, currentIndex: emptyIndex };
            }
            if (tile.isEmpty) {
                return { ...tile, currentIndex: clickedIndex };
            }

            return tile;
        });
        setTiles(newTiles);
        setMoveCount((prev) => prev + 1);
        if (!isGameStarted) {
            setIsGameStarted(true);
        }

    }

    //Id user directly go to playPuzzle page 
    if (!imagePreview || !gridSize) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
                <h2 className="text-3xl font-bold text-red-500 mb-4">
                    No Puzzle data Found
                </h2>
                <p className="text-gray-600 mb-6">Please upload an image and start the puzzle from the home page</p>

                <button
                    onClick={() => navigate("/")}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                >
                    Go to Home
                </button>
            </div>
        );

    }

    return (
        <div className="min-h-[90vh] px-4 py-10 flex flex-col items-center bg-gray-100">
            <h2 className="text-4xl font-bold text-orange-500 mb-6">
                Sliding Puzzle
            </h2>

            <p className="text-gray-600 mb-6 text-center">
                Select Difficulty: {" "}
                <span className="text-orange-500 font-bold">
                    {gridSize} x {gridSize}
                </span>
            </p>

            <div className="flex gap-6 mb-4 text-lg font-medium justify-center">
                <p> Moves: {moveCount}</p>
                <p>Timer: {time}s</p>
            </div>

            <PuzzleBoard
                onTileClick={handleTileClick}
                tiles={tiles}
                imagePreview={imagePreview}
                gridSize={gridSize}
            />

            <button
                onClick={() => {
                    const generatedTiles = generateTiles(gridSize);
                    const shuffledTiles = shuffleTiles(generatedTiles, gridSize, 100);

                    setTiles(shuffledTiles);
                    setMoveCount(0);
                    setIsGameStarted(false);
                    setIsSolved(false);
                    setTime(0);

                }}

                className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
            >
                Restart
            </button>

            {/* if win show this modal */}
            <WinModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                moveCount={moveCount}
                time={time}
            />

            <button
                onClick={() => {
                    const solvedTiles = tiles.map((tile) => ({
                        ...tile,
                        currentIndex: tile.correctIndex,
                    }));

                    setTiles(solvedTiles);
                }}
                className="mt-3 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
                Solve Instantly (Test)
            </button>

        </div>
    )
}

export default PlayPuzzle;