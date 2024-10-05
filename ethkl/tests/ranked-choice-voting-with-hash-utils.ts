import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  CandidateAdded,
  ElectionFinalized,
  VoteCasted,
  WinnerAnnounced
} from "../generated/RankedChoiceVotingWithHash/RankedChoiceVotingWithHash"

export function createCandidateAddedEvent(
  candidateId: BigInt,
  candidateAddress: Address,
  name: string
): CandidateAdded {
  let candidateAddedEvent = changetype<CandidateAdded>(newMockEvent())

  candidateAddedEvent.parameters = new Array()

  candidateAddedEvent.parameters.push(
    new ethereum.EventParam(
      "candidateId",
      ethereum.Value.fromUnsignedBigInt(candidateId)
    )
  )
  candidateAddedEvent.parameters.push(
    new ethereum.EventParam(
      "candidateAddress",
      ethereum.Value.fromAddress(candidateAddress)
    )
  )
  candidateAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return candidateAddedEvent
}

export function createElectionFinalizedEvent(): ElectionFinalized {
  let electionFinalizedEvent = changetype<ElectionFinalized>(newMockEvent())

  electionFinalizedEvent.parameters = new Array()

  return electionFinalizedEvent
}

export function createVoteCastedEvent(
  voter: Address,
  firstChoice: BigInt,
  voteHash: Bytes
): VoteCasted {
  let voteCastedEvent = changetype<VoteCasted>(newMockEvent())

  voteCastedEvent.parameters = new Array()

  voteCastedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "firstChoice",
      ethereum.Value.fromUnsignedBigInt(firstChoice)
    )
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam("voteHash", ethereum.Value.fromFixedBytes(voteHash))
  )

  return voteCastedEvent
}

export function createWinnerAnnouncedEvent(
  candidateId: BigInt
): WinnerAnnounced {
  let winnerAnnouncedEvent = changetype<WinnerAnnounced>(newMockEvent())

  winnerAnnouncedEvent.parameters = new Array()

  winnerAnnouncedEvent.parameters.push(
    new ethereum.EventParam(
      "candidateId",
      ethereum.Value.fromUnsignedBigInt(candidateId)
    )
  )

  return winnerAnnouncedEvent
}
