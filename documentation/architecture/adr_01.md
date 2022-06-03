# Separating logic from Express routes 

Date: 2022-06-01

## Status

Accepted

## Context

* The logic of a feature needs to be separeted from the call back.

## Decision

* All the code that has anything to do with the functionality of a feature will be in its own function other than in the call back and will be exported as an express route.

* Modularizing the components.

## Consequences

* Unit testing will be easy
* Test Driven Development enhenced 
* Improved performance
* Component modularity
* A clean workflow and

