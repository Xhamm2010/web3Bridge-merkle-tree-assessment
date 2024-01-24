const crypto = require('crypto');

// Function to calculate the Merkle root hash
function calculateMerkleRoot(addresses) {
    if (addresses.length === 0) {
        throw new Error('No addresses provided');
    }

    // Convert addresses to hash values
    const hashedAddresses = addresses.map(address => crypto.createHash('sha256').update(address).digest('hex'));

    // Recursive function to build the Merkle tree
    function buildMerkleTree(hashes) {
        if (hashes.length === 1) {
            return hashes[0];
        }

        const nextLevelHashes = [];
        for (let i = 0; i < hashes.length; i += 2) {
            const combinedHash = (i + 1 < hashes.length) ? hashes[i] + hashes[i + 1] : hashes[i] + hashes[i];
            const nextLevelHash = crypto.createHash('sha256').update(combinedHash).digest('hex');
            nextLevelHashes.push(nextLevelHash);
        }

        return buildMerkleTree(nextLevelHashes);
    }

    return buildMerkleTree(hashedAddresses);
}

// Function to verify if an address is included in the Merkle root
function verifyAddressInMerkleRoot(address, merkleRoot, addresses) {
    const hashedAddress = crypto.createHash('sha256').update(address).digest('hex');
    const calculatedMerkleRoot = calculateMerkleRoot(addresses);

    return hashedAddress === calculatedMerkleRoot || addresses.includes(address);
}

// Example usage
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
