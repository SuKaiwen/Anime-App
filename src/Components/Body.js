import React, {useState, useEffect} from 'react';

function Body(props) {

    const [anime, setAnime] = useState([]);

    var query = `
    query ($id: Int) { # Define which variables will be used in the query (id)
    Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        id
        title {
        romaji
        english
        native
        }
        genres
        type
        format
        description
        startDate {
            year
            month
            day
        }
        endDate {
            year
            month
            day
        }
        season
        seasonYear
        episodes
        duration
        coverImage {
            extraLarge
            large
            medium
            color
        }
        bannerImage
        averageScore
        meanScore
        popularity
        trending
        tags {
            id
            name
            description
            category
            rank
        }
        nextAiringEpisode {
            id
            airingAt
            timeUntilAiring
            episode
        }
        trailer {
            id
            site
            thumbnail
        }
        siteUrl
        rankings{
            rank
        }
    }
    }
    `;

    // Define our query variables and values that will be used in the query request
    var variables = {
        id: 16498
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    // Make the HTTP Api request
    function getResponse(){
        fetch(url, options).then(handleResponse)
                    .then(handleData)
                    .catch(handleError);
    }
    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        console.log(data);
        setAnime(data.data.Media);
    }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }

    useEffect(() => {
        getResponse()
    }, [])
    
    return (
        anime.length !== 0 ? (
            <>
            <div className="content">
                <img className="banner-image" src={anime.bannerImage} alt = "" />
                <div className="card-body">
                    <div className="card-head">
                        <h1 className="card-title">{anime.title.romaji} ({anime.format})</h1>
                        <h1 className="card-title badge badge-success">{anime.averageScore}/100</h1>
                    </div>
                    <div class ="row">
                        <div className="col-sm-5 col-md-3 center">
                            <img className="card-image" src={anime.coverImage.large} alt="" />
                        </div>
                        <div className="col-sm-7 col-md-9">
                            <div class="video_wrapper">
                                <iframe
                                    src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded youtube"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content content-color">
                <div className="card-body">
                    <div className ="row">
                        <div className="col-sm-3">
                            <h1 className="card-subtitle">Aired on</h1>
                            <p>{anime.startDate.day} {anime.startDate.month} {anime.startDate.year}</p>
                        </div>
                        <div className="col-sm-3">
                            <h1 className="card-subtitle">Finished on</h1>
                            <p>{anime.endDate.day} {anime.endDate.month} {anime.endDate.year}</p>
                        </div>
                        <div className="col-sm-3">
                            <h1 className="card-subtitle">Episodes</h1>
                            <p>{anime.episodes}</p>
                        </div>
                        <div className="col-sm-3">
                            <h1 className="card-subtitle">Duration</h1>
                            <p>{anime.duration} minutes</p>
                        </div>
                    </div>
                    <div className ="row">
                        <div className="col-sm-5 col-md-3">
                            <h1>Genres</h1>
                            {anime.genres.map((genre) => {
                                return (
                                    <p className="badge badge-danger genre-tag">{genre}</p>
                                )
                            })}
                        </div>
                        <div className="col-sm-7 col-md-9">
                            <h1>Description</h1>
                            {anime.description.replace(/<br>$/, '')}
                        </div>
                    </div>
                    <div className ="row">
                        <div className="col-sm-5 col-md-3">
                            
                        </div>
                        <div className="col-sm-7 col-md-9">
                            <h1>Trailer</h1>
                            <div class="video_wrapper">
                                <iframe
                                    src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded youtube"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    
            </>
        ): (
            <div>
                <h1>No anime selected</h1>
                <button onClick={getResponse}>Get Anime</button>
            </div>
        )
        
    );
}

export default Body;