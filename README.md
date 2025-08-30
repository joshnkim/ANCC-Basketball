ANCC BASKETBALL DATABASE 

- A database design, administration, and management project that allows for the viewing and management of data concerning the basketball league hosted by All Nations Community Church. 

PURPOSE: 
- Every year, our church hosts a basketball league/tournament, and each year, stats are recorded for each player and team by pen and paper. I saw this as a inconvenience that could be improved upon through
  the use of a database. This database allows for a better viewing experience for the players who want to see their stats per game, but also to see their overall progress throughout the season, and also a
  better data recording experience for the board members who keep records of each player and game. 


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
- Pages that allow the managing of data within the database are locked by a username and password. Not accessible to the general public. 


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

8. The "Manage Games" page will allow the board member to create a game for the current season's schedule and allow for the designation of the game type (regular game, semi-final, final). The board member can also update a who is playing in a game or update the winner for a specific game.

9. The "Create a Stat" page will allow the board member to log the stats of every player during a game. This page will include a count for the score of each team playing as well as a counter for fouls. 



SCREENSHOTS: 

<img width="1144" height="752" alt="Screenshot 2025-08-29 at 7 21 50 PM" src="https://github.com/user-attachments/assets/737f4a7c-c68b-4b3d-a89b-755bf2d80111" />

<img width="1218" height="754" alt="Screenshot 2025-08-29 at 7 17 50 PM" src="https://github.com/user-attachments/assets/d9e5b085-eba0-494f-aabf-de7a5fa4684b" />

<img width="1440" height="754" alt="Screenshot 2025-08-29 at 7 10 46 PM" src="https://github.com/user-attachments/assets/2bcd6936-375a-479c-bdc5-74d545a0344b" />

<img width="1140" height="753" alt="Screenshot 2025-08-29 at 7 19 18 PM" src="https://github.com/user-attachments/assets/bf90dd44-9bde-4999-8260-f65987834c9c" />

<img width="1140" height="437" alt="Screenshot 2025-08-29 at 7 19 41 PM" src="https://github.com/user-attachments/assets/9a6c6394-5532-4a36-bbf4-9f518120c95f" />

<img width="1141" height="754" alt="Screenshot 2025-08-29 at 7 20 18 PM" src="https://github.com/user-attachments/assets/abb4f9c7-5737-446a-a7f2-2777ada1d96b" />

<img width="1142" height="753" alt="Screenshot 2025-08-29 at 7 20 45 PM" src="https://github.com/user-attachments/assets/569a284d-ee9b-4e2c-bc7c-e5b7a5f0a123" />

<img width="1142" height="753" alt="Screenshot 2025-08-29 at 7 21 03 PM" src="https://github.com/user-attachments/assets/7056142f-0a7d-40b3-b941-c6466b993820" />

<img width="1141" height="754" alt="Screenshot 2025-08-29 at 7 21 32 PM" src="https://github.com/user-attachments/assets/e2d9e91f-5f51-43f2-8a46-eff971e221fc" />

<img width="1141" height="755" alt="Screenshot 2025-08-29 at 7 22 14 PM" src="https://github.com/user-attachments/assets/8a916c18-c4e5-4b3f-acfc-c9051846d79c" />

<img width="1143" height="754" alt="Screenshot 2025-08-29 at 7 22 39 PM" src="https://github.com/user-attachments/assets/23032f7b-cd98-4e2b-94a5-0ca9b444b6ff" />

<img width="1150" height="728" alt="Screenshot 2025-08-29 at 7 23 15 PM" src="https://github.com/user-attachments/assets/84bab9b2-ee33-4c96-9729-d8aca28549f1" />

<img width="1151" height="753" alt="Screenshot 2025-08-29 at 7 23 49 PM" src="https://github.com/user-attachments/assets/b1f2aa68-ac7e-4f38-9ddf-b801c3c252ec" />





FUTURE IMPROVEMENTS: 
- For next year's season, I am planning to add:
      - A shot clock feature, so that the board member can easily count down the remaining time for a team's possession of the ball, instead of needing to calculate via the running game time.
      - A foul reset feature, so that fouls can be counted per half of each game.
      - Edit features for players, teams, games, and stats. This project was finalized to its current stage towards the end of the league, where editing players, teams, games, or stats werent necessary.


ACKNOWLEDGEMENTS:
- This project was inspired by a fellow church member who works as a software developer.
- The player stats table structure was inspired by ESPN NBA player statistics.


This project was created as part of my Database Management/Administration and SQL Portfolio. 






