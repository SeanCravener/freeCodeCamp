#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ Salon Appointment Scheduler ~~~~~\n"
echo -e "\nWelcome to My Salon, how can I help you?\n"

MAIN_MENU() {
  # Handle arguement passed in for message display
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi
  
  # Get available services
  AVAILABLE_SERVICES=$($PSQL "SELECT service_id, name FROM services")
  
  # List available services
  echo "$AVAILABLE_SERVICES" | while read SERVICE_ID BAR SERVICE_NAME
  do
    echo "$SERVICE_ID) $SERVICE_NAME"
  done

  # Read input from service selection
  read SERVICE_ID_SELECTED

  # Find service to schedule
  SERVICE_NAME_TO_SCHEDULE=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
  
  # Check if service exists
  if [[ -z $SERVICE_NAME_TO_SCHEDULE ]]
  then
    # Return to service selection if empty
    MAIN_MENU "I could not find that service. What would you like today?"
    else
      # Get customer phone number
      echo -e "\nWhat's your phone number?"
      read CUSTOMER_PHONE
      # Check if customer exists using number
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")
      # If customer doesn't exist
      if [[ -z $CUSTOMER_NAME ]]
      then
        # Get customer name from input
        echo -e "\nI don't have a record for that phone number, what's your name?"
        read CUSTOMER_NAME
        # Add customer to database
        INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
      fi
      # Get customer id
      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
      # Removes leading and following whitespace from name and service name
      CUSTOMER_NAME_FORMAT=$( echo $CUSTOMER_NAME | sed -E 's/^ *| *$//g' )
      SERVICE_NAME_FORMAT=$( echo $SERVICE_NAME_TO_SCHEDULE | sed -E 's/^ *| *$//g' )
      # Get appointment time input from customer
      echo -e "\nWhat time would you like your appointment, $CUSTOMER_NAME_FORMAT"
      read SERVICE_TIME
      # Insert new appointment to appointments table
      INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
      # Final message
      echo -e "\nI have put you down for a $SERVICE_NAME_FORMAT at $SERVICE_TIME, $CUSTOMER_NAME_FORMAT."
  fi
}

MAIN_MENU