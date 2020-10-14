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
- As a user, I can persist my game if the browser refreshes (implementing local storage)
- As a user, I hear a winning sound when there is a winner
- As a user, I can play a game against the computer (i.e. AI system)
- As a user, the screen renders clearly on a mobile phone screen
- As a user, I can see a winning row, column, or diagonal that changes color to blue


Planning of the Core Game:
In the first phase of the game, the goal was to get the basic tic-tac-toe game working.  For this, I started
with the HTML structure of the game (i.e. head, body, header, etc.).  In the HTML I used 3 sets of 3 div tags
in order to render the tic-tac-toe board.  I planned on using FlexBox in CSS to structure to set the horizontal
direction of the rows.

In the CSS file, I used Flexbox to build the tic-tac-toe board which consists of 3 vertical sets of 3 rows of squares. I initially
used a generic square element in CSS to represent the squares of the tic-tac-toe board.  This meant that all of the tic-tac-toe
squares would be actual squares which would be closed in and not look like a tic-tac-toe board.  I used text with a font size of xx-large
to draw either an 'X' or an 'O' to represent the move.  I later on realized I could have different types of squares in CSS in which
different sides of the square could have a width of zero.  This allowed me to create different types of squares for the corners
(i.e. upper-left, lower-left, upper-right, lower-right), the four different kinds of edges (upper, left, right, lower) and the  
middle square (center).  I then updated the html code to associate each square element (div) with the corresponding type of square  
create the tic-tac-toe board.  This allowed me to create a tic-tac-toe board that looks like a tic-tac-toe board.

I then created the JavaScript file and started with creating the listeners for each of the nine squares in the tic-tac-toe board.
I used a For-Loop to cycle through each square and setup an event listener for a click event.  Whenever a square is clicked,
the code would check for a winning condition.  If no winning condition is encountered, the turn would be switched to the other player.  
The first player always starts out with "X".  I also checked for a condition if the board is full after checking for the winning condition. 
If the board is full, after checking for a winning condition, this means that there is no winner and the game is in a "draw" condition.

In the main message of the tic-tac-toe board, I created a message that can have one of three different states (i.e. In-Play, Winning State,
or a Draw State).  The In-Play state and the Winning state need to show which player's turn it is or which player won the game.


How To Solve for the Winner:
I next created the algorithm for checking whether there is a winner.  The algorithm keeps track of the squares in an array called 
playerBoard[].  The playerBoard[] array consists of only "X"s and "O"s.  The array starts numbering the squares at the upper-left
moving to the right, and continuing with the left-most square on the row below it.  After a square listener registers a click event,
the isPlayerWinner() algorithm runs through the array to check each row, each column, the slash diagonal, and then the backslash diagonal.
If a winning condition is discovered, then the assumption is that the person who's turn it is has won the game.  (In tic-tac-toe,
there is no condition in which a player makes a move and causes the other player to win.)  It should be noted that the playerBoard[] array
will only consist of "X"s and "O"s even if the player chooses another text or image token for the board.

For each check of the row algorithm, a For-Loop is used to iterate over each row of the tic-tac-toe board.  Inside the For Loop, for
each row, the algorithm starts with a winning condition and then attempts to see if the winning condition holds through two different
If-Then conditions.  The algorithm starts on the second element in the row and compares it to the first element in the row.  The algorithm
then compares the third element and compares it to the second element.  A while loop is used to keep this process going until the last
element in the row is reached. The two conditions that are checked are:

	- Does either element contain a blank space?
	- Do the two elements not match each other?

If either of these two conditions are met, the row does not have a winning condition, and the while loop is exited.  The same type of
algorithm is used for the columns.  If a winning condition is met, the IsPlayerWinner() function returns a true.  The algorithm runs down 
each column just like it did for the rows to perform these two conditional checks.

