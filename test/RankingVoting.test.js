const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RankedChoiceVotingWithHash", function () {
  let RankedChoiceVotingWithHash;
  let rankedChoiceVoting;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    RankedChoiceVotingWithHash = await ethers.getContractFactory("RankedChoiceVotingWithHash");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new RankedChoiceVotingWithHash contract before each test
    rankedChoiceVoting = await RankedChoiceVotingWithHash.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      expect(await rankedChoiceVoting.admin()).to.equal(owner.address);
    });

    it("Should start with zero candidates", async function () {
      expect(await rankedChoiceVoting.totalCandidates()).to.equal(0);
    });
  });

  describe("Adding Candidates", function () {
    it("Should allow admin to add a candidate", async function () {
      await expect(rankedChoiceVoting.addCandidate("Candidate 1", addr1.address, "Vision 1", "Mission 1"))
        .to.emit(rankedChoiceVoting, "CandidateAdded")
        .withArgs(0, addr1.address, "Candidate 1", "Vision 1", "Mission 1");

      expect(await rankedChoiceVoting.totalCandidates()).to.equal(1);
    });

    it("Should not allow non-admin to add a candidate", async function () {
      await expect(
        rankedChoiceVoting.connect(addr1).addCandidate("Candidate 1", addr1.address, "Vision 1", "Mission 1")
      ).to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      // Add two candidates before each voting test
      await rankedChoiceVoting.addCandidate("Candidate 1", addr1.address, "Vision 1", "Mission 1");
      await rankedChoiceVoting.addCandidate("Candidate 2", addr2.address, "Vision 2", "Mission 2");
    });

    it("Should allow a voter to submit a vote", async function () {
      const commitment = ethers.keccak256(ethers.toUtf8Bytes(owner.address));
      await expect(rankedChoiceVoting.submitVote([0, 1], commitment))
        .to.emit(rankedChoiceVoting, "VoteCasted")
        .withArgs(commitment, [0, 1]);

      expect(await rankedChoiceVoting.getCandidateVoteCount(0)).to.equal(1);
    });

    it("Should not allow a voter to vote twice", async function () {
      const commitment = ethers.keccak256(ethers.toUtf8Bytes(owner.address));
      await rankedChoiceVoting.submitVote([0, 1], commitment);

      await expect(rankedChoiceVoting.submitVote([1, 0], commitment)).to.be.revertedWith("You have already voted");
    });

    it("Should not allow voting after election is finalized", async function () {
      await rankedChoiceVoting.finalizeElection();

      const commitment = ethers.keccak256(ethers.toUtf8Bytes(owner.address));
      await expect(rankedChoiceVoting.submitVote([0, 1], commitment)).to.be.revertedWith("Election has been finalized");
    });
  });

  describe("Finalizing Election", function () {
    it("Should allow admin to finalize the election", async function () {
      await expect(rankedChoiceVoting.finalizeElection())
        .to.emit(rankedChoiceVoting, "ElectionFinalized");

      expect(await rankedChoiceVoting.electionFinalized()).to.be.true;
    });

    it("Should not allow non-admin to finalize the election", async function () {
      await expect(rankedChoiceVoting.connect(addr1).finalizeElection())
        .to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Announcing Winner", function () {
    beforeEach(async function () {
      // Add two candidates and finalize the election before each winner announcement test
      await rankedChoiceVoting.addCandidate("Candidate 1", addr1.address, "Vision 1", "Mission 1");
      await rankedChoiceVoting.addCandidate("Candidate 2", addr2.address, "Vision 2", "Mission 2");
      await rankedChoiceVoting.finalizeElection();
    });

    it("Should allow admin to announce the winner", async function () {
      await expect(rankedChoiceVoting.announceWinner(0))
        .to.emit(rankedChoiceVoting, "WinnerAnnounced")
        .withArgs(0);
    });

    it("Should not allow non-admin to announce the winner", async function () {
      await expect(rankedChoiceVoting.connect(addr1).announceWinner(0))
        .to.be.revertedWith("Only admin can perform this action");
    });

    it("Should not allow announcing winner before finalizing election", async function () {
      const newVoting = await RankedChoiceVotingWithHash.deploy();
      await newVoting.addCandidate("Candidate 1", addr1.address, "Vision 1", "Mission 1");

      await expect(newVoting.announceWinner(0))
        .to.be.revertedWith("Election not finalized yet");
    });
  });
});