console.log('(u-no) what it isssss');
let newDeck; //make this a global variable before setting it to a new instance of a class
//variables for all the card types and values 
const cardType= ['red', 'yellow', 'green', 'blue'];
const cardValue= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'skip', 'rvs', '+2'];
const specialCardType= ['Wild Card', 'Wild Card +4'];
let drawPile;
let usedCards= [];
let whosTurn= 'player1';
let topCard;
let topCardElement;
//initialize empty arrays for the player's cards 
let player1Cards= []; 
let player2Cards=[]; 
//arrays for the visual cards, will be attached to div elements 
let arrayOfAllCards= []; 
let arrayForPlayer1= [];
let arrayForPlayer2=[];
let arrayOfUsedCards=[];
//create a p element message that can be changed depending on the case
let message= document.createElement('p');
let gameWon= false;
let player1Points= 0;
let player2Points= 0;

//first made a class Card that takes in 2 attributes, the type and value 
class Card {
    constructor(type, value){
        this.type= type;
        this.value= value;
    }
}
//then made a factory that connects the Card class within its method, it also provides arrays that represent decks
class Factory {
    constructor() {
        this.deckOfCards= [];
        this.shuffledCards= [];
    }
    makeDeck(){
        for(let k= 0; k<2; k++){ //makes it so there can be 2 of each card
            for(let i= 0; i<cardType.length; i++){ //loops through the different color cards 
                for(let j= 0; j<cardValue.length; j++){ //loops through different available values for each color, because its a nested loop
                    let card= new Card(cardType[i], cardValue[j]); //creating a new card object that calls on our Card class, passing in the current cardType for the type and the cardValue for the value
                    this.deckOfCards.push(card); //adds this newly made object into our deckOfCards array 
                }
            }
        }   
        for(let f=0; f<4; f++){ //need to make 4 of each of these cards
            let card= new Card(specialCardType[0], -1); //creates card using Card class passing in a specified type and value
            this.deckOfCards.push(card); //push that before moving on
            card= new Card(specialCardType[1], '+4'); //same thing as above but for different type and value 
            this.deckOfCards.push(card);

        }
    }
    shuffleDeck(deck){ //when shuffleDeck is called, our deckOfCards array is passed in. This function changes the value of deck of cards for some reason idk, cant figure it out. womp womp
        for(let i=0; i<deck.length; i++){ //loops through entire deckOfCards array
            let random= Math.floor(Math.random()* deck.length); //generates a new random number for every loop, up to the number of elements in deckOfCards array 
            const arrayElement= deck[i]; //array is equal to array element
            deck[i]= deck[random]; //set the current array element to an element at random, left takes value of right
            deck[random]= arrayElement;
        }
        this.shuffledCards= deck; //put shuffled deck equal to the shuffledCards array, even though it changes the original deckOfCards array 
    }
}

//FUNCTION THAT MAKES JS CARDS AND SHUFFLES THEM USING THE CLASSES
const makeJSDeck=()=>{
    newDeck= new Factory(); //have to instantiate using Factory and set it to variable deck 
    newDeck.makeDeck(); //call the makeDeck function on deck
    newDeck.shuffleDeck(newDeck.deckOfCards);//call shuffleDeck method on 
}

//FUNCTION THAT CREATES VISABLE CARDS
const cardMaker= ()=> {
    for(let i= 0; i<newDeck.shuffledCards.length; i++){ //loops through the array that is all the shuffled cards 
        let seeCard= document.createElement('div');
        seeCard.id= i;
        seeCard.setAttribute('value', newDeck.shuffledCards[i].value); //give all visible cards a value attribute equal to the card value
        seeCard.classList.add('card'); //give a class to style
        //if else statements that will give elements a class name/ color depending on their type
        if(newDeck.shuffledCards[i].type=== 'red'){
            seeCard.classList.add('red');
        } else if(newDeck.shuffledCards[i].type=== 'yellow'){
            seeCard.classList.add('yellow');
        } else if(newDeck.shuffledCards[i].type=== 'green'){
            seeCard.classList.add('green');
        } else if(newDeck.shuffledCards[i].type=== 'blue'){
            seeCard.classList.add('blue');
        } else { //for the wild cards
            seeCard.classList.add('black');
        }
        let cardInfo= document.createElement('h1'); //create an element that can add the text info 
        //special styling and text assignment depending on card
        if(newDeck.shuffledCards[i].value=== -1){
            cardInfo.innerText= 'Wild Card';
        } else if(newDeck.shuffledCards[i].value=== '+4'){
            cardInfo.innerText= 'Wild Card +4';
        } else {
            cardInfo.innerText= newDeck.shuffledCards[i].value;
        }
        if(newDeck.shuffledCards[i].value=== 'skip'
        || newDeck.shuffledCards[i].value=== 'rvs'){
            cardInfo.id= 'makeSmaller';
        } else if(newDeck.shuffledCards[i].value=== -1
        || newDeck.shuffledCards[i].value=== '+4'){
            cardInfo.id= 'evenSmaller';
        }
        seeCard.append(cardInfo); //add the h1 with info onto the card div 
        deckSpot.append(seeCard); //then append the card to the existing html div so we can see it in the browser
        arrayOfAllCards.push(seeCard); //adds all the newly created cards into an array so they can be accessed by other functions 
    } 
}

