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
                        <h1 className="card-title">{anime.title.romaji}</h1>
                        <h1 className="card-title">{anime.meanScore}/100</h1>
                    </div>
                    
                    <div class ="row">
                        <div className="col-sm-5 col-md-3 center">
                            <img className="card-image" src={anime.coverImage.large} alt="" />
                        </div>
                        <div className="col-sm-7 col-md-9">
                            <div className="card-top">
                                <p>Season: {anime.season} {anime.seasonYear}</p>
                                <p>Aired on: {anime.startDate.day}/{anime.startDate.month}/{anime.startDate.year}</p>
                                <p>Ended on: {anime.endDate.day}/{anime.endDate.month}/{anime.endDate.year}</p>
                                <p>Episode duration: {anime.duration} minutes</p>
                                <p>Number of Episodes: {anime.episodes}</p>
                                <div className="tag-box">
                                    {anime.tags.map((tag) => {
                                        return (
                                            <p className="badge badge-primary tag">{tag.name}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content content-color">
                <div className="card-body">
                    <div>
                        {anime.description.replace(/<br>$/, '')}
                    </div>
                    <div>
                        {anime.description.replace(/<br>$/, '')}
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