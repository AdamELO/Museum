# Museum API Documentation

## Overview
The Museum API provides endpoints for managing bookings related to museum exhibitions and category information.

### Base URL
The base URL for all API requests is: `https://api.museum.com/v1`

## Endpoints

| API Path                                      | Description                               | Expected Response       |
|-----------------------------------------------|-------------------------------------------|-------------------------|
| `/api/Booking/{exhibitionId}`                 | Create a booking for a specific exhibition | 200 OK (Success)        |
| `/api/Booking/booking{bookingId}/user{userId}` | Retrieve booking details for a user       | 200 OK (Success)        |
| `/api/Booking/AllUsersBookings{userId}`        | Retrieve all bookings for a specific user | 200 OK (Success)        |
| `/api/Category`                               | Get a list of all categories               | 200 OK (Success)        |
| `/api/Category/{id}`                          | Get details of a specific category         | 200 OK (Success)        |
| `/api/Category`                               | Create a new category                      | 200 OK (Success)        |
| `/api/Category/{id}`                          | Update details of an existing category     | 200 OK (Success)        |
