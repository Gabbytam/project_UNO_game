console.log('(u-no) what it isssss');
//variables for all the card types and values 
const cardType= ['red', 'yellow', 'green', 'blue'];
const cardValue= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'reverse', '+2'];
const specialCardValue= ['Wild Card', 'Wild Card +4'];
let drawPile;
let whosTurn= 'player1';
let topCard;
let topCardElement;
//initialize empty arrays for the player's cards 
let player1Cards= []; //this used to see in console 
let player2Cards=[]; //this used to see in console
//arrays for the visual cards, will be attached to div elements so we can get rid of above arrays later
let arrayOfAllCards= []; 
let arrayForPlayer1= [];
let arrayForPlayer2=[];

//MIGHT BE BETTER TO USE CLASS SO YOU CAN ACCESS TYPE AND VALUE 
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
            let card= new Card(specialCardValue[0], -1); //creates card using Card class passing in a specified type and value
            this.deckOfCards.push(card); //push that before moving on
            card= new Card(specialCardValue[1], '+4'); //same thing as above but for different type and value 
            this.deckOfCards.push(card);

        }
        //console.log(this.deckOfCards); //able to see our deckOfCards
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

//HERE IS WHERE WE USE/CALL OUR CLASSES AND CALL THEIR METHODS to make the deck of cards and shuffle them 
const newDeck= new Factory(); //have to instantiate(?) using Factory and set it to variable deck 
newDeck.makeDeck(); //call the makeDeck function on deck
// const allCards= newDeck.deckOfCards;
// console.log('this is all cards', allCards);
newDeck.shuffleDeck(newDeck.deckOfCards);//call shuffleDeck method on 
console.log(newDeck); //now we see that deck contains a filled deckOfCards array

//FUNCTION THAT CREATES VISABLE CARDS
const cardMaker= ()=> {
    for(let i= 0; i<newDeck.shuffledCards.length; i++){ //loops through the array that is all the shuffled cards 
        let seeAllCards= document.createElement('div');
        // seeAllCards.addEventListener('click', makeAMove);
        seeAllCards.id= i;
        seeAllCards.setAttribute('value', newDeck.shuffledCards[i].value); //give all visible cards a value attribute equal to the card value
        seeAllCards.classList.add('card'); //give a class to style
        //if else statements that will give elements a class name/ color depending on their type
        if(newDeck.shuffledCards[i].type=== 'red'){
            seeAllCards.classList.add('red');
        } else if(newDeck.shuffledCards[i].type=== 'yellow'){
            seeAllCards.classList.add('yellow');
        } else if(newDeck.shuffledCards[i].type=== 'green'){
            seeAllCards.classList.add('green');
        } else if(newDeck.shuffledCards[i].type=== 'blue'){
            seeAllCards.classList.add('blue');
        } else { //for the wild cards
            seeAllCards.classList.add('black');
        }
        let cardInfo= document.createElement('h1'); //create an element that can add the text info 
        cardInfo.innerText= `Type: ${newDeck.shuffledCards[i].type} Value: ${newDeck.shuffledCards[i].value}`;
        //seeAllCards.style.position= 'absolute'; //makes all the cards stack on top of each other
        seeAllCards.append(cardInfo); //add the h1 with info onto the card div 
        deckSpot.append(seeAllCards); //then append the card to the existing html div so we can see it in the browser
        arrayOfAllCards.push(seeAllCards); //adds all the newly created cards into an array so they can be accessed by other functions 
    } 
}
console.log('heres the array', arrayOfAllCards); //test

