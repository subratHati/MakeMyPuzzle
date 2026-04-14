import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import DifficultySelector from "../components/DifficultySelector";
import { useNavigate } from "react-router-dom";


function Home() {

    const [imagePreview, setImagePreview] = useState(null);
    const [gridSize, setGridSize] = useState(3);

    const navigate = useNavigate();

    const handleStartPuzzle = () => {
        if(!imagePreview){
         alert("Please upload an image first");
         return;
        }

        navigate("/play",{
            state: {
                imagePreview,
                gridSize,
            },
        });

    };

    return (
        <div className="min-h-[90vh] flex flex-col items-center px-4 py-10 bg-gray-100">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4 text-center">
                Image to sliding Puzzle
            </h1>

            <p className="text-gray-600 text-xl max-w-2xl mb-8">
                Upload your image, Choose puzzle difficulty and play your own custom sliding puzzle game.
            </p>

            <ImageUpload

            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
             />

             <DifficultySelector gridSize={gridSize} setGridSize={setGridSize} />

             <button
             onClick={handleStartPuzzle}
             className="mt-8 bg-orange-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-orange-600 transition"
             >
                Start Puzzle
                </button>
        </div>
    )
}

export default Home;