//FUNCTION THAT WILL MOVE PLAYER CARDS TO THEIR RESPECTIVE HOLDING CELLS
const moveCards= ()=> {
    if(whosTurn=== 'player1'){ //if its player2 turn, player1 cards need to go to holding cell
        for(let i=0; i<arrayForPlayer2.length; i++){
            spotTwo.append(arrayForPlayer2[i]); //move cards to holding cell
            arrayForPlayer2[i].style.position= 'absolute'; //change positioning back so cards stack 
            arrayForPlayer2[i].style.boxShadow= 'none'; //get rid of hint shadowing 
        }
    } else if(whosTurn=== 'player2'){ //and if it is player1 turn, player2 cards need to go to holding cell
        for(let i=0; i<arrayForPlayer1.length; i++){
            spotOne.append(arrayForPlayer1[i]);
            arrayForPlayer1[i].style.position= 'absolute';
            arrayForPlayer1[i].style.boxShadow= 'none'; 
        }
    }
}

//FUNCTION THAT SHOWS CARDS AT BOTTOM AND PUTS THEM IN THE VIEW CARDS DIV
//call this function everytime you switch whos turn it is 
const showCards= ()=> {
    while(viewCard.firstChild){ //will remove (in essense, switch) cards out of viewSpot div
        viewCard.removeChild(viewCard.firstChild);
    }
    moveCards(); //the showCards function is also responsible for moving the cards out of the viewCard div and back into its holding cell 
    if(whosTurn=== 'player1'){ 
        whosCards.innerText= `Player 1's Cards, ${arrayForPlayer1.length}`;//change the label to express whos cards were looking at 
       //move player1 cards to viewCard div
       for(let i=0; i<arrayForPlayer1.length; i++){ //card elements are inside this array so we have to loop and add one by one
        viewCard.append(arrayForPlayer1[i]); //accesses and adds singular array elements 
        arrayForPlayer1[i].style.position= 'static'; //we dont want the cards in the viewCard div to be stacked so we change the positioning 
        arrayForPlayer1[i].addEventListener('click', makeAMove); //put event listeners on the card when it is players turn and cards are shown 
        if(gameWon=== true){ //remove the card event listener once game has been won, no more moves can be made
            arrayForPlayer1[i].removeEventListener('click', makeAMove); 
        } 
       }
    } else if(whosTurn=== 'player2'){ //everything is the same as above if statement but for the other player
        whosCards.innerText= `Player 2's Cards, ${arrayForPlayer2.length}`;
        for(let i=0; i<arrayForPlayer2.length; i++){ 
            viewCard.append(arrayForPlayer2[i]);  
            arrayForPlayer2[i].style.position= 'static'; 
            arrayForPlayer2[i].addEventListener('click', makeAMove);
            if(gameWon=== true){
                arrayForPlayer2[i].removeEventListener('click', makeAMove);
            }
        }
    }
}

//FUNCTION THAT DEALS OUT THE CARDS 
//use this as a callback function for an event listener 
const dealCards= ()=> {
    for(let i=0; i<14; i++){ //loop 14 times 
        if(i%2== 0){ //check if i is even number. Way of switching off cards when dealing to 2 players
            player1Cards.push(newDeck.shuffledCards[i]); //add card to array for Player1
            spotOne.append(arrayOfAllCards[i]); //because this is the innitial dealing and its nobodys turn, we write this code in, instead of using moveCard function 
            arrayForPlayer1.push(arrayOfAllCards[i]);
        } else if(i%2== 1){ //check if i is odd number
            player2Cards.push(newDeck.shuffledCards[i]); //add card to array for Player2
            spotTwo.append(arrayOfAllCards[i]); 
            arrayForPlayer2.push(arrayOfAllCards[i]);
        }
    }
    newDeck.shuffledCards.splice(0, 14); //remove the cards from shuffledCards array AFTER the for loop is running so it doesnt mess with the count of the for loop
    arrayOfAllCards.splice(0, 14); //also have to remove from the array of html elements 
    drawPile= newDeck.shuffledCards; //set drawPile equal to the current state of shuffledCards (the shuffled cards minus the cards that were dealt out) 
}

