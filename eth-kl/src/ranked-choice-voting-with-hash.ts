import {
  CandidateAdded as CandidateAddedEvent,
  ElectionFinalized as ElectionFinalizedEvent,
  VoteCasted as VoteCastedEvent,
  WinnerAnnounced as WinnerAnnouncedEvent
} from "../generated/RankedChoiceVotingWithHash/RankedChoiceVotingWithHash"
import {
  CandidateAdded,
  ElectionFinalized,
  VoteCasted,
  WinnerAnnounced
} from "../generated/schema"

export function handleCandidateAdded(event: CandidateAddedEvent): void {
  let entity = new CandidateAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.candidateId = event.params.candidateId
  entity.candidateAddress = event.params.candidateAddress
  entity.name = event.params.name
  // visionMission is not in the contract event, so it should be removed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleElectionFinalized(event: ElectionFinalizedEvent): void {
  let entity = new ElectionFinalized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCasted(event: VoteCastedEvent): void {
  let entity = new VoteCasted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.firstChoice = event.params.firstChoice
  entity.commitment = event.params.voteHash
  // rankedVotes is not in the contract event, so it should be removed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWinnerAnnounced(event: WinnerAnnouncedEvent): void {
  let entity = new WinnerAnnounced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.candidateId = event.params.candidateId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