The next check is to determine the forward-slash and back-slash entries for these two conditions.  Since there is only one forward-slash
and one backward-slash configuration in a tic-tac-toe board, the code only needs one loop to iterate over the elements.  Once again, I start
with a winning condition and see if either of these two conditions are met.  If a winning condition is encountered, the IsPlayeWinner() 
function returns a true (just like it does with the row and column).

It should be noted that the algorithm uses a generic algorithm that can support square boards with different sizes.  If a version is implemented
that has 4 squares on a side for a total of 16 squares, the algorithm to check a winning state would still work for this board.


Bonus Features:
After the planning of the core game, I moved onto the bonus features.

Keep Track of Scores:
I started with the tally mechanisms to keep track of successive wins for X, for O, and for games that come to a draw.  I used FlexBox
to keep the four elements for each scoring element ("Games won by" text, name of either X or O, the colon, the number score) in a row.
If a winner is encountered when one of the square listeners registers a click event, the turn is used to determine which player won
the game.  The assumption is that the last person to go before a winning condition is obtained is the winner of the game.  This is just a 
basic property of the tic-tac-toe game.


Storage of Game State:
I then implemented the storage mechanism to keep track of the game state if the browser is refreshed.  This means that the following
elements of the game needed to be saved in the event of a browser refresh:

	- Board state (playerBoard[])
	- Scores for X's, O's and Draws
	- The state of the game (i.e. In-Play, Winning State, or Draw State)

Later on, I added the following elements to the storage mechanism:

	- Tokens selected for Text
	- Tokens selected for Images
	- The AI State of the system

I created methods in the code, updateStorage(key, value) and updateStorageAndHtmlObj(key, value, htmlObj) in order to save these
key-value pairs and set the HTML elements.  On the event of a browser refresh, the init() function will first check whether there is
saved data for a key, and if there is, to restore the game state for that key.  The init() function was used since this function is 
always run near the beginning of the program code before creating the Event Listeners.


Customization of Tokens with Text:
The feature where tokens could be customized was then implemented.  I used the variables of tokenX and tokenO to represent which text tokens
have been set by the player.  The values of these variables are initialized with "X" and "O", but can be customized to any text token by the player.
The player is restricted to 8 characters due to the size of a square on the board.  A prompt() is used when the button is clicked to determine the
value that the player would like to use.  If the "Cancel" button on the prompt() is selected, there is no change to the token.

The score and main message text areas are updated when the custom tokens are updated.  When the player clicks on the button to select a new text token, 
the listener for that button displays the prompt().  If the player enters in a new text token, the code checks the state of the game (In-Play, Winning State,
or Draw State) and updates the message accordingly.  The code also updates the name in the score tally area with the token name selected by the player.


Customizaton of Tokens with Images:
This feature consists of two different parts.  The first part of this is the mechanism that allows each player to show the menu of images
and select an image for their token on the game board.  The second part of this is the mechanism allows the user to use the selected image
as their token on the game board.

NOTE: My initial thoughts were that I needed to implement the storage feature before implementing the images.  My original plan was to have 
the player upload an image of their choice.  After consulting on the issue, the game now shows pre-defined images that a player can select.
I listed the ability to be able to upload a custom image to the game as a future feature to consider building.

How Image Menu works in UI:
As discussed above, the customization of tokens with images consists of two different parts.

The first part consists of two different variables whose boolean values are controlled by two buttons on the game board.  One variable is
controlled by the "X" player and the other variable is controlled by the "O" player.  These variables are used for controlling the visibility
of the image menu.  If one player opens the menu (i.e. player "X"), then the other player (player "O") cannot open or close the image menu.
After the player either closes the menu or selects an image from the image menu, then either player is free to open the image menu again.
In order to implement this logic, I initialized both variables to a false state.  If one player opens the menu, then their variable is set 
to true, and the other player's variable is still set to false.  This prohibits the other player from opening the image menu.
When the player either clicks their button again to close the menu or selects an image from the image menu, the title text and image menu 
are both set to (display: none) and the variable is set to false.  This hides the title text and menu from both players.

