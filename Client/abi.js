export const abi = [
    {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_candidateAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_visionMission",
            "type": "string"
          }
        ],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "rankedVotes",
            "type": "uint256[]"
          },
          {
            "internalType": "bytes32",
            "name": "commitment",
            "type": "bytes32"
          }
        ],
        "name": "submitVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }      
];
