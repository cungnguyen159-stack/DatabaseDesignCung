# DatabaseDesignCung

## API Endpoints

### GET

/.netlify/functions/get-items  
/.netlify/functions/get-item-by-id?id=1  
/.netlify/functions/search-items?q=action

### POST

/.netlify/functions/create-item  
Body:
{
"title": "Forrest Gump",
"director": "Robert Zemeckis",
"release_year": 1994,
"available": true,
"genre": "Drama",
"rating": "PG"
}

### PUT

/.netlify/functions/update-item
Body:
{
"movie_id": 2,
"title": "The Matrix",
"director": "Lana Wachowski"
}

### DELETE

/.netlify/functions/delete-item?id=3

Live Netlify URL

https://mellow-druid-82aab0.netlify.app/
