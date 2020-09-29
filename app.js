console.log('(u-no) what it isssss');
//variables for all the card types and values 
const cardType= ['red', 'yellow', 'green', 'blue'];
const cardValue= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'switch', 'reverse', '+2'];
const specialCardValue= ['Wild Card', 'Wild Card +4'];
let drawPile;
let whosTurn= 'player1';
//initialize empty arrays for the player's cards 
let player1Cards= []; //this used to see in console, can get rid of later 
let player2Cards=[]; //this used to see in console, can get rid of later
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
        seeAllCards.id= i;
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
       }
    } else if(whosTurn=== 'player2'){ //everything is the same as above if statement but for the other player
        whosCards.innerText= `Player 2's Cards, ${arrayForPlayer2.length}`;
        for(let i=0; i<arrayForPlayer2.length; i++){ 
            viewCard.append(arrayForPlayer2[i]);  
            arrayForPlayer2[i].style.position= 'static'; 
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

//FUNCTION THAT REMOVES CARD(S) FROM DRAW PILE
const removeCard= ()=> { //!!!!!HAVE TO DO ALL THIS FOR THE ARRAYOFALLCARDS
    console.log('heres the array of all cards', arrayOfAllCards);
    if(drawPile[0].value=== '+2'){ //special condition for +2 cards
        drawPile.splice(0,2); //signifies drawing 2 cards 
    } else if(drawPile[0].value=== '+4'){ //special condition for +4 cards 
        drawPile.splice(0,4); //signifies drawing 4 cards 
    } else {
        drawPile.shift(); //get rid of top card 
    }

    //code that does the same thing but for the card divs 
    //if(arrayOfAllCards[0])
    //add a while statement to check if there are items in drawPile array
        //if not, reshuffle the cards 
}

//FUNCTION THAT WILL PUT TOP CARD DOWN
const startCard= ()=> {
    //we're using drawPile to make the code make more sense, but we could also just use newDeck.shuffledCards because that value updates as it continues through code(I think)
   
    //rule is that if top card is one of the wild cards, draw another card as the start card 
    if(drawPile[0].type.includes('Wild')){ //checks the type of the first card in the drawPile to see if it includes the string, Wild, and if so:
        console.log('That cant be your start card...sorry');
        drawPile.push(drawPile[0]); //first, move that card to the end of the array so it can be used later
        arrayOfAllCards.push(arrayOfAllCards[0]); //mirror with card element 
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

//FUNCTION THAT ALLOWS PLAYER TO DRAW CARD
//run this function if someone clicks on the drawPile, give drawPile an event listener OR have it automatically run 
const drawCard= ()=> {
    //pick up top card and add it to players array
    if(whosTurn=== 'player1'){
        player1Cards.push(drawPile[0]);
        removeCard();
    } else if(whosTurn=== 'player2'){
        player2Cards.push(drawPile[0]);
        removeCard();
    }
    //write some statements that will check if the card is a +2 or a +4

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
    setTimeout(startCard, 9000);
}

playGame(); //invoke playGame function, here just for trial and error 

document.addEventListener('DOMContentLoaded', ()=> {
    //first show rules of game then ask if they want to play
        //if yes, run play game function    
})


