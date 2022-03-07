pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT

import "./character.sol";
import "./Safemath.sol";


contract TamaGame  {
//to do: add events for a log

using SafeMath for uint;

mapping(address => Character) private characters;

//ipfsURL could potentially be swapped on lvl up
//lvl will be based on xp total -- lvl 1 = xp > 10, lvl 2 xp > 20 and so on
//the character will be able to be upgraded once it reaches certain exp threshhold
//hungry may need to be offchain, even tho its a state it might be expensive

bool public hungry;
uint foodCounter = block.timestamp + 6 hours;
uint hungryCounter = block.timestamp + 12 hours;

//give char stats
function createCharacter (string memory name) public { 
   characters[msg.sender] = new Character(name);

   
} 


//eventually this will consume an item
//currently each food gives 5 exp
function feed() 
public returns (uint) {     
uint oldXP = characters[msg.sender].getXP();
uint newXP = oldXP.add(2);

characters[msg.sender].addXP();
return characters[msg.sender].getXP();
       
}

//this function will check for level and let the user upgrade their character 

function upgrade1()
public returns (uint) {
//change below string to error above to save gas
//require (characters[characterID].xp > 20, "Not enough EXP. Feed your character more to gain exp!")


//new ipfsurl

//needs function that re-renders the user character, will inherit traits

}
}