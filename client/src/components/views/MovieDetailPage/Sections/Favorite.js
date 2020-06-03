import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Descriptions, Button, Row } from 'antd';
function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }
    useEffect(() => {



        axios.post('/api/favorite/favoriteNumber', variable)
            .then(res => {
                if (res.data.success) {
                    setFavoriteNumber(res.data.FavoriteNumber)
                } else {
                    alert('Failed to get favoriteNumber')
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(res => {
                if (res.data.success) {
                    setFavorited(res.data.favorited)
                } else {
                    alert('Failed to get favorite info')
                }
            })
    }, [])

    const onClickFavorite = () => {
        if (Favorited) {
            //when already added

            axios.post('/api/favorite/removeFromFavorite',variable)
            .then(res=>{
                if(res.data.success){
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                }else{
                    alert('failed to remove favorites')
                }
            })
        } else {
            // when not adding yet

            axios.post('/api/favorite/addToFavorite',variable)
            .then(res=>{
                if(res.data.success){
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                }else{
                    alert('failed to add to favorites')
                }
            })
        }
    }

    return (
        <div>
            <button onClick={onClickFavorite} >{Favorited ? " remove from favorite " : " Add to favorite "} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite