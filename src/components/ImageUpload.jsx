import { useRef } from "react";


function ImageUpload({ imagePreview, setImagePreview }) {

    const fileInputRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if(!file) return ;

        //valid file type
        if(!file.type.startsWith("image/")){
            alert("Please Upload a valid image file");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);

    };

    const handleImageRemove = () => {
        setImagePreview(null);
        fileInputRef.current.value = "";
    };



    return (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Upload Your Image
            </h2>

            {!imagePreview ? (
                <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center">
                    <p className="text-gray-600 mb-4
                    ">
                        Choose an image to turn into a sliding puzzle
                    </p>

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        id="imageUpload"
                    />

                    <label htmlFor="imageUpload"
                        className="inline-block bg-orange-500 text-white px-6 rounded-xl cursor-pointer hover:bg-orange-600 transition"
                    >
                        Upload Image
                    </label>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full max-h-96 object-contain rounded-xl border mb-4"
                    />

                    <div>
                        <label
                            htmlFor="imageUpload"
                            className="bg-orange-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-orange-600 transition"
                        >
                            Change Image
                        </label>

                        <button
                        onClick={handleImageRemove}
                        className="ml-2 bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Remove
                        </button>
                    </div>

                    <input
                    type="file"
                    accept="image/*" 
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    id="imageUpload"
                    />
                </div>
            )

            }
        </div>
    );
}

export default ImageUpload;