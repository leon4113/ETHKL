// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RankedChoiceVotingWithHash {
    struct Candidate {
        uint256 voteCount; // First-choice votes
    }

    struct Voter {
        bool hasVoted;
        bytes32 voteHash; // Hash of the ranked votes (stored on-chain)
    }

    address public admin;
    uint256 public totalCandidates;
    bool public electionFinalized;

    mapping(uint256 => Candidate) public candidates; // Candidate ID -> Candidate details
    mapping(address => Voter) public voters; // Track who has voted

    event CandidateAdded(uint256 candidateId, address candidateAddress, string name);
    event VoteCasted(address voter, uint256 firstChoice, bytes32 voteHash); // Emit the hash with the vote
    event ElectionFinalized();
    event WinnerAnnounced(uint256 candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier notFinalized() {
        require(!electionFinalized, "Election has been finalized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Admin adds confirmed candidates and logs info via events (no candidate storage)
    function addCandidate(string memory _name, address _candidateAddress) public onlyAdmin {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_candidateAddress != address(0), "Invalid address");

        emit CandidateAdded(totalCandidates, _candidateAddress, _name); // Log candidate info in an event
        totalCandidates++;
    }

    // Voter submits their first-choice vote and a hash of their ranked votes
    function submitVote(uint256 firstChoice, bytes32 rankedVoteHash) public notFinalized {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        require(firstChoice < totalCandidates, "Invalid candidate ID");

        voters[msg.sender] = Voter({
            hasVoted: true,
            voteHash: rankedVoteHash // Store the hash of the ranked votes on-chain
        });

        candidates[firstChoice].voteCount++; // Only update the first-choice vote count

        emit VoteCasted(msg.sender, firstChoice, rankedVoteHash); // Log vote submission and hash
    }

    // Admin finalizes the election and locks further voting
    function finalizeElection() public onlyAdmin {
        electionFinalized = true;
        emit ElectionFinalized();
    }

    // Optional: Announce the winner
    function announceWinner(uint256 winnerId) public onlyAdmin {
        require(electionFinalized, "Election not finalized yet");
        require(winnerId < totalCandidates, "Invalid candidate ID");

        emit WinnerAnnounced(winnerId);
    }

    // Get vote count for a candidate
    function getCandidateVoteCount(uint256 candidateId) public view returns (uint256) {
        require(candidateId < totalCandidates, "Invalid candidate ID");
        return candidates[candidateId].voteCount;
    }

    // Get the hash of a voter's ranked votes (for verification purposes)
    function getVoterVoteHash(address voterAddress) public view returns (bytes32) {
        require(voters[voterAddress].hasVoted, "Voter has not voted");
        return voters[voterAddress].voteHash;
    }
}
