pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT

import "./Safemath.sol";
contract Character {

    using SafeMath for uint;


    address private _game;

    string private name;
    uint private xp;

    modifier isGame {
        require(msg.sender == _game, "Request did not come from the game");
        _;
    }

    constructor(string memory _name) public {
    _game = msg.sender;
    name = _name;
    xp = 0;
    }

    function getName() public view returns (string memory) {
        return (name);

    }
    
    function getXP() public view returns (uint) {
            return xp;
    }

    function addXP() public view returns (uint) {
        uint newXP = 5;

        return xp.add(newXP);
    }

    function setXP(uint _xp) public isGame {
        xp = _xp;
    }
}