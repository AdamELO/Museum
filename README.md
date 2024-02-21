# Museum API Documentation

## Overview
The Museum API provides endpoints for managing bookings related to museum exhibitions.

### Base URL
The base URL for all API requests is: `http://localhost:5190`

## Endpoints

| API Path                                      | Description                                | Http Method             | 
|-----------------------------------------------|------------------------------------------- |-------------------------|
| `/api/Booking/booking{bookingId}/user{userId}`| Retrieve booking details for a user        | Get                     |
| `/api/Booking/AllUsersBookings{userId}`       | Retrieve all bookings for a specific user  | Get                     |
| `/api/Booking/{exhibitionId}`                 | Create a booking for a specific exhibition | Post                    |
| `/api/Category`                               | Get a list of all categories               | Get                     |
| `/api/Category/{id}`                          | Get details of a specific category         | Get                     |
| `/api/Category`                               | Create a new category                      | Post                    |
| `/api/Category/{id}`                          | Update details of an existing category     | Put                     |
| `/api/Category/{id}`                          | Delete an existing category                | Delete                  |
| `/api/Exhibition`                             | Get a list of all exhibtions               | Get                     |
| `/api/Exhibition/{id}`                        | Get details of a specific exhibtions       | Get                     |
| `/api/Exhibition//GetFloorExhibitions{id}`    | Get all exhibtions within a floor          | Get                     |
| `/api/Exhibition/Search?params`               | Get a list of all exhibtions of a floor    | Get                     |
| `/api/Exhibition`                             | Create a new exhibition                    | Post                    |
| `/api/Exhibition/{id}`                        | Update a specific exhibition               | Put                     |
| `/api/Exhibition/{id}`                        | Soft deleting an exhibition                | Patch                   |
| `/api/Floor`                                  | Get a list of all floors                   | Get                     |
| `/api/Floor/{id}`                             | Get details of a specific floor            | Get                     |
| `/api/Floor`                                  | Create a floor                             | Post                    |
| `/api/Floor/{id}`                             | Update a specific floor                    | Put                     |
| `/api/Floor/{id}`                             | Delete a specific floor                    | Delete                  |
| `/api/Pricing`                                | Get pricings                               | Get                     |
| `/api/Pricing`                                | Update pricings                            | Put                     |
| `/api/Review`                                 | Get all reviews                            | Get                     |
| `/api/Review/exhibitionReviews{exhibId}`      | Get all reviews                            | Get                     |
| `/api/Review/{exhibitionId}`                  | Create a review for an existing exhibition | Post                    |
| `/api/Review/{id}`                            | Delete a specific review                   | Delete                  |
| `/api/Security`                               | Auth and get a JWT                         | Post                    |
| `/api/User/GetAll`                            | Get all users                              | Get                     |
| `/api/User/{id}`                              | Get a specific user                        | Get                     |
| `/api/User`                                   | Register a User                            | Post                    |
| `/api/User/{id}`                              | Soft delete a specific user                | Patch                   |
| `/api/User/Active/{id}`                       | Activate back a specific user              | Patch                   |



