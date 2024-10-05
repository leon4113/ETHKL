const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RankedChoiceVotingWithHash", function () {
  async function deployRankedChoiceVotingWithHashFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const RankedChoiceVotingWithHash = await ethers.getContractFactory("RankedChoiceVotingWithHash");
    const rankedChoiceVotingWithHash = await RankedChoiceVotingWithHash.deploy();

    return { rankedChoiceVotingWithHash, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      const { rankedChoiceVotingWithHash, owner } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      expect(await rankedChoiceVotingWithHash.admin()).to.equal(owner.address);
    });
  });

  describe("Adding Candidates", function () {
    it("Should allow admin to add a candidate", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await expect(rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address))
        .to.emit(rankedChoiceVotingWithHash, "CandidateAdded")
        .withArgs(0, addr1.address, "Candidate 1");
    });

    it("Should increment totalCandidates when adding candidates", async function () {
      const { rankedChoiceVotingWithHash, addr1, addr2 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 2", addr2.address);
      expect(await rankedChoiceVotingWithHash.totalCandidates()).to.equal(2);
    });

    it("Should not allow non-admin to add a candidate", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await expect(rankedChoiceVotingWithHash.connect(addr1).addCandidate("Candidate 1", addr1.address))
        .to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Voting", function () {
    it("Should allow users to submit votes", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address);
      const voteHash = ethers.keccak256(ethers.toUtf8Bytes("1,2,3"));
      
      await expect(rankedChoiceVotingWithHash.connect(addr1).submitVote(0, voteHash))
        .to.emit(rankedChoiceVotingWithHash, "VoteCasted")
        .withArgs(addr1.address, 0, voteHash);
    });

    it("Should not allow voting twice", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address);
      const voteHash = ethers.keccak256(ethers.toUtf8Bytes("1,2,3"));
      
      await rankedChoiceVotingWithHash.connect(addr1).submitVote(0, voteHash);
      await expect(rankedChoiceVotingWithHash.connect(addr1).submitVote(0, voteHash))
        .to.be.revertedWith("You have already voted");
    });

    it("Should not allow voting for non-existent candidate", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      const voteHash = ethers.keccak256(ethers.toUtf8Bytes("1,2,3"));
      
      await expect(rankedChoiceVotingWithHash.connect(addr1).submitVote(0, voteHash))
        .to.be.revertedWith("Invalid candidate ID");
    });
  });

  describe("Election Finalization", function () {
    it("Should allow admin to finalize the election", async function () {
      const { rankedChoiceVotingWithHash } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await expect(rankedChoiceVotingWithHash.finalizeElection())
        .to.emit(rankedChoiceVotingWithHash, "ElectionFinalized");
    });

    it("Should not allow non-admin to finalize the election", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await expect(rankedChoiceVotingWithHash.connect(addr1).finalizeElection())
        .to.be.revertedWith("Only admin can perform this action");
    });

    it("Should not allow voting after election is finalized", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address);
      await rankedChoiceVotingWithHash.finalizeElection();
      
      const voteHash = ethers.keccak256(ethers.toUtf8Bytes("1,2,3"));
      await expect(rankedChoiceVotingWithHash.connect(addr1).submitVote(0, voteHash))
        .to.be.revertedWith("Election has been finalized");
    });
  });

  describe("Winner Announcement", function () {
    it("Should allow admin to announce the winner", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address);
      await rankedChoiceVotingWithHash.finalizeElection();
      
      await expect(rankedChoiceVotingWithHash.announceWinner(0))
        .to.emit(rankedChoiceVotingWithHash, "WinnerAnnounced")
        .withArgs(0);
    });

    it("Should not allow announcing winner before election is finalized", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address);
      
      await expect(rankedChoiceVotingWithHash.announceWinner(0))
        .to.be.revertedWith("Election not finalized yet");
    });
  });

  describe("Getter Functions", function () {
    it("Should return correct vote count for a candidate", async function () {
      const { rankedChoiceVotingWithHash, addr1, addr2 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address);
      const voteHash = ethers.keccak256(ethers.toUtf8Bytes("1,2,3"));
      
      await rankedChoiceVotingWithHash.connect(addr2).submitVote(0, voteHash);
      expect(await rankedChoiceVotingWithHash.getCandidateVoteCount(0)).to.equal(1);
    });

    it("Should return correct vote hash for a voter", async function () {
      const { rankedChoiceVotingWithHash, addr1 } = await loadFixture(deployRankedChoiceVotingWithHashFixture);
      await rankedChoiceVotingWithHash.addCandidate("Candidate 1", addr1.address);
      const voteHash = ethers.keccak256(ethers.toUtf8Bytes("1,2,3"));
      
      await rankedChoiceVotingWithHash.connect(addr1).submitVote(0, voteHash);
      expect(await rankedChoiceVotingWithHash.getVoterVoteHash(addr1.address)).to.equal(voteHash);
    });
  });
});