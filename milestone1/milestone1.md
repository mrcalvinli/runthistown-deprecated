Design
=====

Objective
-----
The app we will be creating is a running app where while you are running, you can pass by parts of the city that you haven’t been able to see.  The objective of the app is to get people fit while also giving them a better feel for their city.  The app also has the option to meet new people who also have similar workout/city viewing interests as you, however that is not one of our main objectives.

Features
-----
- The app features a map (using the google maps api) that can be used to plan your route.
- The user can start by inputting the desired length of their run, either as a single value, or range of values.
- To plan out the route, the user picks a start location, and an end location for their route.
    - They can then pick a number of waypoints, which are locations on the map that they want to pass by on their run. 
    - The order that the waypoints are picked does not matter, unless the user specifies that they want to pass by those points in that order.
        - (“My order”, “Auto Order”, and “Shortest Order” buttons)
    - With “My Order” the user is saying that they want to pass by the points they input in the order that they input, and will take whatever distance the route comes out to be
    - With “Auto Order”, the user chooses a desired distance for their run, and after choosing the waypoints, their route is chosen such that it is as close as possible to their desired distance.  They can also look at a list of routes (with their associated distances, and see what the route looks like on the map by hovering over the item in the list
    - With “Shortest Order”, we will order the points in the run such that the distance of the final run is as short as possible.
- User Accounts
    - Users can plan a schedule for their run (daily, weekly, custom, ect)
    - Users can also look at routes of other users, and opt to join their route.  The user who created the route can accept or decline.  
    - Users with routes can also invite their friends to join their routes, if they know their username
    - Keep track of total miles run for each user
    - Award system given for certain milestones


Demographic
-----
Our application is generally intended for adults (18+).  You can only create an account if you are an adult, but anybody can search up a route that has already been created by another user.

Use Cases
-----
Task: Create a route (With map clicks and auto ordering)
1. User clicks “Auto Ordering” in the dropdown menu
2. User inputs a desired distance for their run
3.  User clicks a location on the map that they want to start their run
	- Response: Map creates a marker where the user clicked, input field gets filled with latitude and longitude of user click
4. User submits this point as the start point
	- Response: Route list is updated with the address of this point
5. User submits a number of waypoints in the same manner (repeat of steps 3 and 4 for each waypoint)
	- Response: Markers are created on the map, and route list is updated with waypoints.
6. User submits their endpoint in the same manner
	- Response: Marker created on map, route updated with endpoint
7. User clicks create path button
	- Response: Map is updated with a route with a distance as close as possible to the given distance, passing by all the waypoints given.  Also a list is created with all possible routes given the start, end, and waypoint locations.  The user can hover over each route in the list and see what the route looks like on the map.

Minimal Viable Product
-------
1. Features to implement
    - Users (Login page, and user information handling)
    - Route creation (with at least custom and shortest path ordering)
2. Features to leave out
    - Social Networking aspect (make friends, plan to run with them, send them messages, ect)
    - Awards system
3. Other Aspects that are reduced in the MVP
    - It’s ok if our site doesn’t have all the stylistic features we want for the MVP.

Site Design
-----
![Design Possibilities](/DesignPossibilities.jpg)
Image in folder if you can't see.

####Top-Left Design
Pros
- More visual space to see waypoints (detour locations before destination)
- Versatile list on the left (for viewing routes on auto ordering, and viewing and editing waypoints while creating a route
- Good balance of map width and height

Cons
- Having space for editing each waypoint takes up more space than bottom left design (minor flaw); too many input boxes
- A lot of dead space on bottom (for left column) that isn’t utilized well

####Top-Right Design
Pros
- Wide map view
- When route is created, one can opt for a full screen view simply by scrolling up so that the buttons are hidden and the map fills the screen

Cons
- Width of map sacrifices height
- Buttons below map are cluttered
- Not enough space

####Bottom-Left Design
Pros
- Very clear listing of start, waypoints, and end
- Space saving input field
- Good balance of map width and height

Cons
- Button/Input on map may have too many (clutters map, hinders view)
- Input space isn’t as clear whether location is the start/end/waypoint
- Confusion on how to input visiting points due to one input box (learnability issue)

![Mock-up](/DesignPic.jpg)
Image in folder if you can't see.

Additional Questions
---
####Team
Calvin A Li 
- calvinli@mit.edu
- Course 6, 2016
- Undergrad
- Registered for Credit

Daniel Sanchez 
- dsan@mit.edu
- Course 6, 2016
- Undergrad
- Registered for Credit

Christian M. Mata
- cmata@mit.edu
- Course 6, 2015
- Undergrad
- Not registered

####Theme
Our application is a combination of Themes 1 and 2, but we would say it falls under Theme 2 more so. Our application would allow users to visit new locations or sites in their city while at the same time allowing users to enjoy the cathartic effects of running. The application will also allow for features such as user run invitations to allow for community meet ups, distance tracking and the ability to share your favorite paths. 

####Server-Side Programming
Currently, we plan to use Ruby on Rails to develop our server-side, but since none of the group members have experience with it, we may change to Django if we can’t get the programming up. 

####Risks
The biggest risk that we see is developing the server side of our application. No one in the group has developed backend of a website and we can easily see it becoming a huge risk. Another risk that we could have issues with would be plotting paths. We’re using the Google Maps API to develop paths now, but we’d like to expand those capabilities. 

####Competition 
We plan to enter our web application into the main competition. 