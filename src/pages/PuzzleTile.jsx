function PuzzleTile({ tile, imagePreview, gridSize, onClick }){

    if(!tile) return null;

    if(tile.isEmpty){
        return (
            <div className="aspect-square bg-gray-200 rounded-md border border-gray-300"></div>
        );
    }

     const row = Math.floor(tile.correctIndex / gridSize);
     const col = tile.correctIndex % gridSize;

    return(

        <div
        
        className="aspect-square rounded-md border border-gray-300 bg-cover bg-no-repeat cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 "
        style={{
            backgroundImage: `url(${imagePreview})`,
            backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
            backgroundPosition: `${(col / (gridSize -1)) * 100}% ${
                (row / (gridSize-1)) * 100
            }%`
        }}
        onClick={() => {
            console.log("Tile clicked", tile);
            onClick();
        }}
        >

        </div>
    )
}

export default PuzzleTile;