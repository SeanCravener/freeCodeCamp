#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo "Enter your username:"
# Get username
read USERNAME
# Query for username in database
USERNAME_QUERY=$($PSQL "SELECT * FROM users WHERE username='$USERNAME'")
# If not found
if [[ -z $USERNAME_QUERY ]]
then
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  GAMES_PLAYED=0
  BEST_GAME=0
  # Insert User to database
  INSERT_USER_QUERY=$($PSQL "INSERT INTO users(username, games_played, best_game) VALUES('$USERNAME', $GAMES_PLAYED, $BEST_GAME)")
else
  GAMES_PLAYED=$($PSQL "SELECT games_played FROM users WHERE username='$USERNAME'")
  BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username='$USERNAME'")
  NAME=$($PSQL "SELECT username FROM users WHERE username='$USERNAME'")

  echo "Welcome back, $NAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

# Set random number
RANDOM_NUMBER=$(($RANDOM%1001))

# Set count to 1
COUNT=0

INPUT_CHECK() {
    echo "$1"
    read NUMBER_GUESS
    if [[ ! $NUMBER_GUESS =~ ^[0-9]+$ ]]
    then
        INPUT_CHECK "That is not an integer, guess again:" 
    else
        ((COUNT++))    
    fi
}

NUMBER_CHECK() {
  if [[ $1 -gt $RANDOM_NUMBER ]]
  then
    INPUT_CHECK "It's lower than that, guess again:"
    NUMBER_CHECK $NUMBER_GUESS
  elif [[ $1 -lt $RANDOM_NUMBER ]]
  then
    INPUT_CHECK "It's higher than that, guess again:"
    NUMBER_CHECK $NUMBER_GUESS
  elif [[ $1 -eq $RANDOM_NUMBER ]]
  then
    echo "You guessed it in $COUNT tries. The secret number was $RANDOM_NUMBER. Nice job!"
  fi
}

# Guess number between 1 and 1000 msg
INPUT_CHECK "Guess the secret number between 1 and 1000:"

# Send input to repeating function
NUMBER_CHECK $NUMBER_GUESS

# Increment Games_played
((GAMES_PLAYED++))
# Update games played in database
UPDATE_GAMES_PLAYED=$($PSQL "UPDATE users SET games_played=$GAMES_PLAYED WHERE username='$USERNAME'")
# Check if new high score or first time
if [[ $COUNT -lt $BEST_GAME ]] || [[ $BEST_GAME -eq 0 ]]
then
  INSERT_NEW_SCORE=$($PSQL "UPDATE users SET best_game=$COUNT WHERE username='$USERNAME'")
fi
