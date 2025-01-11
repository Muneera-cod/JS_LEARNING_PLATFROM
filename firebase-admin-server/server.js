const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.post('/create-learner', async (req, res) => {
    try {
        const { email, password, displayName } = req.body;
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName
        });
        res.send({ success: true, uid: userRecord.uid });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
