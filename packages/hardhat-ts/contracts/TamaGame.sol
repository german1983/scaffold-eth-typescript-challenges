pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/math/SafeMath.sol";



contract TamaActions  {
//to do: add events for a log

//thinking this is what the character struct will look like
//ipfsURL is there so we can swap it during upgrade function
//lvl will be based on xp total -- lvl 1 = xp > 10, lvl 2 xp > 20 and so on
//the character will be able to be upgraded once it reaches certain exp thresshold
//hungry may need to be offchain, even tho its a state it might be expensive

uint public characterID;

struct Character {
    uint xp; 
    uint lvl;
    string ipfsURL;
    bool hungry;

}

Characters[] public characters;

constructor public () {}
uint foodCounter = block.timestamp + 6 hours;
uint hungryCounter = block.timestamp + 12 hours;


//eventually this will consume an item
//currently each food gives 5 exp
function feed() 
public returns (uint) {   

characters[characterID].xp = characters[characterID].xp + 5;
    characters[characterID].hungry = !characters[characterID].hungry;
    return (characters[characterID].xp);    
}

//this function will check for level and let the user upgrade their character 

function upgrade1()
public returns (uint) {
//change below string to error above to save gas
require (characters[characterID].xp > 20, "Not enough EXP. Feed your character more to gain exp!")

characters[characterID].ipfsURL = "yeet";//new ipfsurl

//needs function that re-renders the user character, will inherit traits

}
}