//FUNCTION THAT WILL PUT TOP CARD DOWN
const startCard= ()=> {
    //rule is that if top card is one of the wild cards, draw another card as the start card 
    if(drawPile[0].type.includes('Wild')){ //checks the type of the first card in the drawPile to see if it includes the string, Wild, and if so:
        drawPile.push(drawPile[0]); //first, move that card to the end of the array so it can be used later
        arrayOfAllCards.push(arrayOfAllCards[0]); //mirror with card element 
        deckSpot.append(arrayOfAllCards[0]); //have to add extra step for card visual so that the card element moves from top to bottom of deck
        drawPile.shift(); //second, remove it from the beginning of the drawPile array
        arrayOfAllCards.shift(); //mirror with card element 
        startCard(); //run through this again for the case that there are several wild cards in a row
    } else { //for any card that isnt type 'Wild'
        topCard=drawPile[0]; //top card is equal to first card in array
        topCardElement=arrayOfAllCards[0]; //mirror with card element 
        drawPile.shift(); //make sure to remove that card from the drawPile
        arrayOfAllCards.shift(); //mirror with card element 
        usedCards.push(topCard); //adding topCard and topCardElement to arrays, needed for the reshuffle function 
        arrayOfUsedCards.push(topCardElement); 
    }
    usedCardSpot.append(topCardElement); //move the card element
}

//FUNCTION THAT WILL RESTOCK THE DECK PILE //to be checked before each draw from the deck 
const reshuffleDeck= ()=> {
    if(drawPile.length=== 0
    || arrayOfAllCards=== 0){//check if the drawPile has no more cards 
        usedCards.splice(usedCards.length-1, 1); //take out the last card in the usedCard, which signifies the topCard
        arrayOfUsedCards.splice(arrayOfUsedCards.length-1,1); //take out the last card in the arrayOfUsedCards, which signifies the topCardElement 
        //grab the used cards and both of the used card arrays and shuffle them
        for(let i=0; i<usedCards.length; i++){ 
            let random= Math.floor(Math.random()* usedCards.length); 
            const cardInArr= usedCards[i]; 
            const cardElemInArr= arrayOfUsedCards[i];
            usedCards[i]= usedCards[random]; 
            arrayOfUsedCards[i]= arrayOfUsedCards[random];
            usedCards[random]=cardInArr;
            arrayOfUsedCards[random]= cardElemInArr;
        }
        //update drawPile and arrayOfAllCards to now equal the cards from the used Card arrays
        drawPile=usedCards;
        arrayOfAllCards= arrayOfUsedCards;
        //make all the wildCards class back to black
        for(let i=0; i<arrayOfAllCards.length; i++){
            if(drawPile[i].type.includes('Wild')){
                for(let j=0; j<cardType.length; j++){ //find the color of the card (its class name) by iterating through cardType array and finding the match
                    if(arrayOfAllCards[i].classList[1]=== cardType[j]){
                        newColor= cardType[j]; //if it matches, set a variable to that color
                    }
                }
                arrayOfAllCards[i].classList.remove(`${newColor}`); //pass in that variable to remove it from that card
                arrayOfAllCards[i].classList.add('black'); //and set it back to black
            }
            deckSpot.append(arrayOfAllCards[i]); //after all that, append it
        }
        //reset usedCards and arrayOfUsedCards to only have top card in them
        usedCards= [];
        arrayOfUsedCards= [];
        usedCards.push(topCard);
        arrayOfUsedCards.push(topCardElement);
    }
}

//FUNCTION THAT REMOVES CARD(S) FROM DRAW PILE
const removeCard= ()=> { 
    drawPile.shift(); //get rid of top card 
    arrayOfAllCards.shift(); //mirror with card element 
}

//FUNCTION THAT ADDS CARD TO OPPONENTS CARDS 
const addCard= ()=> {
    //pick up top card and add it to opposite players array
    if(whosTurn=== 'player1'){
        player2Cards.push(drawPile[0]);
        arrayForPlayer2.push(arrayOfAllCards[0]);
        removeCard();
    } else if(whosTurn=== 'player2'){
        player1Cards.push(drawPile[0]);
        arrayForPlayer1.push(arrayOfAllCards[0]);
        removeCard();
    }
    reshuffleDeck(); //run this function that checks if deck is empty
}

