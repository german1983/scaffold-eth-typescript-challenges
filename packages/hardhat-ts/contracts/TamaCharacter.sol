pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT
import "./tama.sol";
import "./Safemath.sol";
contract Character {

    using SafeMath for uint;


    address private _game;

    string private name;
    uint private xp;

    uint private pastBlockTime;
    uint private birthday;

    uint public yearDuration = 5760; // Assuming 1 virtual year = 1 Real day 

    modifier isGame {
        require(msg.sender == _game, "Request did not come from the game");
        _;
    }

    constructor(string memory _name)  public  {
    _game = msg.sender;
    name = _name;
    xp = 0; 
    birthday = block.timestamp; 
    
    }

 

    function getName() public view returns (string memory) {
        return (name);

    }
    
    function getXP() public view returns (uint) {
            return xp;
    }

    function addXP() public payable  returns (uint) {
        uint newXP = 5;
        xp = xp + newXP;
        return xp;
    }
 function getAge() public view returns (uint age) {
 
  return  (block.number);
}

        function getBirthday() public view returns (uint) {
               
        
        return birthday;
    }
}