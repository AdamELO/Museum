# Museum

# Museum API Documentation

## Overview
The Museum API provides endpoints for managing bookings related to museum exhibitions.

### Base URL
The base URL for all API requests is: `https://api.museum.com/v1`

## Endpoints

| API Path                                      | Description                               | Expected Response       |
|-----------------------------------------------|-------------------------------------------|-------------------------|
| `/api/Booking/{exhibitionId}`                 | Create a booking for a specific exhibition | 200 OK (Success)        |
| `/api/Booking/booking{bookingId}/user{userId}` | Retrieve booking details for a user       | 200 OK (Success)        |
| `/api/Booking/AllUsersBookings{userId}`        | Retrieve all bookings for a specific user | 200 OK (Success)        |

## Request and Response Examples

### Create Booking
- **Endpoint**: `/api/Booking/{exhibitionId}`
- **Method**: `POST`
- **Parameters**:
  - `exhibitionId` (path parameter): ID of the exhibition
  - Request Body (JSON):
    ```json
    {
      "visitorName": "John Doe",
      "exhibitionDate": "2024-02-21",
      "ticketCount": 2
    }
    ```
- **Expected Response**: 200 OK (Success)

### Get Booking Details
- **Endpoint**: `/api/Booking/booking{bookingId}/user{userId}`
- **Method**: `GET`
- **Parameters**:
  - `bookingId` (path parameter): ID of the booking
  - `userId` (path parameter): ID of the user
- **Expected Response**: 200 OK (Success)

### Get All User Bookings
- **Endpoint**: `/api/Booking/AllUsersBookings{userId}`
- **Method**: `GET`
- **Parameters**:
  - `userId` (path parameter): ID of the user
- **Expected Response**: 200 OK (Success)