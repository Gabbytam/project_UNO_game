# project_one

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

### Approach Taken
* My first plan of action was to be able to get functions to work in javascript. I was able to make several functions neccessary for the basics of the game to work, like making and shuffling a deck, dealing out cards, and designating a top card, all working with the console log.
* Next step was to make visual and html elements for the cards. 
* I spent a decent amount of time styling, mainly with flexbox in CSS. 
* Originally I planned to use alerts and prompts within my code to get inputs from user but was adviced against that after the fact so I created a message board instead.
    * Adding messages to it was very simple but adding the portion that requires user imput took me a hot minute to figure out because of dealing with multiple event.targets and code running faster than a user can give an input. 
* The rest was just adding more and more functionalit and multiple testing. Playing the game over and over was the best way for me to find minor bugs.
    * What was really useful was typing directly into the console in the browser instead of coding in console.logs
* Personal techniques: 
    * I found it productive to take breaks and work on styling when I needed a pause from JS
    * I typed up a lot of ideas in my notes on my phone when I thought of something that might work 
    * Big on commenting whay every line of code does. When I get something to work I want to remember why and how it works or why it needs to be there. It helps me spot out code bugs too. 

### Installation Instructions
* beginning of game runs on its own using setTimeOut until it needs user to make moves, just click events 

### Unsolved Problems
* The only bug I'm aware of that I couldn't, for the life of me, figure out is _sometimes_ the reshuffle function doesn't work. It always worked the first time, often on the 2nd and 3rd time around but in random cases my drawPile array would grab the top card at some point (could not track where) and then the arrayForAllCards would not be in line with the drawPile array, leading to further mishaps. 
* For styling, I got it to look how I want but not sure I did it the best way. I ended up using a lot of divs inside divs to get things to both stack and line up in rows.  

### Other Notes
* I apologize for the obscene amount of code... I tried my best to keep it clear and non repatative to the best of my ability.
* I think perhaps I may have bitten off more than I could chew with this game. The basic steps were pretty straight forward, just using multiple if/else if statements and for loops, but the more I added functions the more I would find little things bugs that required fixing so it was a lot of just fixing small bugs. 
    * It also seemed each time I played the game I would figure something else that wasn't working properly.
* I thought it was a good idea to use objects/classes but I think I didn't have enough practice with them to use them fully to their advantage 
* I had hopes to work with canvas and be able to code in movement that you can see, like watch a card slide from the deck to a pile. Everything else took me sooooo long that I didn't have time to devote to adding that functionality. 
    * I still hope to learn to do that though. 