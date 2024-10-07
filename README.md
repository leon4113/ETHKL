# Anonymous Real-Time Preferential Voting DApp on Scroll

Introucing **Prevote**, an innovative platform designed to revolutionize how we express our preferences in voting! Built on the Scroll network, this decentralized application empowers users to actively participate in democratic processes using **Preferential Voting**  mechanisms.

## 🌟 Features

### **Preferential Voting**
- **Express Your Preference**: Preferential voting is an electoral system that allows voters to rank candidates in order of preference rather than choosing just one. This method enables voters to express their preferences more fully and can lead to outcomes that better reflect the overall sentiment of the electorate.

### **Worldcoin Integration**
- **Proof of Humanity**: Say goodbye to Sybil attacks! Our integration with Worldcoin guarantees that each voter is unique, enhancing the integrity of the voting process.

### **The Graph for Real-Time Data**
- **Effortless Querying**: Utilizing The Graph, our platform provides seamless, real-time access to vote results, candidate information, and voter activity—keeping you updated every step of the way!

### **Deployed on Scroll**
- **Scalable and Cost-Effective**: Experience lightning-fast transactions with Scroll, a zk-rollup on Ethereum that ensures efficiency and low costs.

## Technology Stack

### Smart Contracts:
- **Solidity**: Used to implement the Quadratic Voting and Ranked-Choice Voting mechanisms.
- **Scroll**: Deployed on the Scroll zk-rollup network for scalable, efficient blockchain transactions.
- **Scroll Contract: https://sepolia.scrollscan.com/address/0xf78fc0f251709f6fe8f0d350339ccbbda50b4435.

### Frontend:
- **React.js**: For building the user interface and enabling users to interact with the voting system.
- **Wagmi**: For interacting with the blockchain, deploying contracts, and signing transactions.

### Backend:
- **Worldcoin**: Provides proof of humanity for user authentication.
- **The Graph**: Used for querying and indexing data from smart contracts.
- **Express JS**: Used for routing API endpoints

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

2. **Preferential Voting**:
   - After authentication, voters are given a fixed number of voting credits to allocate to candidates. Each additional vote costs quadratically more.
   - Submit votes, and results will be calculated and displayed in real-time using **The Graph**.

3. **Ranked-Choice Voting**:
   - Voters rank all candidates in order of preference.

4. **Real-Time Results**:
   - Results are displayed in real-time using **The Graph**, ensuring transparency and integrity in vote counting.

---

## Testing

You can test the smart contracts using **Hardhat** or **Foundry**. Predefined test scripts are provided 

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