//FUNCTION THAT WILL MOVE PLAYER CARDS TO THEIR RESPECTIVE HOLDING CELLS
const moveCards= ()=> {
    if(whosTurn=== 'player1'){ //if its player2 turn, player1 cards need to go to holding cell
        for(let i=0; i<arrayForPlayer2.length; i++){
            spotTwo.append(arrayForPlayer2[i]); //move cards to holding cell
            arrayForPlayer2[i].style.position= 'absolute'; //change positioning back so cards stack 
        }
    } else if(whosTurn=== 'player2'){ //and if it is player1 turn, player2 cards need to go to holding cell
        for(let i=0; i<arrayForPlayer1.length; i++){
            spotOne.append(arrayForPlayer1[i]);
            arrayForPlayer1[i].style.position= 'absolute';
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
       }
    } else if(whosTurn=== 'player2'){ //everything is the same as above if statement but for the other player
        whosCards.innerText= `Player 2's Cards, ${arrayForPlayer2.length}`;
        for(let i=0; i<arrayForPlayer2.length; i++){ 
            viewCard.append(arrayForPlayer2[i]);  
            arrayForPlayer2[i].style.position= 'static'; 
            arrayForPlayer2[i].addEventListener('click', makeAMove);
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
    console.log('cards for player 1', player1Cards);
    console.log('cards for player 2', player2Cards);
    //console.log('this is the remaining deck', newDeck.shuffledCards); //same as below
    //console.log('this is the drawPile', drawPile); //same as above
}

//FUNCTION THAT WILL PUT TOP CARD DOWN
const startCard= ()=> {
    //we're using drawPile to make the code make more sense, but we could also just use newDeck.shuffledCards because that value updates as it continues through code(I think)
   
    //rule is that if top card is one of the wild cards, draw another card as the start card 
    if(drawPile[0].type.includes('Wild')){ //checks the type of the first card in the drawPile to see if it includes the string, Wild, and if so:
        console.log('That cant be your start card...sorry');
        drawPile.push(drawPile[0]); //first, move that card to the end of the array so it can be used later
        arrayOfAllCards.push(arrayOfAllCards[0]); //mirror with card element 
        deckSpot.append(arrayOfAllCards[0]); //have to add extra step for card visual so that the card element moves from top to bottom of deck
        drawPile.shift(); //second, remove it from the beginning of the drawPile array
        arrayOfAllCards.shift(); //mirror with card element 
        topCard=drawPile[0]; //third, set the top card to the NEW first card in the drawPile array
        topCardElement=arrayOfAllCards[0]; //mirror with card element 
    } else { //for any card that isnt type 'Wild'
        topCard=drawPile[0]; //top card is equal to first card in array
        topCardElement=arrayOfAllCards[0]; //mirror with card element 
        drawPile.shift(); //make sure to remove that card from the drawPile
        arrayOfAllCards.shift(); //mirror with card element 
    }
    console.log('this is the starting/top card', topCard); //able to access variable without declaring?? why
    console.log('this is top card element', topCardElement);
    usedCardSpot.append(topCardElement);
}
//startCard();//invoke the function //WILL ALSO PROBABLY BE PASSED INTO AN EVENT LISTENER 
//console.log(topCard); //can even access it outside of function?? HOW?? ASK THIS QUESTION 
//answer: It is Not Recommended to declare a variable without var keyword. It can accidently overwrite an existing global variable. Scope of the variables declared without var keyword become global irrespective of where it is declared. Global variables can be accessed from anywhere in the web page.


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
}

//FUNCTION THAT ALLOWS PLAYER TO DRAW CARD
//run this function if someone clicks on the drawPile, give drawPile an event listener OR have it automatically run
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
}

