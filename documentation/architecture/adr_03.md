# MongoDB database for storing information

Date: 2022-06-01

## Status

Accepted

## Context

*Users connect to the program using various internet-connected networks. Their data must be accessible from anywhere at any time. Furthermore, this data must be saved and arranged intelligently to avoid duplications and to enable for the usage of data relations to retrieve meaningful information about them.  

## Decision

* MongoDB is the database of choice. It is faster than SQL databases since it is a no-SQL database. In the long run, it will be more scalable, particularly as player logs grow larger.
* The Mongoose library is used to interface with MongoDB.
* The database is stored on MongoDB Cloud Atlas.
## Consequences

 This selection affects the preservation of user login information as well as player action records. Unless there is a compelling reason to use anything else, any future features that require persistent storage should also use MongoDB.
