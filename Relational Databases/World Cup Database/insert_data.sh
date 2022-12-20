#! /bin/bash

if [[ $1 == "test" ]]; then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

# Reset database for testing purposes
echo $($PSQL "TRUNCATE teams, games")

cat games.csv | while IFS=',' read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS; do
  # Test if header of csv file
  if [[ $YEAR != year ]]; then
    # Get winning team id from teams table using name
    WINNING_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
    # If not found, add team name to teams
    if [[ -z $WINNING_TEAM_ID ]]; then
      INSERT_WINNING_TEAM=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")
      # Test if inserting was successful and print to terminal
      if [[ $INSERT_WINNING_TEAM == "INSERT 0 1" ]]; then
        echo Inserted winning team, $WINNER, into teams table
      fi
      # Get new winning team id from teams table
      WINNING_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
    fi
    # Get opponent team id from teams table using name
    OPPONENT_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")
    # If not found, add team name to teams
    if [[ -z $OPPONENT_TEAM_ID ]]; then
      INSERT_OPPONENT_TEAM=$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT')")
      # Test if inserting was successful and print to terminal
      if [[ $INSERT_OPPONENT_TEAM == "INSERT 0 1" ]]; then
        echo Inserted opponents team, $OPPONENT, into teams table
      fi
      # Get new opponent team id from teams table
      OPPONENT_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")
    fi
    # Insert year, round, winning team id, opponent team id, winning goals, and opponent goals into row in games table
    INSERT_GAME=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES('$YEAR', '$ROUND', '$WINNING_TEAM_ID', '$OPPONENT_TEAM_ID', '$WINNER_GOALS', '$OPPONENT_GOALS')")
    if [[ $INSERT_GAME == "INSERT 0 1" ]]; then
      echo Inserted into games, $YEAR, $ROUND, $WINNING_TEAM_ID, $OPPONENT_TEAM_ID, $WINNER_GOALS, $OPPONENT_GOALS
    fi
  fi
done
