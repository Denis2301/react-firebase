import React, { useEffect, useState } from "react";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const Movie = ({ index, movie, deleteMovie, getListMovies, store }) => {
    const [file, setFile] = useState(null);
    const [newTitleMovie, setNewTitleMovie] = useState("");
    const [urlFile, setUrlFile] = useState(null);
    const changeTitleMovie = async (id) => {
        try {
            if (newTitleMovie) {
                await updateDoc(doc(store, "movies", id), {
                    title: newTitleMovie,
                });
                getListMovies();
            }
            return;
        } catch (error) {
            console.error(error.message);
        }
    };
	
    const uploadFile = async () => {
        try {
            if (file) {
				const Ref = `projectFiles/${Date.now()}_${file.name}`;
                await uploadBytes(
                    ref(storage, Ref),
                    file
                );
                let url = await getDownloadURL(
                    ref(storage, Ref)
                );
                setUrlFile(url);
                console.log(url);
            }

            return;
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div style={{ display: "flex" }}>
            <div>
                <h2
                    style={{
                        color: movie.receivedAnOscar ? "green" : "red",
                    }}
                >
                    {movie.title}
                </h2>
                <h3>{movie.fees}</h3>
                <h3>Oscar: {movie.receivedAnOscar ? "Yes" : "No"}</h3>
                <h3>Date: {movie.releaseDate}</h3>
            </div>
            <button
                style={{
                    alignSelf: "center",
                    backgroundColor: "red",
                    border: "none",
                    color: "white",
                    padding: "10px",
                    cursor: "pointer",
                }}
                onClick={() => deleteMovie(movie.id)}
            >
                Delete Movie
            </button>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                }}
            >
                <input
                    onChange={(e) => setNewTitleMovie(e.target.value)}
                    placeholder="new movie title..."
                    style={{
                        height: "30px",
                        alignSelf: "center",
                    }}
                />
                <button
                    onClick={() => changeTitleMovie(movie.id)}
                    style={{
                        height: "30px",
                        alignSelf: "center",
                    }}
                >
                    Update Movie Title
                </button>
                <div className="file" style={{ margin: "20px" }}>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button onClick={uploadFile} type="submit">
                        Upload File
                    </button>
                    <a href={urlFile} target="_blank"  >
                        {urlFile}
                    </a>
                </div>
            </div>
        </div>
    );
};
