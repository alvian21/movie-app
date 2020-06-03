import React, { useEffect, useState } from 'react';
import MainImage from '../LandingPage/Sections/MainImage';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import { Descriptions, Button, Row } from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorite from './Sections/Favorite'

function MovieDetailPage(props) {
    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    useEffect(() => {
    
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setMovie(res)
                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
                        setCrews(res.cast)
                    })
            })
    }, [])

    const handleClick = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div style={{ width: '100%', margin: 0 }}>
            {Movie &&
                <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`} title={Movie.original_title} text={Movie.overview} />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                   <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie}/>
                </div>
            </div>
            {/* Movie intro table */}
            <Descriptions title="Movie Info" bordered>
                <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                <Descriptions.Item label="release_date">{Movie.release_date}</Descriptions.Item>
                <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
                <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
                <Descriptions.Item label="vote_average" span={2}>{Movie.vote_average}</Descriptions.Item>
                <Descriptions.Item label="vote_count" >{Movie.vote_count}</Descriptions.Item>
                <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
                <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleClick}>Togle Actor View</Button>
            </div>


            {/* Grid Cards for crew*/}
            {ActorToggle &&
                <Row gutter={[16, 16]}>
                    {Crews && Crews.map((crew, index) => (
                        <React.Fragment key={index}>
                            {crew.profile_path && <GridCard actor image={`${IMAGE_URL}w500${crew.profile_path}`} />}

                        </React.Fragment>
                    ))}
                </Row>
            }

        </div>
    )
}


export default MovieDetailPage