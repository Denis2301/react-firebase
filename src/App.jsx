import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { Auth } from "./components/Auth/Auth";
import { store, auth, storage } from "./config/firebase";
import { Movie } from "./components/Movie/Movie";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

function Test() {
    const [movieList, setMoviesList] = useState([]);
    const [movieTitle, setMoviesTitle] = useState("");
    const [movieReleaseDate, setMoviesReleaseDate] = useState(0);
    const [movieFees, setMoviesFess] = useState(0);
    const [movieAnOscar, setMoviesAnOscar] = useState(false);
    const getListMovies = async () => {
        try {
            const data = await getDocs(collection(store, "movies"));
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMoviesList(filteredData);
        } catch (error) {
            console.error(error.message);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let newFilm = {
                title: movieTitle,
                releaseDate: movieReleaseDate,
                fees: movieFees,
                receivedAnOscar: movieAnOscar,
                userId: auth?.currentUser?.uid,
            };
            await addDoc(collection(store, "movies"), newFilm);
            setMoviesTitle("");
            setMoviesReleaseDate(0);
            setMoviesFess(0);
            setMoviesAnOscar(false);
            getListMovies();
        } catch (error) {
            console.error(error.message);
        }
    };
    const deleteMovie = async (id) => {
        try {
            await deleteDoc(doc(store, "movies", id));
            getListMovies();
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getListMovies();
    }, []);
    return (
        <div className="Auth">
            <Auth getListMovies={getListMovies} />
            <form
                onSubmit={onSubmit}
                style={{
                    margin: "50px auto 10px auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <input
                    onChange={(e) => setMoviesTitle(e.target.value)}
                    placeholder="Movie title..."
                    type="text"
                />
                <input
                    onChange={(e) => setMoviesReleaseDate(+e.target.value)}
                    placeholder="Release date..."
                    type="number"
                />
                <input
                    onChange={(e) => setMoviesFess(+e.target.value)}
                    placeholder="Fees..."
                    type="number"
                />
                <div style={{ display: "inline" }}>
                    <label htmlFor="true">Received an Oscar</label>
                    <input
                        type="checkbox"
                        checked={movieAnOscar}
                        onChange={(e) => setMoviesAnOscar(e.target.checked)}
                    />
                </div>
                <button type="submit">Add Movie</button>
            </form>
            <div style={{ margin: "0 auto" }}>
                {movieList.map((movie, index) => {
                    return (
                        <Movie
                            index={index}
                            movie={movie}
                            deleteMovie={deleteMovie}

                            getListMovies={getListMovies}
                            store={store}
                        />
                    );
                })}
            </div>
        </div>
    );
}
export default Test;

// const Block1 = () => {
//     const DIVA = styled.div`
//         width: 150px;
//         height: 150px;
//         background-color: yellow;
//         border: 2px solid black;
//     `;
//     const DIVB = styled(DIVA)`
//         background-color: green;
//         border: 3px solid red;
//     `;
// 	const Сontainer = styled.div``;
//     return (
//         <Сontainer>
//             {" "}
//             <DIVA></DIVA>
//             <DIVB></DIVB>
//             <DIVA></DIVA>
//         </Сontainer>
//     );

// };

// const Block = () => {
//     const Container = styled.div`
//         width: 150px;
//         display: flex;
//         flex-direction: column;
//     `;
//     const Button = styled.input`
//         background-color: orange;
//         margin: 5px;
//         font-size: 18px;
//     `;
//     const MdButton = styled(Button)`
//         color: white;
//         background-color: green;
//     `;
//     return (
//         <Container>
//             <Button value={"text"}></Button>
//             <MdButton value={"text"}></MdButton>
//         </Container>
//     );
// };
// export default Block1;
