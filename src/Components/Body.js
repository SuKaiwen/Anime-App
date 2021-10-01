import React, {useState} from 'react';

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
    
    return (
        <div>
            <button onClick={getResponse}>Get Anime</button>
            <h1>{anime.id}</h1>
        </div>
    );
}

export default Body;