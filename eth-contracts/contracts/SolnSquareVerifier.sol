// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

interface SquareVerifier {
    struct Proof {
        Pairing.G1Point a;
        Pairing.G1Point b;
        Pairing.G1Point c;
    }

    function verifyTx(Proof memory proof, uint256[2] memory input) external view returns (bool r);
}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is REITTOKEN {
    
    
// TODO define a solutions struct that can hold an index & an address
  struct Solution {
        address addr;
        uint256 index;

// TODO define an array of the above struct
Solution[] solutions;

// TODO define a mapping to store unique solutions submitted
mapping(uint256 => Solution) uniqueSolutions;

// TODO Create an event to emit when a solution is added
event SolutionAdded(address adddr, uint256 index);

squareVerifier verifier;
// TODO Create a function to add the solutions to the array and emit the event
function addSolution(address _addr, uint256 tokenId) public {
    solutions.push(Solution(_addr, tokenId));
    uniqueSolutions[tokenId] = Solution(_addr, tokenId);

    emit SolutionAdded(_addr, tokenId);
}

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
function mintNFT(uint256 tokenId, sqaureVerifier.Proof memory proof, uint256[2] memory input) public {
    require(uniqueSolutions[tokenId].addr === address(0), "Erro: Solution is not Unique");
    require(verifier.verifyTx(proof, input), "Error: Verification Failed. Cant Mint Token");

    addSolution(msg.sender, tokenId);
    _mint(msg.sender, tokenId);
}
