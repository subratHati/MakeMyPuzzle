
function DifficultySelector({ gridSize, setGridSize }) {

    const difficultyOptions = [
        {label: "Easy", value: 3},
        {label: "Medium", value: 4},
        {label: "Hard", value: 5},
    ];

    return(
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Select Difficulty
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
                {difficultyOptions.map((option) => (
                    <button
                    key={option.value}
                    onClick={() => setGridSize(option.value)}
                    className={`px-6 py-3 rounded-xl font-medium transition ${
                        gridSize === option.value
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    >
                        {option.label} ({option.value} x {option.value})

                    </button>
                ))}
            </div>
        </div>
    )
}

export default DifficultySelector;