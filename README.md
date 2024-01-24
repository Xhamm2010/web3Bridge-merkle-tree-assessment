# Web3Bridge Assessment on Merkle Tree

This repository contains a simple JavaScript implementation of a Merkle tree and a verification process for addresses within the tree.

## Prerequisites

- Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

## How to Run

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/Xhamm2010/web3Bridge-merkle-tree-assessment.git
    ```

2. Navigate to the project directory:

    ```bash
    cd web3Bridge-merkle-tree-assessment
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the script:

    ```bash
    node merkle.js
    ```

## Code Explanation

### `calculateMerkleRoot` function

- Accepts an array of addresses.
- Converts addresses to hash values using SHA-256.
- Builds a Merkle tree recursively until the root hash is obtained.

### `verifyAddressInMerkleRoot` function

- Accepts an address, a Merkle root, and an array of addresses.
- Calculates the hash of the given address.
- Compares the hashed address with the calculated Merkle root.
- Additionally, checks if the address is included in the original array of addresses.

### Example Usage

```javascript
const addresses = [
    '0x5AaFeCeFED7c58f0eA7a1783b3a579D7e5fDC666',
    '0x1aF4b0d4162733F942f06e1b75c2278A5034e2aA',
    '0xEf5d34B2BBBEdc6019b9771b6b30F86a28e91e2F',
    '0x7C7b26c98e47797F781911bDE79dD35c16D673F7',
    '0xC0fA1b63e36BeC2E904b5F1a836dD82b7E2bc077'
];

const merkleRoot = calculateMerkleRoot(addresses);

console.log('Merkle Root:', merkleRoot);

const addressToVerify = '0xEf5d34B2BBBEdc6019b9771b6b30F86a28e91e2F';
const isAddressIncluded = verifyAddressInMerkleRoot(addressToVerify, merkleRoot, addresses);

console.log(`Is ${addressToVerify} included in the Merkle Root? ${isAddressIncluded}`);
