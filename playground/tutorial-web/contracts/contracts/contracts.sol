pragma solidity ^0.5.4;

contract Contracts {
    uint public count = 0;

    struct PersonInfo {
        uint id;
        string name;
        string email;
        bool rich;
    }

    constructor() public {
        createPerson('liang', 'liangniangbaby@gmail.com', false);
    }

    mapping(uint => PersonInfo) public persons;

    function createPerson(string memory _name, string memory _email, bool _rich) public {
        persons[count] = PersonInfo(count, _name, _email, _rich);
        count++;
    }

}