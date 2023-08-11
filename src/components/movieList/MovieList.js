import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/Card"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()  // useParams ka use ham har ek movie ki :id nikalne ke liye kia hai jo ki app.js me routes me path dia hai sabhi movie ki id api se mili hai

            // maine type name ka variable banaya hai jisme user click krega to api se fetch hoke get data ko call krega aur get data me hamne sab kuch store kar ke rakh dia hai.... movie type show kar dega.... 
  
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {                       // yaha maine ternary operator ka use karke condition di hai ki agar user jo type me click krta hai (popular me to popular dikhao...top-rated me to top rated dikhao)..usko dikhaao vrna by default "popular" ke hi data ko dikha do
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())    // api se milne waale data ko maine json me convert kar dia
        .then(data => setMovieList(data.results))  // aur response ko setMovieList state me store kar dia 
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList;