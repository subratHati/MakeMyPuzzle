import PuzzleTile from "../pages/PuzzleTile";

function PuzzleBoard({ tiles, imagePreview, gridSize, onTileClick }){

    return(
        <div className="grid gap-1 w-full max-w-[500px] bg-white p-2 rounded-xl shadow-white"
        style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
        >
            {[...tiles]
            .sort((a, b) => a.currentIndex - b.currentIndex)
            .map((tile) => (
                <PuzzleTile 
                key={tile.id}
                tile={tile}
                imagePreview={imagePreview}
                gridSize={gridSize}
                onClick={() => onTileClick(tile)}
                />
            ))

            }

        </div>
    )
}

export default PuzzleBoard;