//FUNCTION THAT CHECKS TO SEE IF CARD CAN BE PLAYED
const checkCard= ()=> {
    console.log(event.currentTarget); //can access event target from this function, which is not the function attached to the event listener 
    
    //NESTED FUNCTION THAT WILL UPDATE THE TWO CARD ARRAYS WHEN A MOVE IS MADE FOR A SPECIFIED PLAYER
    function updateArray(){ 
        if(whosTurn=== 'player1'){
            let indexOfCard= arrayForPlayer1.indexOf(event.currentTarget); //finds the index of the card that MATCHES the card that was clicked, in the array of players cards
            arrayForPlayer1.splice(indexOfCard, 1); //remove that card from visible cards array
            player1Cards.splice(indexOfCard, 1); //also remove it from the array of card objects 
            console.log('heres the changed comp cards', player1Cards);
            console.log('heres the changed visible cards', arrayForPlayer1);
        } else if(whosTurn=== 'player2'){
            let indexOfCard= arrayForPlayer2.indexOf(event.currentTarget);  
            arrayForPlayer2.splice(indexOfCard, 1); 
            player2Cards.splice(indexOfCard, 1); 
            console.log('heres the changed comp cards', player2Cards);
            console.log('heres the changed visible cards', arrayForPlayer2);
        }
    }
    
    //NESTED FUNCTION THAT WILL CHANGE THE TOPCARD VARIABLE
    function updateTopCard() {
        let index;
        if(whosTurn=== 'player1'){
            index= arrayForPlayer1.indexOf(event.currentTarget);
            topCard= player1Cards[index];
        } else if(whosTurn=== 'player2'){
            index=arrayForPlayer2.indexOf(event.currentTarget);
            topCard= player2Cards[index];
        }
    }

    //conditions for if clicked card can be played
    if(event.currentTarget.classList[1]==='black'){ //class of 'black' means its a wild card and if you use a wild card you get to change the color/type at play. You can also play a wild card whenever 
        let changeColor= prompt('What color type would you like to change to?', 'Red/Yellow/Green/Blue'); //allows user to enter new color value
        //if user entered any of the appropriate colors 
        if(changeColor.toLowerCase()=== 'red'
        || changeColor.toLowerCase()=== 'yellow'
        || changeColor.toLowerCase()=== 'green'
        || changeColor.toLowerCase()=== 'blue'){
            event.currentTarget.classList.remove('black'); //gets rid of the class of 'black'
            event.currentTarget.classList.add(changeColor.toLowerCase()); //and updates it to the color the user chose 
        }
        usedCardSpot.append(event.currentTarget);
        updateTopCard();
        updateArray();
        topCardElement= event.currentTarget;

        //within the condition for wild card, check if its a +4 and if so, run the drawCard function 4 times 
        if(event.currentTarget.getAttribute('value')=== '+4'){
            for(let i=0; i<4; i++){
                addCard();
            }
        }
    } else if(event.currentTarget.classList[1]=== topCardElement.classList[1]){ //classList at index 1 is the class equal to the type
        console.log('card can be played');
        usedCardSpot.append(event.currentTarget);
        updateTopCard(); //do this before updating the array 
        updateArray();
        topCardElement= event.currentTarget; //change the topCardElement variable to equal the card that was picked
    } else if(event.currentTarget.getAttribute('value')=== topCardElement.getAttribute('value')){
        console.log('card CAN be played');
        usedCardSpot.append(event.currentTarget);
        updateTopCard(); 
        updateArray();
        topCardElement= event.currentTarget;
    } else {
        alert('That card cannot be played, try another card or draw a card');
    }
    console.log('top card element', topCardElement);
    console.log('top card', topCard);
    //after all that, do a separate check of the clicked card to see if it was a +2, and if so, run the addCard function twice 
    if(event.currentTarget.getAttribute('value')=== '+2'){
        console.log('you clicked a +2');
        for(let i=0; i<2; i++){
            addCard();
        }
    }
}

//FUNCTION THAT WILL RUN IF CARD IN VIEW CARD IS CLICKED 
const makeAMove=(event)=> {
    //console.log('current', event.currentTarget); //target only only grabs the header IN the div, we can use currentTarget to access the card div. could also use  event.path[1]
    checkCard();
    //after moves are made, if/else if statement will change whos turn it is 
    if(whosTurn==='player1'){
        whosTurn= 'player2';
    } else if(whosTurn=== 'player2'){
        whosTurn= 'player1';
    }
    showCards(); //call showCards function to swap who is allowed to play
}

//FUNCTION THAT SERVES AS PLAYING THE GAME
const playGame= ()=> {
    //make sure to use the classed and make a deck, then shuffle the deck. Currently that is being done in the call for it after the class is written but were going to want to move that down into the playGame function 
    //deal out cards 
    cardMaker();
    //CURRENTLY USING SETTIMEOUT JUST TO WATCH STEPS HAPPEN, WILL BE CHANGING THAT LATER
    setTimeout(dealCards, 3000); //instead of using setTimeout do an event listener for clicker, of deal cards button
    //dealCards();
    setTimeout(showCards, 6000);
    //showCards();
    setTimeout(startCard, 7000);
}

playGame(); //invoke playGame function, here just for trial and error 

document.addEventListener('DOMContentLoaded', ()=> {
    //first show rules of game then ask if they want to play
        //if yes, run play game function    
})


