# NFL-Rushing

We have sets of records representing football players' rushing statistics. All records have the following attributes:

*  `Player` (Player's name)
*  `Team` (Player's team abbreviation)
*  `Pos` (Player's postion)
*  `Att/G` (Rushing Attempts Per Game Average)
*  `Att` (Rushing Attempts)
*  `Yds` (Total Rushing Yards)
*  `Avg` (Rushing Average Yards Per Attempt)
*  `Yds/G` (Rushing Yards Per Game)
*  `TD` (Total Rushing Touchdowns)
*  `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
*  `1st` (Rushing First Downs)
*  `1st%` (Rushing First Down Percentage)
*  `20+` (Rushing 20+ Yards Each)
*  `40+` (Rushing 40+ Yards Each)
*  `FUM` (Rushing Fumbles)

## Install on Docker

#### Build and run Docker container

From root directory run:

```
docker-compose build
docker-compose up
```

## Install locally

You can run the project locally without docker by running the following commands:

#### Install Front-end

```
cd client
npm install
npm run start
```

#### Install Back-end

```
cd server
npm install
npm run dev
```

#### Seed Database

Seeding is done with the help of the [mongoose-seed](https://github.com/seanemmer/mongoose-seed) library. Seeding on docker is ran automatically on startup.

Locally you will have to run the seed command:

```
npm run seed
```  

#### Running Tests

Testing is done with [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chai).

```
npm run test
```
## Open on browser

React app is running on ```http://localhost:3000/```

## API endpoints

Server running on ```http://localhost:8000/```

#### GET all players

Returns all players in the database.

```/api/players/all```

#### GET players

Queries are optional with a default page number set to 1.

Returns the first 20 players

```/api/players?```

Returns all players in the database that corresponds to the specific query.

```/api/players?page={page_number}&search={search_query}&sort={sort_by}```

#### Download to CSV with filters

Converting JSON to CSV is done through the [json2csv](https://github.com/zemirco/json2csv) library.

Download all players that corresponds to the specific query

```/api/download?search={player_name}&sort={sort_by}```

## Explanation

#### Pagination

Pagination improves performance by dividing the data into manageable sizes. For this project, pagination is done server side and I've set the number of items per page to 20.

#### Server side pagination/sorting/filtering

All data manipulation is handled server-side to reduce the load on the client's devices and improves performance by allowing the server do all the sorting and filtering. 

#### Seeding data

Seeding data into the database is handled by the seed.js file. Running the `npm run seed` command clears the database and then repopulates the database with the data from rushing.json.

## Built with
* React
* Redux
* Node
* Express
* MongoDB