//FUNCTION THAT ALLOWS PLAYER TO DRAW CARD //runs with click
const drawCard= ()=> {
    if(whosTurn=== 'player1'){
        player1Cards.push(drawPile[0]);
        arrayForPlayer1.push(arrayOfAllCards[0]);
        removeCard();
    } else if(whosTurn=== 'player2'){
        player2Cards.push(drawPile[0]);
        arrayForPlayer2.push(arrayOfAllCards[0]);
        removeCard();
    }
    clearMessage(); //want to clear the message if player draws a card because the message is no longer relevant 
    showCards(); //have to update your cards to show the newly added card 
    reshuffleDeck(); //call reshuffledeck function after a card is drawn 
}

//FUNCTION THAT CHECKS TO SEE IF CARD CAN BE PLAYED
const checkCard= ()=> {
    
    //NESTED FUNCTION THAT WILL UPDATE THE TWO CARD ARRAYS WHEN A MOVE IS MADE FOR A SPECIFIED PLAYER
    function updateArray(){ 
        if(whosTurn=== 'player1'){
            let indexOfCard= arrayForPlayer1.indexOf(event.currentTarget); //finds the index of the card that MATCHES the card that was clicked, in the array of players cards
            arrayForPlayer1.splice(indexOfCard, 1); //remove that card from visible cards array
            player1Cards.splice(indexOfCard, 1); //also remove it from the array of card objects 
        } else if(whosTurn=== 'player2'){
            let indexOfCard= arrayForPlayer2.indexOf(event.currentTarget);  
            arrayForPlayer2.splice(indexOfCard, 1); 
            player2Cards.splice(indexOfCard, 1); 
        }
    }
    
    //NESTED FUNCTION THAT WILL CHANGE THE TOPCARD VARIABLE
    function updateTopCard() {
        let index;
        if(whosTurn=== 'player1'){
            index= arrayForPlayer1.indexOf(event.currentTarget);
            topCard= player1Cards[index]; 
            usedCards.push(topCard); //update the usedCards array 
        } else if(whosTurn=== 'player2'){
            index=arrayForPlayer2.indexOf(event.currentTarget);
            topCard= player2Cards[index];
            usedCards.push(topCard);
        }
    }
   
    //conditions for if clicked card can be played
    if(event.currentTarget.classList[1]==='black'){ //class of 'black' means its a wild card and if you use a wild card you get to change the color/type at play. You can also play a wild card whenever 
        let wildCard= event.currentTarget;
        //event.currentTarget.removeEventListener('click', makeAMove); //remove event listener so it cant be clicked on.
        message.innerText= 'Please select the square of the color you would like to switch to.';
        message.style.fontSize= '25px';
        putMessage.append(message);
        //create clickable div boxes
        for(let c=0; c<cardType.length; c++){
            let choiceSquare= document.createElement('div');
            choiceSquare.classList.add('choiceSquare');
            choiceSquare.classList.add(cardType[c]);
            choiceSquare.addEventListener('click', changeWildCard);
            putSquare.append(choiceSquare);
        }
        function changeWildCard(e) {
            //code that switches up the classes 
            let colorChange= e.target.classList[1];
            wildCard.classList.remove('black'); //gets rid of the class of 'black'
            wildCard.classList.add(colorChange);
            usedCardSpot.append(wildCard);
            wildCard.style.boxShadow= 'none';
            wildCard.removeEventListener('click', makeAMove);
            topCardElement= wildCard; //assigning the topCard as the wildCard so it can be added to the arrayOfUsedCards
            arrayOfUsedCards.push(topCardElement); 
            //the following code is repeatative of the code within the makeMove function. We have to have it here as well tho because as we are waiting for a response from the user, the code in MakeMove runs through without waiting. 
            if(whosTurn==='player1'){
                whosTurn= 'player2';
                clearMessage();
            } else if(whosTurn=== 'player2'){
                whosTurn= 'player1';
                clearMessage();
            }
            showCards();
            checkWin();
            playAgain();
        }
        updateTopCard(); //these two call functions have to be outside the changeWildCard function because the refer to the currentTarget which needs to be the card not the box. It also works just fine because the code reaches this section before the turn is switched (which occurs after user makes a choice)
        updateArray();
        //within the condition for wild card, check if its a +4 and if so, run the drawCard function 4 times 
        if(event.currentTarget.getAttribute('value')=== '+4'){
            for(let i=0; i<4; i++){
                addCard();
            }
        }
    } else if(event.currentTarget.classList[1]=== topCardElement.classList[1]
    || event.currentTarget.getAttribute('value')=== topCardElement.getAttribute('value')){ //checking if value or type matches //classList at index 1 is the class equal to the type.
        usedCardSpot.append(event.currentTarget);
        event.currentTarget.style.boxShadow= 'none'; //if user chooses the card with the hint, remove the shadow style
        event.currentTarget.removeEventListener('click', makeAMove); //have to remove eventlistener so it cant be clicked from the usedCard pile and confuse the code 
        updateTopCard(); //do this before updating the array 
        updateArray();
        topCardElement= event.currentTarget; //change the topCardElement variable to equal the card that was picked
        arrayOfUsedCards.push(topCardElement); //update the arrayOfUsed cards to include the newest topCardElement 
    } else {
        message.innerText= 'That card cannot be played, try another card or draw a card';
        message.style.fontSize= '25px';
        putMessage.append(message);
    }
    event.currentTarget.style.position= 'absolute'; //change position style back to absolute so cards in used card spot stack 
}

