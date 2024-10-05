// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RankedChoiceVotingWithHash {
    struct Candidate {
        uint256 voteCount; // First-choice votes
    }

    address public admin;
    uint256 public totalCandidates;
    bool public electionFinalized;

    mapping(uint256 => Candidate) public candidates;  // Candidate ID -> Candidate details
    mapping(bytes32 => bool) public commitments;      // Track used commitments (hashed voter addresses)

    event CandidateAdded(uint256 candidateId, address candidateAddress, string name, string vision, string mission);
    event VoteCasted(bytes32 commitment, uint256[] rankedVotes);  // Emit full ranked votes in the event
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

    // Admin adds confirmed candidates and logs their vision & mission via events (no on-chain storage)
    function addCandidate(
        string memory _name,
        address _candidateAddress,
        string memory _vision,
        string memory _mission
    ) public onlyAdmin {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_candidateAddress != address(0), "Invalid address");

        // Emit candidate details along with vision and mission in an event
        emit CandidateAdded(totalCandidates, _candidateAddress, _name, _vision, _mission);

        totalCandidates++;
    }

    // Voter submits their full ranked votes with off-chain hashed commitment (address hash)
    function submitVote(uint256[] calldata rankedVotes, bytes32 commitment) public notFinalized {
        require(!commitments[commitment], "You have already voted");  // Ensure voter hasn't voted
        require(rankedVotes.length == totalCandidates, "Invalid number of candidates ranked");

        // Emit ranked votes without storing them on-chain
        emit VoteCasted(commitment, rankedVotes);

        // Only update the first-choice vote count on-chain to reduce gas cost
        candidates[rankedVotes[0]].voteCount++;

        commitments[commitment] = true;  // Track commitment to prevent duplicate voting
    }

    // Admin finalizes the election and locks further voting
    function finalizeElection() public onlyAdmin {
        electionFinalized = true;
        emit ElectionFinalized();
    }

    // Optional: Announce the winner (after tallying)
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
}
