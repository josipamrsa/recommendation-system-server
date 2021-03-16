# recommendation-system-server

Recommendation content-based system server built with Node.js
Mobile app [client](https://github.com/josipamrsa/recommendation-system-client) - built with React Native (Android devices).

This is a small recommendation engine written with JavaScript (Node.js), built with help from [this tutorial](https://dev.to/jimatjibba/build-a-content-based-recommendation-engine-in-js-2lpi).
Project idea consists of providing attractions to users based on their location and query (restaurants, coffee shops, nature spots to visit, etc.), and the system returns
viable candidates with whom the end user can connect with, which should provide the user with an interesting site or attraction to visit. User defines their query and search
area (within or near the place they are located in), and together with user location, system checks for other candidates, first based on their location and whether they are within
the specified search radius, and then takes candidate recommendation history in account. Each user can rate their chosen candidate based on their recommendation, so candidate
history contains the past queries and their ratings. Based on that, system uses NLP tools and received ratings to make an informed decision and recommend people with highest
score, based on the history, ratings, review count - if there are two users with identical scores, it takes distance into account as well.