//FUNCTION THAT WILL CLEAR MESSAGE BOARD
const clearMessage= ()=> {
    while(putMessage.firstChild){
        putMessage.removeChild(putMessage.firstChild);
    }
    while(putSquare.firstChild){
        putSquare.removeChild(putSquare.firstChild);
    }
}
//FUNCTION THAT WILL RUN IF CARD IN VIEW CARD IS CLICKED 
const makeAMove=(event)=> {
    //console.log('current', event.currentTarget); //target only only grabs the header IN the div, we can use currentTarget to access the card div. could also use  event.path[1]
    //at the beginning of each move, check if there's a message, if so, remove it
    clearMessage();
    checkCard();//call the checkCard function for play conditions
    if(arrayOfUsedCards[arrayOfUsedCards.length-1]=== event.currentTarget){ //checks if a card has been placed down/played before switching players and adding 2. 
        //if the card was played, do a separate check of the clicked card to see if it was a +2, and if so, run the addCard function twice 
        if(event.currentTarget.getAttribute('value')=== '+2'){
            for(let i=0; i<2; i++){
                addCard();
            }
        }
        if(event.currentTarget.getAttribute('value')=== 'skip'){ //before switching whos turn it is, check to see if a skip card was used, if so, player stays the same
            if(whosTurn==='player1'){
                whosTurn= 'player1';
                clearMessage();
            } else if(whosTurn=== 'player2'){
                whosTurn= 'player2';
                clearMessage();
            }
        } else { //if not, then switch player turns 
            if(whosTurn==='player1'){
                whosTurn= 'player2';
                clearMessage();
            } else if(whosTurn=== 'player2'){
                whosTurn= 'player1';
                clearMessage();
            }
        }
        checkWin(); //moved this function call up into the if because on the chance you have a wildCard AND uno, the check win message will clear out the message for user to choose what to change the wild card to
        playAgain();
    } 
    showCards(); //call showCards function to swap who is allowed to play  
}

//FUNCTION THAT CHECKS FOR A WIN, called for every move that is made 
const checkWin= ()=> {
    //put clearMessage() and other code after if/else if statements inside this if because we only want those things to happen if player gets uno or has won
    if(player1Cards.length<= 1
    || player2Cards.length<= 1){
        clearMessage();
        if(player1Cards.length=== 1){
            message.innerText= 'Player 1: UNO';
        } else if(player2Cards.length=== 1){
            message.innerText= 'Player 2: UNO';
        } 
        if(player1Cards.length=== 0){
            message.innerText= 'Player 1 has won the game!';
            gameWon= true;
            player1Points++;
        } else if(player2Cards.length=== 0){
            message.innerText= 'Player 2 has won the game!';
            gameWon= true;
            player2Points++;
        }
        message.style.fontSize= '35px';
        putMessage.append(message);
    } 
}

//FUNCTION THAT SERVES AS PLAYING THE GAME
const playGame= ()=> {
    makeJSDeck(); //get all the js cards made 
    setTimeout(()=> {
        message.innerText= 'Welcome to UNO';
        message.style.fontSize= '35px';
        putMessage.append(message);
    }, 1000);
    setTimeout(()=> {
        message.innerText= 'If you want to read the rules, click below.';
        message.style.fontSize= '30x';
        putMessage.append(message);
    }, 4000);
    setTimeout(cardMaker, 6000);
    setTimeout(dealCards, 9000); 
 
    setTimeout(startCard, 11000);
    setTimeout(showCards, 13000);
    
}

