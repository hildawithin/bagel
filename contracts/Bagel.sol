pragma solidity 0.5.0;
import "./ContractReceiver.sol";
import "./SafeMath.sol";

contract ERC223Interface {

    uint public totalSupply;
    uint public remainingSupply;

    address public owner;
    
    function registerMe(string memory myName) public payable 
        returns (bool);

    function isRegistered(string memory name, address addr) 
        public view returns (bool);

    function balanceOf(string memory who) public view 
        returns (uint);

    function transfer(string memory from, string memory to, 
        uint value) public returns (bool);

    function transfer(string memory from, string memory to, 
        uint value, bytes memory data) public returns (bool);

    event Transfer(string from, string to, uint value, 
                   bytes data);
}

contract Bagel is ERC223Interface {
    using SafeMath for uint;

    struct User {
        address holder;
        uint balance;
    }
    mapping (string => User) internal users;

    constructor(uint _initialSupply) public {
        owner = msg.sender;
        totalSupply = _initialSupply;
        remainingSupply = _initialSupply;
    }

    function registerMe(string memory myName) public payable 
        returns (bool) {
            require(bytes(myName).length != 0);
            require(users[myName].holder == address(0));
            require(!isRegistered(myName, msg.sender));

            users[myName].holder = msg.sender;
            return true;
        }

    function claimBagel(string memory name, uint num) public payable returns (bool) {
        // token price is arbitrarily set stable, token price = 10000000000000000 <=> 1 bagel = 0.01 ether
        require(bytes(name).length != 0);
        require(isRegistered(name, msg.sender));
        uint value = num.mul(10000000000000000);
        require(msg.value == value);
        require(remainingSupply >= num);
        // require(transfer(admin, name, num))
        // if there is an admin, do not change '_balance' if the admin transfers token here

        remainingSupply = remainingSupply.sub(num);
        users[name].balance = users[name].balance.add(num);
        return true;
    }

    function isRegistered(string memory name, address addr) 
        public view returns (bool) {
            require(bytes(name).length != 0);
            return (users[name].holder==addr);
        }
        
    function isContract(address addr) 
        internal view returns (bool) {
            uint len;
            assembly {
                len := extcodesize(addr)
            }
            return (len>0);
        }

    function balanceOf(string memory who) public view 
        returns (uint) {
            require(bytes(who).length != 0);
            return users[who].balance;
        }

    function transfer(string memory from, string memory to, 
        uint value) public returns (bool) {
            require(bytes(from).length != 0 && bytes(to).length != 0);
            bytes memory empty;
            address addr_to = users[to].holder;
            require(addr_to != address(0));
            require(value > 0 && value <= users[from].balance);
            
            users[from].balance = users[from].balance.sub(value);
            users[to].balance =  users[to].balance.add(value);
            if (isContract(addr_to)) {
                ContractReceiver receiver = ContractReceiver(addr_to);
                receiver.tokenFallback(msg.sender, value, empty);
            }
            emit Transfer(from, to, value, empty);
            return true;
        }

    function transfer(string memory from, string memory to, 
        uint value, bytes memory data) public returns (bool) {
            require(data.length != 0 && bytes(from).length != 0 && bytes(to).length != 0);
            address addr_to = users[to].holder;
            require(addr_to != address(0));
            require(value > 0 && value <= users[from].balance);

             users[from].balance = users[from].balance.sub(value);
             users[to].balance = users[to].balance.add(value);
            if (isContract(addr_to)) {
                ContractReceiver receiver = ContractReceiver(addr_to);
                receiver.tokenFallback(msg.sender, value, data);
            }
            emit Transfer(from, to, value, data);
            return true;
        }

    // self destruct

    event Transfer(string from, string to, uint value, 
                   bytes data);
}