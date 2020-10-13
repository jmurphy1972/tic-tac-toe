This is the README.md file for the tic-tac-toe game.
Author: John Murphy

Technologies Used:
- I used JavaScript, HTML, and CSS in order to render the game.
- I used Flexbox in order to structure the styling elements of the board
- I used a preselected set of jpeg (.jpg) images that are referenced in the game code.
- I used a wave (.wav) file to play when a winning condition is achieved in the game.

Here are the core user stories that were tackled in this project.  All these user stores were implemented.
- As a user, I should be able to start a new tic-tac-toe game
- As a user, I should be able to click on a square to add X first and then O, and so on
- As a user, I should be shown a message after each turn for if I win, lose, tie, or who's turn it is
- As a user, I should NOT be able to click the same square twice
- As a user, I should be shown a message when I win, lose, or tie
- As a user, I should not be able to continue playing once I win, lose, or tie
- As a user, I should be able to play the game again without refreshing the page

Here are the extra bonus user stories that were tackled in this project.
- As a user, I should be able to keep track of multiple games with a score for win, lose, or tie
- As a user, I allow players to customize their tokens with text
- As a user, I allow players to customize their tokens with a pre-selected set of images
- As a user, I can persist my game if the browser refreshes by implementing local storage
- As a user, I hear a winning sound when there is a winner
- As a user, I can play the computer (i.e. AI system)
- As a user, the screen renders on a mobile phone screen
- As a user, I can see a winning row, column, or diagonal that changes color


Planning of the Core Game:
In the first phase of the game, the goal was to get the basic tic-tac-toe game working.  For this, I started
with the HTML structure of the game (i.e. head, body, header, etc.).  In the HTML I used 3 sets of 3 div tags
that I planned on using FlexBox in CSS to structure. 

In the CSS file, I used Flexbox to build the tic-tac-toe which consisted of 3 vertical sets of 3 rows of squares. I initially
used a generic square element in CSS to represent the squares of the tic-tac-toe board.  This meant that all of the tic-tac-toe
squares would be actual squares.  I used text with a font size of x-large of either an 'X' or an 'O'.  I later on realized I could
have different types of squares in which different sides of the square could have a width of zero.  This allowed me to create
different types of squares for the corners (i.e. upper-left, lower-left, upper-right, lower-right), the four different kinds of 
edges (upper, left, right, lower), and the middle square.  I then updated the html code to associate each square element (div) with
the corresponding type of square to create the tic-tac-toe board.

I then created the JavaScript file and started with creating the listeners for each of the nine squares in the tic-tac-toe board.
A For loop is used to cycle through each square and setup an event listener for a click event.  Whenever a square is clicked,
the code would check for a winning condition and if no winning condition is encountered, the turn would be switched to the other player.  
The player always started out with "X".  I also checked for a condition if the board is full after checking for the winning condition. 
If the board is full, after checking for a winning condition, this means that there is no winner and the game is in a "draw" condition.


How To Solve for the Winner:
I next created the algorithm for checking whether there is a winner.  The algorithm keeps track of the squares in an array called 
playerBoard[].  The playerBoard[] array consists of only "X"s and "O"s.  The array starts numbering the squares at the upper-left
moving to the right, and continuing with the left-most square on the row below it.  After a square listener registers a click event,
the isPlayerWinner() algorithm runs through the array to check each row, each column, the slash diagonal, and then the backslash diagonal.
If a winning condition is discovered, then the assumption is that the person who's turn it is has won the game.  (In tic-tac-toe,
there is no condition in which a player makes a move and causes the other player to win.)

For each check of the row algorithm, a For Loop is used to iterate over each row of the tic-tac-toe board.  Inside the For Loop, for
each row, the algorithm starts with a winning condition and then attempts to see if the winning condition is broken.  The algorithm
starts on the second element in the row and compares it to the first element in the row.  A while loop is used to keep this check going
until the last element of the row is reached.  The two conditions that are checked are:

	- Does either element contain a blank space
	- Do the two elements not match each other?

If either of these two conditions are met, the row does not have a winning condition, and the while loop is exited.  The same type of
algorithm is used for the columns.  If a winning condition is met, the IsPlayerWinner() function returns a true.

The next check is to determine the forward-slash and back-slash entries for these two conditions.  Since there is only one forward-slash
and one backward-slash configuration in a tic-tac-toe board, I only need one loop to iterate over the elements.  Once again, I start
with a winning condition and see if either of these two tests are met.  If a winning condition is encountered, the IsPlayeWinner() 
function returns a true (just like with the row and column).


Bonus Features:
After the planning of the core game, I moved onto the bonus features.

Keep Track of Scores:
I started with the tally mechanisms to keep track of successive wins for X, wins for O, and games that came to a draw.  I used FlexBox
to keep the four elements for each scoring element ("Games won by" text, name of either X or O, the colon, the number score) in a row.
If a winner is encountered when one of the square listeners registers a click event, the turn is used to determine which player won
the game.  The assumption is that the last person to go before a winning condition is met is the winner of the game.  This is just a 
basic property of the tic-tac-toe game.


