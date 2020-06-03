import React, { Component, useEffect, useState } from 'react';
import './favorite.css';
import Axios from 'axios';
import {Popover} from 'antd';
import { IMAGE_URL } from '../../Config';

function FavoritePage() {

    const [FavoritedMovies, setFavoritedMovies] = useState([])
    const variable = { userFrom: localStorage.getItem('userId') }
    useEffect(() => {
        fetchFavoriteMovie();
    }, [])


    const fetchFavoriteMovie = ()=>{
        Axios.post('/api/favorite/getFavoritedMovie', variable)
            .then(res => {
                if (res.data.success) {
                    setFavoritedMovies(res.data.favorites)
                } else {
                    alert('failed to get favorites list')
                }
            })
    }
    const onClickRemove = (movieId)=>{

        const variables = {
            userFrom:localStorage.getItem('userId'),
            movieId: movieId
        }
        Axios.post('/api/favorite/removeFromFavorite',variables)
        .then(res=>{
            if(res.data.success){
              fetchFavoriteMovie();
            }else{
                alert('failed to remove favorites')
            }
        })
    }

    const renderTableBody = FavoritedMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.moviePost ?
                <img src={`${IMAGE_URL}w500${movie.moviePost}`} alt="moviePost"/>
                :
                "no image"    
            }
            </div>
        )

        return <tr>
            <Popover content={content} title={movie.movieTitle}>
            <td>{movie.movieTitle}</td>
            </Popover>
          
            <td>{movie.movieRunTime} Mins</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove</button></td>
        </tr>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h3>Favorite Movies By Me</h3>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove From Favorite</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage;