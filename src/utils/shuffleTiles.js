function shuffleTiles (initialTiles, gridSize, moves=100) {

    let tiles = [...initialTiles];


    const getNeighbours = (emptyIndex) => {

        const neighbours = [];

        const row = Math.floor(emptyIndex / gridSize);
        const col = emptyIndex % gridSize;

        if(row > 0) neighbours.push(emptyIndex - gridSize); //up 
        if(row < gridSize-1) neighbours.push(emptyIndex + gridSize); //down
        if(col > 0) neighbours.push(emptyIndex -1); //left 
        if(col < gridSize -1 ) neighbours.push(emptyIndex +1); //right

        return neighbours;
    }

    for(let i = 0; i<moves; i++){
        const emptyTile = tiles.find((t) => t.isEmpty);
        const emptyIndex = emptyTile.currentIndex;

        const neighbours = getNeighbours(emptyIndex);

        const randomNeighbourIndex = neighbours[Math.floor(Math.random() * neighbours.length)];

        //Now swap the empty tile with neighbour tile (because it is a valid move)

        const tileToSwap = tiles.find((t) => t.currentIndex === randomNeighbourIndex);
        
       tiles = tiles.map((tile) => {
            if(tile.isEmpty){
                return {...tile, currentIndex:tileToSwap.currentIndex};
            }

            if(tile.id === tileToSwap.id){
                return {...tile, currentIndex:emptyIndex};
            }

            return tile;
        });
    }

    return tiles;

}

export default shuffleTiles;