Storage of Game State:
I then implemented the storage mechanism to keep track of the game state if the browser is refreshed.  This means that the following
elements of the game needed to be saved in the event of a browser refresh:

	- Board state (playerBoard[])
	- Scores for X's, O's and Draws

I created methods in the code, updateStorage(key, value) and updateStorageAndHtmlObj(key, value, htmlObj) in order to save these
key-value pairs and set HTML elements.  On the event of a browser refresh, the init() function will first check whether there is
saved data for a key, and if there is, restore the game state for that key.  The init() function was used since this function is 
run near the beginning of the program code.


Customization of Tokens with Text:
The feature where tokens could be customized was then implemented.  I used the variables of tokenX and tokenO to represent which tokens
have been set by the player.  The values of these variables start with "X" and "O", but can be customized to any text value by the player.
The player is restricted to 8 characters due to the size of the board.  A prompt() is used when the button is clicked to determine the
value that the player would like.  If the "Cancel" button on the prompt() is selected, there is no change to the token.


Customizaton of Tokens with Images:
This feature consists of two different parts.  The first part of this is the mechanism that allows each player to show the menu of images
and select the image for their token on the game board.  The second part of this is the mechanism allows the user to use the selected image
as their token on the game board.

NOTE: My initial thoughts were that I needed to implement the storage feature before implementing the images.  My original plan was to have 
the player upload an image of their choice.  After consulting on the issue, the game now shows pre-defined images that a player can select.

How Image Menu works in UI:
The first part consists of two different variables whose boolean values are controlled by two buttons on the game board.  One variable is
controlled by the "X" player and the other variable is controlled by the "O" player.  These variables are used for controlling the visibility
of the image menu.  If one player opens the menu (i.e. player "X"), then the other player (player "O") cannot open or close the image menu.
After the player either closes the menu or selects an image from the image menu, then either is free to open the image menu again.
For this logic, I needed to make sure to start with both variables in a false state.  If one player opens the menu, their variable is set 
to true, and the other player is blocked from opening the image menu.  When the player either clicks their button again to close the menu
or selects an image from the image menu, the title and image menu are both set to (display: none) and the variable is set to false.

For the second part, the tokenX or tokenY is set to the jpeg file that was selected by the player.  This indicates to the system that the user
select an image from the image men as their token.  In the listener algorithm for the square, the code checks whether the tokenX or tokenY
has a ".jpg" contained in the string.  If so, this indicates that an image token was selected.


AI System:
The AI system is implemented within the For-Loop that creates the listeners for the squares.  The AI system uses a global variable to check
whether the AI system has been toggled to true.  A button on the display is used to control whether the AI system is turned on or off.  
An <h3> element in the display is used to show whether the AI system is turned on or off.  This is changed whenever the global variable
is turned on or off.

The AI system implements a simple algorithm.  The system checks the number of empty squares in the game board and then uses a random number
to select one of the empty squares on the board.  The square is then chosen and the token or image from the AI system is placed in the square.
The AI system is implemented when a listener registers a click event, processes the player's move, and then the AI system selects its square.
As a future enhancement, a more sophisticated AI system can be considered for the future.


Row, Column or Diagonal Changes Color for Winning Combination to Blue:
When a winning condition is encountered, the row, column, or diagonal changes to a blue color.  This algorithm was implemented inside the 
isPlayerWinner() algorithm that checks for the winning state.  If a winning state is encountered, that row, column, or diagonal is then
changed to a blue color.  A For-Loop was used to loop through the elements in the winning row, column, or diagonal and change the color.
This color change only works for text tokens and not images.  This algorithm was implemented directly after each check.  The other
implmentation in the init() function was to turn all text to black.  This was the last feature implemented in the tic-tac-toe game.


Unsolved Problems for Future Iterations:
Here are some unsolved problems that will be solved with future iterations of the code:
	- The AI system selects an open square randomly.  I will build more intelligence into the AI system using a Min-Max algorithm
		in AI to determine the best square to select and a heuristic to determine the best game state.
	- The AI system can only be the "O" player.  A future iteration could have the AI system going first as "X".
	- The images that can be used for the tokens are pre-selected images.  I would include a greater amount of images to choose from.
	- The user should be able to upload their own image and their token on the tic-tac-toe board.
	- The game should have more subtle styling using colors to indicate the player to go next.  The player could choose not only
		their custom token but their color as well.  (For instance the game board would turn the color of the player whose
		turn it is to go.)  The gameboard would stay that color when the player won.
	- The game should include hover effects and animation to make the screen flashier.
	- The game only shows one winning row, column, or diagonal when there could be several.  The next iteration of the game should
		show each winning row, column, or diagonal and not just the first one encountered.
	- The blue color to show a winning row, column, or diagonal only works with text tokens and not image tokens.
	- The blue color does not show on a refresh of the browser.  This should be implemented.
	- The game could use websockets so that two players on different devices can play the same game on different devices.

