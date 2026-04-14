function Winmodal({ isOpen, onClose, moveCount, time}) {
    if(!isOpen) return null;

let bestScore = null;

try {
    const stored = localStorage.getItem("bestScore");
    bestScore = stored ? JSON.parse(stored) : null;
} catch (error) {
    console.error("Invalid bestScore in localStorage");
    localStorage.removeItem("bestScore");
}
    return(
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white shadow-xl rounded-2xl px-6 py-5 w-[320px] text-center border">
                <h2 className="text-2xl font-bold text-green-500 mb-2">
                    Puzzle Solved!
                </h2>

                <p className="text-gray-700 mb-3">
                    Your Score:
                </p>

                <p className="font-semibold">
                    Moves: {moveCount} | Time: {time}s
                </p>

                {
                    bestScore && (
                        <div>
                            <p>Best Score</p>
                            <p>
                                Moves: {bestScore.moves} | Time: {bestScore.time}
                            </p>
                        </div>
                    )
                }

                <button
                onClick={onClose}
                className="mt-5 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    Ok
                </button>
            </div>
        </div>
    )
}

export default Winmodal; 