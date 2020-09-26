console.log('(u-no) what it isssss');
//variables for all the card types and values 
const cardType= ['red', 'yellow', 'green', 'blue'];
const cardValue= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'switch', 'reverse', '+2'];
const specialCardValue= ['Wild Card', 'Wild Card +4'];
let drawPile;
let whosTurn= 'player1';
//initialize empty arrays for the player's cards 
let player1Cards= [];
let player2Cards=[];

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
        //for(let k= 0; k<2; k++){ //makes it so there can be 2 of each card
            for(let i= 0; i<cardType.length; i++){ //loops through the different color cards 
                for(let j= 0; j<cardValue.length; j++){ //loops through different available values for each color, because its a nested loop
                    let card= new Card(cardType[i], cardValue[j]); //creating a new card object that calls on our Card class, passing in the current cardType for the type and the cardValue for the value
                    this.deckOfCards.push(card); //adds this newly made object into our deckOfCards array 
                }
            }
        //}   
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
        // seeAllCards.style.position= 'absolute'; //makes all the cards stack on top of each other
        seeAllCards.append(cardInfo); //add the h1 with info onto the card div 
        deckSpot.append(seeAllCards); //then append the card to the existing html div so we can see it in the browser
    } 
}

//FUNCTION THAT DEALS OUT THE CARDS 
//use this as a callback function for an event listener 
const dealCards= ()=> {
    //each player gets 7 cards to start 
    for(let i=0; i<14; i++){ //loop 14 times 
        console.log('this is how the 4 loop runs through the shuffled cards array', newDeck.shuffledCards[i]);
        if(i%2== 0){ //check if i is even number. Way of switching off cards when dealing to 2 players
            player1Cards.push(newDeck.shuffledCards[i]); //add card to array for Player1
        } else if(i%2== 1){ //check if i is odd number
            player2Cards.push(newDeck.shuffledCards[i]); //add card to array for Player2
        }
        //newDeck.shuffledCards.shift(); //removes the card from beginning of array, resembles dealing them out, which would take the dealed out cards away from the shuffled deck 
    }
    newDeck.shuffledCards.splice(0, 14); //remove the cards from shuffledCards array AFTER the for loop is running so it doesnt mess with the count of the for loop
    drawPile= newDeck.shuffledCards; //set drawPile equal to the current state of shuffledCards (the shuffled cards minus the cards that were dealt out) 
    console.log('cards for player 1', player1Cards);
    console.log('cards for player 2', player2Cards);
    //console.log('this is the remaining deck', newDeck.shuffledCards); //same as below
    console.log('this is the drawPile', drawPile); //same as above
}

//FUNCTION THAT SHOWS CARDS AT BOTTOM AND PUTS THEM IN THE VIEW CARDS DIV
const showCards= ()=> {
        //create visable cards for the players with div elements and inner text their values, maybe down the line figure out how to use images instead
    if(whosTurn=== 'player1'){ //to make cards for player1
       //code to show player ones cards in the viewCard 
    } else if(whosTurn=== 'player2'){
        //code to show player twos cards in the viewCard
    }
}


//FUNCTION THAT REMOVES CARD(S) FROM DRAW PILE
const removeCard= ()=> {
    drawPile.shift();
    //maybe add a conditional that checks if person put a +2 or +4, in that case, splice out 2 or 4 cards from beginning of array
    //add a while statement to check if there are items in drawPile array
        //if not, reshuffle the cards 
}

//FUNCTION THAT WILL PUT TOP CARD DOWN
const startCard= ()=> {
    //we're using drawPile to make the code make more sense, but we could also just use newDeck.shuffledCards because that value as it continues through code updates 
   
    //rule is that if top card is one of the wild cards, draw another card as the start card 
    if(drawPile[0].type.includes('Wild')){ //checks the type of the first card in the drawPile to see if it includes the string, Wild, and if so:
        console.log('That cant be your start card...sorry');
        drawPile.push(drawPile[0]); //first, move that card to the end of the array so it can be used later
        removeCard();
        //drawPile.shift(); //second, remove it from the beginning of the drawPile array
        topCard=drawPile[0]; //third, set the top card to the NEW first card in the drawPile array
    } else { //for any card that isnt type 'Wild'
        topCard=drawPile[0];
        removeCard(); //use removeCard function to do what code below does
        //drawPile.shift(); //make sure to remove that card from the drawPile
    }
    console.log('this is the starting/top card', topCard); //able to access variable without declaring?? why
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
    dealCards();
    //showCards();//check to see if show card function is working 
}

playGame(); //invoke playGame function, here just for trial and error 

document.addEventListener('DOMContentLoaded', ()=> {
    //first show rules of game then ask if they want to play
        //if yes, run play game function    
})