For the second part, the tokenX or tokenY is set to the jpeg file that was selected by the player.  This indicates to the system that the user
select an image from the image men as their token.  In the listener algorithm for the square, the code checks whether the tokenX or tokenY
has a ".jpg" contained in the string.  If so, this indicates that an image token was selected.


AI System:
The AI system is implemented within the For-Loop that creates the listeners for the squares.  The AI system uses a global variable to check
whether the AI system has been toggled to true or false.  A button on the display is used to control whether the AI system is turned on or off.  
An HTML element in the display is used to show whether the AI system is turned on or off.  This message is changed whenever the global variable
is turned on or off.

The AI system implements a simple algorithm.  The system checks the number of empty squares in the game board and then uses a random number
to select one of the empty squares on the board.  The square is then selected and the token or image from the AI system is placed in the square.
The AI system is implemented when a listener registers a click event, processes the player's move, and then the AI system selects its square.
As a future enhancement, a more sophisticated AI system can be considered that uses an algorithm to select the best square.


Row, Column or Diagonal Changes Color for Winning Combination to Blue:
When a winning condition is encountered, the row, column, or diagonal that has the winning combination changes to a blue color.
This algorithm that determines the winning row, column, or diagonal is implemented inside the isPlayerWinner() algorithm that checks 
for the winning state.  If a winning state is encountered, then that row, column, or diagonal with the winning state is then
changed to a blue color.  A For-Loop was used to loop through the elements in the winning row, column, or diagonal to change the color.
This color change only works for text tokens and not for images.  This algorithm was implemented directly after each check.  The other
implementation in the init() function was to turn all text to black at the start of the game.  

There are limitations to this feature, however.  The code finds the first occurrence of a winning state and highlights that row, column, or diagonal
in a blue color.  If there is more than one winning combination, which can happen in tic-tac-toe, only the first winning combination found will
be changed to a blue color.  Another limitation is that this change of color is not stored in local storage.  Therefore, if the browser is refreshed
or the internet connection goes down, the winning combination is changed back to black when the page is reloaded.  Finally, it should be noted that
only text tokens are changed to a blue color.  The image tokens do not reflect a winning combination.  These limitations have been listed under the 
section for unsolved problems for future iterations.  This feature was the last feature implemented in the tic-tac-toe game.


Unsolved Problems for Future Iterations:
Here are some unsolved problems that will be solved with future iterations of the code:

	- The AI system selects an open square randomly.  A more intelligence AI system should be built that uses a Min-Max algorithm
		in AI to determine the best square to select and a heuristic to determine the best game state among different choices.
	- The AI system can only be the "O" player.  A future iteration could have the AI system going first as the "X" player.
	- The images that can be used as tokens are only pre-selected images.  The system should provide a greater number of image tokens to select. 
	- The user should be able to upload their own image to use as their token on the tic-tac-toe board.
	- The game should have more subtle styling using colors to indicate the player whose turn it is.  The player could select not only
		their custom token but their color as well.  (For instance the game board could turn the selected color of the player whose
		turn it is to go.)  The gameboard would remain in the selected color of the player that wins.
	- The game should include hover effects and animation to make the screen more fun and interesting.
	- The game only shows one winning row, column, or diagonal when there could be several.  The next iteration of the game should
		highlight each winning row, column, or diagonal on the board and not just the first one encountered in the algorithm.
	- The blue color used to show a winning row, column, or diagonal only works with text tokens and not image tokens.  This should be updated
		to show a winning state with image tokens.
	- The blue color does not persist after a refresh of the browser.  This feature to use local storage could be implemented.
	- The game could support larger tic-tac-toe boards (i.e. 16 or 25 squares).
	- The game could use websockets so that two players playing on different devices can play the same tic-tac-toe game.
	- A text system could be developed for two players to communicate after the ability to play the game from two different devices is implemented.

