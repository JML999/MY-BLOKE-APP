const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const metadata = {
    "1": {
        "name": "bloke #1",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/lIMl23IijYowc26ZwwyICEKI_2tR-0P_RyLkd8_bzhM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Body Red"
            },
            {
                "trait_type": "Top",
                "value": "Headphones Purple"
            },
            // ... add more attributes as needed
        ]
    },
    // Add more entries as needed
};

// Print the first bit of the metadata
console.log("First bit of metadata:", JSON.stringify(metadata, null, 2).substring(0, 500));

router.get('/metadata/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Received request for metadata ID: ${id}`);
    const item = metadata[id];
    if (item) {
        console.log(`Serving metadata for ID: ${id}`);
        res.json(item);
    } else {
        console.log(`Metadata not found for ID: ${id}`);
        res.json({
            "name": "Unrevealed NFT",
            "description": "This NFT has not been revealed yet.",
            "image": "https://example.com/placeholder.png"
        });
    }
});

app.use('/.netlify/functions', router);

module.exports = app;
module.exports.handler = serverless(app);
