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
  name: string,
  visionMission: string
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
  candidateAddedEvent.parameters.push(
    new ethereum.EventParam(
      "visionMission",
      ethereum.Value.fromString(visionMission)
    )
  )

  return candidateAddedEvent
}

export function createElectionFinalizedEvent(): ElectionFinalized {
  let electionFinalizedEvent = changetype<ElectionFinalized>(newMockEvent())

  electionFinalizedEvent.parameters = new Array()

  return electionFinalizedEvent
}

export function createVoteCastedEvent(
  commitment: Bytes,
  rankedVotes: Array<BigInt>
): VoteCasted {
  let voteCastedEvent = changetype<VoteCasted>(newMockEvent())

  voteCastedEvent.parameters = new Array()

  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "commitment",
      ethereum.Value.fromFixedBytes(commitment)
    )
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "rankedVotes",
      ethereum.Value.fromUnsignedBigIntArray(rankedVotes)
    )
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