//THE FUNCTION THAT IS RUN IF SOMEONE CLICKS THAT THEY WANT TO PLAY AGAIN
const resetGame=()=> { 
    //reset almost everything to empty arrays basically hehe
    topCard;
    topCardElement;
    player1Cards= [];
    player2Cards=[]; 
    arrayForPlayer1= [];
    arrayForPlayer2=[];
    usedCards= [];
    arrayOfAllCards= [];
    arrayOfUsedCards=[];
    clearMessage();
    putButtons.removeChild(document.querySelector('#playAgain'));
    while(viewCard.firstChild){
        viewCard.removeChild(viewCard.firstChild);
    }
    while(putWin.firstChild){
        putWin.removeChild(putWin.firstChild);
    }
    //create elements to display win
    putWin.style.display= 'flex';
    let winHeader= document.createElement('h3');
    winHeader.innerText= 'Player Points';
    winHeader.id= 'winTitle';
    putWin.append(winHeader);
    let winTally= document.createElement('p');
    winTally.innerText= `Player 1: ${player1Points} \nPlayer 2: ${player2Points}`;
    putWin.append(winTally);
    gameWon= false; //before calling playGame, set gameWon back to false 
    playGame(); //recall playGame function
}

//FUNCTION THAT LETS USER DECIDE IF THEY WANT TO PLAY AGAIN 
const playAgain=()=> {
    if(gameWon=== true){
        //offer player to play again 
        let ask= document.createElement('p');
        ask.innerText= 'Would you like the play again?';
        putSquare.append(ask);
        //create a button that allows user to click that they want to play again
        let againButton= document.createElement('button');
        againButton.id= 'playAgain';
        putButtons.append(againButton);
        againButton.innerText= 'Play Again';
        againButton.addEventListener('click', resetGame);
    }
}

//FUNCTION THAT SHOWS THE GAME RULES IF RULES BUTTON IS CLICKED
const showRules= ()=> {
    clearMessage();
    let list= document.createElement('ul');
    putMessage.append(list);
    let rules= ['Each player starts with 7 cards', 'Select a card by clicking on it','Playable cards are of the same type or value', 'Wild Cards can be put down at any time', 'If you can not play any of the cards in your hand, draw a card until you can put one down' ,'Skip cards can be used to skip over the other player\'s turn', 'Win the game by getting rid of all of your cards', 'Clicking the "hint" button will make the playable cards glow'];
    for(let i= 0; i<rules.length; i++){ //create list items for every rule
        let li= document.createElement('li');
        li.innerText= rules[i];
        li.style.fontSize= '10px';
        list.append(li);
    }
    //create a button that gets rid of the rules 
    let exit= document.createElement('button');
    exit.innerText= 'Exit';
    exit.id= 'exit';
    exit.addEventListener('click', exitMessage);
    putButtons.append(exit);

    function exitMessage() { //the function that is run when exit button is clicked 
        clearMessage();
        putButtons.removeChild(document.querySelector('#exit'));

    }
}

//FUNCTION THAT WILL GIVE HINT IF ASKED 
const giveHint=()=> {
    //depending on player, cards that are able to be played will glow 
    if(whosTurn=== 'player1'){
        for(let i=0; i<arrayForPlayer1.length; i++){
            if(arrayForPlayer1[i].classList[1]=== topCardElement.classList[1]
            || arrayForPlayer1[i].getAttribute('value')=== topCardElement.getAttribute('value')
            || arrayForPlayer1[i].classList[1]==='black'){
                arrayForPlayer1[i].style.boxShadow= '10px 10px 10px 10px white';
            }
        }
    } else if(whosTurn=== 'player2'){
        for(let i=0; i<arrayForPlayer2.length; i++){
            if(arrayForPlayer2[i].classList[1]=== topCardElement.classList[1]
            || arrayForPlayer2[i].getAttribute('value')=== topCardElement.getAttribute('value')
            || arrayForPlayer2[i].classList[1]==='black'){
                arrayForPlayer2[i].style.boxShadow= '10px 10px 10px 10px white';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', ()=> { 
    playGame(); //invoke function to start game
    button.addEventListener('click', drawCard);
    rules.addEventListener('click', showRules);
    hint.addEventListener('click', giveHint);
})
