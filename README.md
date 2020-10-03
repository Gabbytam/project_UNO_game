# project_one

## App Demo:
https://gabbytam.github.io/project_one/

### Game Concept: 
I chose to make uno the card game! 
* Game starts with a shuffled deck of cards that including color and wild cards with number or special values
* Beginning of game, each player is dealt 7 cards, and then the top card is put down to begin game
* Players take turns viewing and putting down their cards depending on what the current top card is
    * A card is playable if it is the same type/color, value, or a wild card
    * If you don't have a playable card in your hand, draw card from draw pile until you do 
        * Player will be alerted if they try to click on a card that cannot be played 
* Card types: 
    * Number values have no special effect 
    * Rvs: reverse, doesn't do anything for two player uno but is a card type in original game
    * Skip: Player who puts down skip card will get to skip over the next players turn, putting down at least 2 cards in a row
    * +2: adds 2 cards to the hand of the opposite player 
    * Wild cards can be played at any point and give you the option of switching the type/color at play. User is prompted in the message board to interact with game and click on a color box of their choice 
        * Wild Card +4: type/color change and adds 4 cards to opponent's hand 
* Game is won when a player has no more cards in their hand 
    * In the spirit of UNO, the game displays a message saying which player has UNO (one card left)
* At the end of a won game, user is prompted in message board to play again and if so, a score board will pop up in browser 
* Extras: 
    * A rules button that can be clicked and dismissed to display game rules
    * Hint button that will make cards in hand that can be played, glow (nothing happens if nothing in your hand can be played)
    * Game tally 

### Technologies Used
* HTML:
    * Mainly just divs nested in divs nested in divs
* CSS:
    * Lots of flexbox styling and margin fanaggling 
    * Gave ids and classes to nearly every html element to assign very specific styling 
    * New to me: 
        * positioning: absolute
        * boxShadow and text-shadow
        * use of em instead of px in some cases 
* JavaScript:
    * loops
    * if/ else if conditionals, lots and lots of those
    * global variables 
    * so many arrays
    * classes/objects
    * functions and nested functions 
    * setTimeOut
    * event listeners 
    * DOM manipulation 
    * New to me: 
        * removeEventListeners
        * event listener within an event listener 
* Credit: only code I could't quite grasp on my own was the shuffle function, so I used the backbone of someones code function from overstack: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array

### Approach Taken
My first plan of action was to be able to get functions to work in javascript. I was able to make several functions neccessary for the basics of the game to work, like making and shuffling a deck, dealing out cards, and designating a top card, all working with the console log.

Next step was to make visual and html elements for the cards. 

I spent a decent amount of time styling, mainly with flexbox in CSS. 

Originally I planned to use alerts and prompts within my code to get inputs from user but was adviced against that after the fact so I created a message board instead.

The rest was just adding more and more functionalit and multiple testing. Playing the game over and over was the best way for me to find minor bugs. What was really useful was typing directly into the console in the browser instead of coding in console.logs

Personal techniques: 
* I found it productive to take breaks and work on styling when I needed a pause from JS
* I typed up a lot of ideas in my notes on my phone when I thought of something that might work 
* Big on commenting whay every line of code does. When I get something to work I want to remember why and how it works or why it needs to be there. It helps me spot out code bugs too. 

### Installation Instructions
* beginning of game runs on its own using setTimeOut until it needs user to make moves, just click events 

### Unsolved Problems
* The biggest bug that I'm aware of that I couldn't, for the life of me, figure out is _sometimes_ the reshuffle function doesn't work. It always worked the first time, often on the 2nd and 3rd time around but in random cases my drawPile array would grab the top card at some point (could not track where) and then the arrayForAllCards would not be in line with the drawPile array, leading to further mishaps. 
* Also couldn't figure out how to remove event listeners from the players cards when they choose a wild card and get prompted. Code expects user to click on a color but if they accidentally click on a different card at hand, the whole game gets off track. 
* For styling, I got it to look how I want but not sure I did it the best way. I ended up using a lot of divs inside divs to get things to both stack and line up in rows.  

### Other Notes
* I apologize for the obscene amount of code... I tried my best to keep it clear and non repatative to the best of my ability.
* I think perhaps I may have bitten off more than I could chew with this game. The basic steps were pretty straight forward, just using multiple if/else if statements and for loops, but the more I added functions the more I would find little things bugs that required fixing so it was a lot of just fixing small bugs. 
    * It also seemed each time I played the game I would figure something else that wasn't working properly.
* I thought it was a good idea to use objects/classes but I think I didn't have enough practice with them to use them fully to their advantage 
* Stretch goals: 
    * I had hopes to work with canvas and be able to code in movement that you can see, like watch a card slide from the deck to a pile. Everything else took me sooooo long that I didn't have time to devote to adding that functionality. (I still hope to learn to do that though).