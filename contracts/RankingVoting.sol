// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RankedChoiceVoting {
    struct Candidate {
        uint256 candidateId;
        string name;
        uint256 voteCount;     // Number of first-preference votes
        bool eliminated;       // True if the candidate has been eliminated
    }

    struct Voter {
        bool hasVoted;
        uint256[] rankedCandidates;  // List of ranked candidate IDs by the voter
    }

    mapping(uint256 => Candidate) public candidates;  // Candidate ID -> Candidate
    mapping(address => Voter) public voters;          // Voter address -> Voter
    uint256 public totalCandidates;
    uint256 public totalVotes;
    address public owner;
    uint256 public voterCount;
    uint256 public votingEndTime;
    bool public electionFinalized;

    event CandidateAdded(uint256 candidateId, string name);
    event VoteCasted(address voter, uint256[] rankedCandidates);
    event CandidateEliminated(uint256 candidateId);
    event ElectionWinner(uint256 candidateId);
    event VotingPeriodSet(uint256 endTime);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _votingDuration) {
        owner = msg.sender;
        votingEndTime = block.timestamp + _votingDuration;
        emit VotingPeriodSet(votingEndTime);
    }

    // Add a candidate to the election
    function addCandidate(string memory _name) public onlyOwner {
        totalCandidates++;
        candidates[totalCandidates] = Candidate({
            candidateId: totalCandidates,
            name: _name,
            voteCount: 0,
            eliminated: false
        });

        emit CandidateAdded(totalCandidates, _name);
    }

    // Cast a ranked vote
    function vote(uint256[] memory _rankedCandidates) public {
        require(block.timestamp < votingEndTime, "Voting period has ended");
        require(!electionFinalized, "Election has been finalized");
        require(!voters[msg.sender].hasVoted, "You have already voted");
        require(_rankedCandidates.length == totalCandidates, "Rank all candidates");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].rankedCandidates = _rankedCandidates;

        // Add first preference vote to the first candidate in the ranked list
        candidates[_rankedCandidates[0]].voteCount++;
        totalVotes++;

        emit VoteCasted(msg.sender, _rankedCandidates);
    }

    // Run the election and find the winner
    function runElection() public onlyOwner returns (uint256) {
        require(block.timestamp >= votingEndTime, "Voting period has not ended");
        require(!electionFinalized, "Election has already been finalized");
        require(totalVotes > 0, "No votes cast yet");

        uint256 winner;
        while (true) {
            // Check if any candidate has more than 50% of the vote
            uint256 majority = totalVotes / 2;
            uint256 minVotes = totalVotes;
            uint256 candidateToEliminate = 0;


            for (uint256 i = 1; i <= totalCandidates; i++) {
                if (!candidates[i].eliminated && candidates[i].voteCount > majority) {
                    emit ElectionWinner(i);
                    return i;  // This candidate has won the election
                }

                // Find the candidate with the least votes
                if (!candidates[i].eliminated && candidates[i].voteCount < minVotes) {
                    minVotes = candidates[i].voteCount;
                    candidateToEliminate = i;
                }
            }

            // Eliminate the candidate with the fewest votes
            candidates[candidateToEliminate].eliminated = true;
            emit CandidateEliminated(candidateToEliminate);

            // Reallocate votes of eliminated candidate
            reallocateVotes();
        }

        electionFinalized = true;
        emit ElectionWinner(winner);
        return winner;
    }

    // Reallocate votes when a candidate is eliminated
    function reallocateVotes() internal {
        // Loop through all voters and update their next preferred candidate
        for (uint256 i = 1; i <= voterCount; i++) {
            address voterAddress = address(uint160(i));
            Voter storage voter = voters[voterAddress];
            if (voter.rankedCandidates.length > 0) {
                uint256 newPreference = getNextAvailablePreference(voter);
                if (newPreference != 0) {
                    candidates[newPreference].voteCount++;
                }
            }
        }
    }

    // Find the next preferred candidate that is not eliminated
    function getNextAvailablePreference(Voter storage voter) internal view returns (uint256) {
        for (uint256 i = 1; i < voter.rankedCandidates.length; i++) {
            uint256 candidateId = voter.rankedCandidates[i];
            if (!candidates[candidateId].eliminated) {
                return candidateId;
            }
        }
        return 0;
    }

    function findCandidateWithMostVotes() internal view returns (uint256) {
        uint256 maxVotes = 0;
        uint256 winningCandidate = 0;
        for (uint256 i = 1; i <= totalCandidates; i++) {
            if (!candidates[i].eliminated && candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winningCandidate = i;
            }
        }
        return winningCandidate;
    }

    function getVoterCount() public view returns (uint256) {
        return voterCount;
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= votingEndTime) return 0;
        return votingEndTime - block.timestamp;
    }

    function getVoterInfo(address _voter) public view returns (bool hasVoted, uint256[] memory rankedCandidates) {
        Voter storage voter = voters[_voter];
        return (voter.hasVoted, voter.rankedCandidates);
    }
}
