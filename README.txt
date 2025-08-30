ANCC BASKETBALL DATABASE 
A database design, administration, and management project that allows for the viewing and management of data concerning the basketball league hosted by All Nations Community Church. 

PURPOSE: 
Every year, our church hosts a basketball league/tournament, and each year, stats are recorded for each player and team by pen and paper. I saw this as a inconvenience that could be improved upon through the use of a database. This database allows for a better viewing experience for the players who want to see their stats per game, but also to see their overall progress throughout the season, and also a better data recording experience for the board members who keep records of each player and game. 


FEATURES: 
- View all current players for a specific year's season. 
- View all existing teams that players are designated to. 
- View all planned games that will be played throughout the season and the winner of each game if any. 
- View all player average stats or comprehensive stats per game. 
- Add a player to the roster. 
- Create a team. 
- Add a game onto the schedule.
- Edit the teams playing a scheduled game.
- Edit the winners of a game. 
- Create stats for each player during a game. 


TECH STACK:
- Languages: 
        - JavaScript
        - SQL (MySQL)
- Frontend:
        - React 
        - CSS
- Backend: 
        - Node.js
        - MySQL 


INSTALLATION: 
- Cloning the repo:
        - git clone https://github.com/joshnkim/ANCC-Basketball.git 
        - cd RTY 
- Frontend setup
        - cd ANC 
        - npm install 
        - npm run build
        - npm run preview 
- Backend setup 
        - cd Backend
        - node server.js 


USAGE: 
1. The "View Players" page will allow the user to view all current players in the league, as well as the team they are associated with. 

2. The "View Teams" page will allow the user to view all current teams in the league. 

3. The "View Games" page will allow the user to view all played or planned games during the season. 

4. The "View Stats" page will produce to the user two options, to view the stats of a specific player, searchable by typing their name or via a drop down, or to view the stats of each player for a specific game. The individual layer stats are displayed as averages throughout the season, while the stats for a specific game are shown as aggregate stats for each player for that game. 

5. The Create and Manage pages are accessible only by the basketball league board members for security reasons. 

6. The "Create a Player" page will allow the board member to add a player to the current season's roster. 

7. The "Create a Team" page will allow the board member to create a team for the current season. 

8. The "Manage Games" page will allow the board member to create a game for the current season's schedule and either update a who is playing a game or update the winner for a specific game. 

9. The "Create a Stat" page will allow the board member to log the stats of every player during a game. This page will include a count for the score of each team playing as well as a counter for fouls. 



SCREENSHOTS: 






