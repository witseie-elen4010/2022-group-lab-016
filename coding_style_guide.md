## Style Guide

The following conventions are adopted by developers in the in the development of the project for consistent, readable and easy to maintain code.

###MYSQL####

The following styles will be adopted for MYSQL

- Constant and descriptive identifiers and names are to be used.
- Identifiers and names are to be unique.
- Identifiers and names are to be limited to 30 characters, must begin with a letter and can not end with an underscore.
- Underscores are to be used in identifiers and names where space would be naturally used.
- White space and indentation are to be used to make code more readable.
- Store  ISO 8601 compliant time and date information.
- Standard SQL functions are to be used over vendor-specific functions for portability.
- Keep code succinct.
- Comment code where necessary.
- C style commenting to be used where possible otherwise use --
- Avoid CamalCase as it is difficulty to scan fast.
- Avoid Hungarian notation.
- Avoid use of plurals.
- Avoid quoted identifiers.
- Avoid object-oriented design principles.
- Avoid use of multiple consecutive underscores.
- For tables, collective names are to be given preferences.
- Table names are to be different from any column name.
- lowercase are to be used for column names.
- Correlation name should be the first letter of each word in the object’s name.

###VANILLA JAVASCRIPT##

The following styles will be adopted for Vanilla JavaScript (also applicable to Node.js)

- Avoid declaring variables using the var keyword.
- The 'usestrict' directive should be used for all JS files.
- Modules should be used to separate concerns of different nature.
- Declare variables using the constant keyword whenever possible.
- Always use a semicolon at the end of each line.
- Use the K & R style for non empty blocks and block-like constructs.
- Empty blocks can however be closed immediately  with no space or a line break in between the curly brackelt i.e. let do_nothing = function() {}
- A function should be limited to 30 lines of code.
- Variables should be named to provide information about its existance in the code.
- Variable names should be limited to 30 characters.
- Snakecase is used for declaring variables.
- Single line comment is done strictly using (//) and for Multiple-lines the (/* */) style is used.
- A string is defined using single quotes.
- The length of the code should be limited to 80 characters.
- Helper functions should come after the code that uses the functions.
- File names should be lowercase and may only contain an underscore. 
- Avoid hardcoded values.
- Limit nested loops to three levels.
- All variables are initialised immediately after declaration. 
- Any object literal may optionally be  formatted as if it were like a block-construct i.e an array can be formated like a function  
- Avoid block scoped functions.
- All files should have a top-level file overview.
- All global variables must be declared as constant variables and these should be uppercase i.e const GLOBAL = 0;
- All global variables appear before the code .
- Functions and classes are declared using the Snakecase.
- Use Arrow functions whenever possible.
- Equality checks are done strictly using the (=== or !== ), unless used for catching null or undefined values.
- All switch statements should end with a default case.
- Contents of a switch statement are indented +2 spaces.
- All cases of a switch statement should end with a break, return or a throw statement.
- If a catch block of an exception is empty, a reason for that should be briefly discussed using a comment. 
- Numbers are specified in decimal (base 10).
- Avoid line continuations.
- All lines of code defined within the same block should have the same indention. 
- Avoid using a comma between the end bracket and the final element of an array i.e avoid: let array = [......'lastElement',].
- Variables should be declared within the scope that they are used.
- When line-wrapping, each line after the first is indented at least + 4 spaces from the original line. 
- One statement is allowed per line, then followed by a line-break.
- No space should be placed between a function name and the opening bracket when declaring or calling a function.
- A single space indention should be placed between the closing round bracket and the curly bracket when defining a function, this applies to all other objects that uses curly brackets for scope definition.

### HTML###

The following styles will be adopted for HTML

- Always declare the document type at the top of the code using <!DOCTYPE html>
- Kepp structure (markup), presentation (styling), and behaviour (scripting) apart
- Add lang, charset and attributes early in the document
- Set the viewport meta tag
- Use consistent naming styles
- Surround each section of a page with opening and closing section elements
- Provide alternative content for multimedia
- For images, always specify alt, width, and height
- Add a meaningful title element
- Use elements for what they have been created for (HTML semantics)
- Avoid using HTML elements to achieve specific visual results
- Use lowercases for element and attribute names
- Avoid using tabs, instead indent by two spaces per indentation level
- Avoid unnecessary id attributes
- Use double quotation marks to quote attributes
- Avoid long code lines; except in metadata tags and URL links
- Avoid unnecessary blank lines, spaces, and indentation, unless it is for separating large or logical code blocks
- Use entities only where applicable
- Validate code
- Check code using multiple browsers
- Keep code simple and succinct
