#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

if [[ -z $1 ]]
then
    # No argument given, provide msg and exit program
  echo "Please provide an element as an argument."
else
  # Check if argument is not a number
  if [[ ! $1 =~ ^[0-9]+$ ]]
  then
    # Query using argument without atomic_number
    ELEMENT_QUERY=$($PSQL "SELECT * FROM elements RIGHT JOIN properties USING (atomic_number) RIGHT JOIN types USING (type_id) WHERE symbol='$1' OR name='$1'")
  else
    # Query using argument with atomic_number
    ELEMENT_QUERY=$($PSQL "SELECT * FROM elements RIGHT JOIN properties USING (atomic_number) RIGHT JOIN types USING (type_id) WHERE atomic_number=$1")
  fi
  # Check if query is empty, meaning element can't be found with argument
  if [[ -z $ELEMENT_QUERY ]]
  then
    echo "I could not find that element in the database."
  else
    # Print element information
    echo "$ELEMENT_QUERY" | while read TYPE_ID BAR ATOMIC_NUM BAR SYMBOL BAR NAME BAR ATOMIC_MASS BAR MELTING_POINT BAR BOILING_POINT BAR TYPE
    do
      echo "The element with atomic number $ATOMIC_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
    done
  fi
fi
