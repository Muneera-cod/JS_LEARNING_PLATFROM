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
app.put('/update-learner/:id', async (req, res) => {
    const { id } = req.params;
    const { email, displayName, password } = req.body;

    try {
        // Update Firebase Authentication user profile
        await admin.auth().updateUser(id, {
            email,
            displayName,
            password
        });

        // Update Firestore document
        const learnerRef = admin.firestore().doc(`users/${id}`);
        await learnerRef.set({
            email,
            displayName,
            role: 'learner'
        }, { merge: true });

        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.delete('/delete-learner/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Delete learner from Firebase Authentication
        await admin.auth().deleteUser(id);

        // Delete learner from Firestore
        const learnerRef = admin.firestore().doc(`users/${id}`);
        await learnerRef.delete();

        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));