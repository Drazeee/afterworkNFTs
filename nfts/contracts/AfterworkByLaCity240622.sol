// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AfterworkByLaCity240622 is ERC721, Ownable {
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    uint256 public totalSupply = 0;

    mapping(address => uint256) public balances;

    string public baseURI =
        "https://assolacity.draze.fr/assets/nfts/AfterWorkByLaCity240622/";

    constructor()
        ERC721("Afterwork by LaCity - 24/06/22", "AW LACITY 24/06/22")
    {}

    function drop(address targetAddress) public {
        require(msg.sender == owner(), "not allowed");
        require(balances[targetAddress] == 0, "no tokens to drop");
        require(totalSupply < 3000, "too many nfts");
        balances[targetAddress]++;
        _mint(targetAddress, totalSupply++);
    }

    function getBalance(address targetAddress) public view returns (uint256) {
        return balances[targetAddress];
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, toString(tokenId), ".json"));
    }

    uint256 buildersSupply = 0;

    function dropForBuilders(address targetAddress) public {
        require(msg.sender == owner(), "not allowed");
        _mint(targetAddress, 3000 + buildersSupply++);
    }
}
