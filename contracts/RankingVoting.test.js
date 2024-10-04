const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RankedChoiceVoting", function () {
  async function deployRankedChoiceVotingFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const RankedChoiceVoting = await ethers.getContractFactory("RankedChoiceVoting");
    const votingDuration = 3600; // 1 hour
    const rankedChoiceVoting = await RankedChoiceVoting.deploy(votingDuration);

    return { rankedChoiceVoting, owner, addr1, addr2, votingDuration };
  }

  describe("Deployment", function () {
    it("Should deploy and set the voting period", async function () {
      const { rankedChoiceVoting, votingDuration } = await loadFixture(deployRankedChoiceVotingFixture);
      const endTime = await rankedChoiceVoting.votingEndTime();
      expect(endTime).to.be.closeTo(BigInt(Math.floor(Date.now() / 1000) + votingDuration), BigInt(5));
    });
  });

  describe("Adding Candidates", function () {
    it("Should allow adding a candidate", async function () {
      const { rankedChoiceVoting } = await loadFixture(deployRankedChoiceVotingFixture);
      await rankedChoiceVoting.addCandidate("Candidate 1");
      const candidate = await rankedChoiceVoting.candidates(1);
      expect(candidate.name).to.equal("Candidate 1");
    });

    it("Should increment totalCandidates when adding candidates", async function () {
      const { rankedChoiceVoting } = await loadFixture(deployRankedChoiceVotingFixture);
      await rankedChoiceVoting.addCandidate("Candidate 1");
      await rankedChoiceVoting.addCandidate("Candidate 2");
      expect(await rankedChoiceVoting.totalCandidates()).to.equal(2);
    });

    it("Should emit CandidateAdded event", async function () {
      const { rankedChoiceVoting } = await loadFixture(deployRankedChoiceVotingFixture);
      await expect(rankedChoiceVoting.addCandidate("Candidate 1"))
        .to.emit(rankedChoiceVoting, "CandidateAdded")
        .withArgs(1, "Candidate 1");
    });
  });

  describe("Voting", function () {
    it("Should allow users to cast ranked votes", async function () {
      const { rankedChoiceVoting, addr1 } = await loadFixture(deployRankedChoiceVotingFixture);
      await rankedChoiceVoting.addCandidate("Candidate 1");
      await rankedChoiceVoting.addCandidate("Candidate 2");
      await rankedChoiceVoting.connect(addr1).vote([2, 1]);

      const hasVoted = await rankedChoiceVoting.voters(addr1.address);
      expect(hasVoted).to.be.true;

      // We can't check rankedCandidates directly from the voters mapping
      // Let's add a getter function in the contract to retrieve this information
      const voterInfo = await rankedChoiceVoting.getVoterInfo(addr1.address);
      expect(voterInfo.rankedCandidates).to.deep.equal([2n, 1n]);
    });

    it("Should not allow voting after the voting period", async function () {
      const { rankedChoiceVoting, addr1 } = await loadFixture(deployRankedChoiceVotingFixture);
      await rankedChoiceVoting.addCandidate("Candidate 1");
      await rankedChoiceVoting.addCandidate("Candidate 2");

      // Fast-forward time
      await ethers.provider.send("evm_increaseTime", [3601]);
      await ethers.provider.send("evm_mine");

      await expect(rankedChoiceVoting.connect(addr1).vote([2, 1]))
        .to.be.revertedWith("Voting period has ended");
    });

    it("Should not allow voting twice", async function () {
      const { rankedChoiceVoting, addr1 } = await loadFixture(deployRankedChoiceVotingFixture);
      await rankedChoiceVoting.addCandidate("Candidate 1");
      await rankedChoiceVoting.addCandidate("Candidate 2");
      await rankedChoiceVoting.connect(addr1).vote([2, 1]);

      await expect(rankedChoiceVoting.connect(addr1).vote([1, 2]))
        .to.be.revertedWith("You have already voted");
    });
  });

  describe("Running Election", function () {
    it("Should not allow running election before voting period ends", async function () {
      const { rankedChoiceVoting } = await loadFixture(deployRankedChoiceVotingFixture);
      await expect(rankedChoiceVoting.runElection())
        .to.be.revertedWith("Voting period has not ended");
    });

    // Add more tests for runElection() functionality
  });

  // Add more test cases for other functions like getRemainingTime(), etc.
});
