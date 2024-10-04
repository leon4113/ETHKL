
# Quadratic and Ranked Choice Voting DApp

## Overview

This decentralized application (DApp) is built to implement **Quadratic Voting** and **Ranked-Choice Voting** mechanisms on the **Scroll** network. The platform enables users to participate in voting processes where they can express the intensity of their preferences (Quadratic Voting) or rank candidates in order of preference (Ranked-Choice Voting). 

The project uses **Worldcoin** for user authentication to ensure **proof of humanity**, preventing Sybil attacks, and **The Graph** for efficient querying and real-time data fetching.

### Features
1. **Quadratic Voting**:
   - Voters allocate a number of votes to each candidate. The cost of each additional vote increases quadratically, ensuring fairer representation.
   
2. **Ranked-Choice Voting**:
   - Voters rank candidates in order of preference. The votes are transferred and reallocated until a candidate receives more than 50% of the vote.

3. **Worldcoin Integration**:
   - Voter authentication is handled by **Worldcoin** to ensure that each voter is unique.

4. **The Graph**:
   - Used for real-time querying of vote results, candidate data, and voter activity.

5. **Deployed on Scroll**:
   - The DApp is deployed on **Scroll**, a zk-rollup on Ethereum for efficient, low-cost, and scalable transactions.

---

## Technology Stack

### Smart Contracts:
- **Solidity**: Used to implement the Quadratic Voting and Ranked-Choice Voting mechanisms.
- **Scroll**: Deployed on the Scroll zk-rollup network for scalable, efficient blockchain transactions.

### Frontend:
- **React.js**: For building the user interface and enabling users to interact with the voting system.
- **Web3.js** / **Ethers.js**: For interacting with the blockchain, deploying contracts, and signing transactions.

### Backend:
- **Worldcoin**: Provides proof of humanity for user authentication.
- **The Graph**: Used for querying and indexing data from smart contracts.

---

## Setup and Installation

### Prerequisites

- **Node.js** (>= 12.x.x)
- **npm** or **yarn** package manager
- **Hardhat** for smart contract development and testing
- **Scroll Testnet Access** (to deploy contracts)
- **Metamask** (to connect to Scroll)
- **Worldcoin SDK** (for user authentication)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/voting-dapp.git
cd voting-dapp
```

### 2. Install Dependencies

Install the dependencies for the project:

```bash
npm install
```

### 3. Configure Hardhat

You will need to configure **Hardhat** to work with the **Scroll Testnet** and **Worldcoin** SDK. Update your `hardhat.config.js` file to include Scroll network:

```javascript
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    scroll: {
      url: "https://alpha-rpc.scroll.io/l2",  // Scroll Testnet URL
      accounts: [privateKey],  // Your private key for the Scroll Testnet
    }
  }
};
```

### 4. Deploy Smart Contracts

Deploy both the **QuadraticVoting** and **RankedChoiceVoting** contracts to the Scroll network:

```bash
npx hardhat run scripts/deploy.js --network scroll
```

### 5. Setup Worldcoin Integration

To enable Worldcoin authentication, follow these steps:

1. Sign up for a **Worldcoin Developer Account**.
2. Retrieve your **World ID SDK** credentials and update the frontend/backend configuration files.

```javascript
const worldId = new WorldID({
    action_id: "worldcoin-voting",
    signal: "voter-login",
    onSuccess: (result) => {
        console.log("User authenticated with Worldcoin:", result);
    },
    onError: (error) => {
        console.error("Worldcoin authentication failed:", error);
    },
});
```

### 6. Setup The Graph Subgraph

Define your **subgraph** to index and query data from the deployed contracts:

1. Install **The Graph CLI**:

```bash
npm install -g @graphprotocol/graph-cli
```

2. Create a subgraph configuration and deploy it to The Graph network:

```bash
graph init --from-contract <contract-address> --network scroll
```

3. Deploy the subgraph:

```bash
graph deploy --product hosted-service your-username/voting-subgraph
```

### 7. Run the Application

Once everything is set up, you can start the DApp:

```bash
npm start
```

This will start the frontend, and you can access the voting system at `http://localhost:3000`.

---

## Usage

1. **Voter Authentication**:
   - Users must authenticate using **Worldcoin** to prove they are unique humans.

2. **Quadratic Voting**:
   - After authentication, voters are given a fixed number of voting credits to allocate to candidates. Each additional vote costs quadratically more.
   - Submit votes, and results will be calculated and displayed in real-time using **The Graph**.

3. **Ranked-Choice Voting**:
   - Voters rank all candidates in order of preference.
   - When the voting round closes, votes are reallocated until a candidate with a majority is found.

4. **Real-Time Results**:
   - Results are displayed in real-time using **The Graph**, ensuring transparency and integrity in vote counting.

---

## Testing

You can test the smart contracts using **Hardhat**. Predefined test scripts are provided for both **Quadratic Voting** and **Ranked-Choice Voting**.

To run the tests:

```bash
npx hardhat test
```

---

## Deployment

To deploy the DApp on a live network (like Scroll Testnet), follow the deployment instructions in the **Deploy Smart Contracts** section. 

Make sure to update your environment variables for **The Graph**, **Scroll Testnet**, and **Worldcoin** in a `.env` file.

---

## Contributing

Feel free to submit pull requests or open issues if you have any suggestions or improvements for the project.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any inquiries or issues, please contact [your-email@domain.com].
