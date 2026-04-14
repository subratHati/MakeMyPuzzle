function generateTiles(gridSize){
    const totalTiles = gridSize * gridSize;
    const tiles = [];

    for(let i = 0; i < totalTiles; i++){
        tiles.push({
            id: i,
            correctIndex: i,
            currentIndex: i,
            isEmpty: i === totalTiles -1,
        });
    }

    return tiles;
}

export default generateTiles; 