const express = require("express");
const app = express();

app.use(express.json());

let properties = [];

// CREATE PAYMENT
app.post("/create-payment", (req, res) => {
    const id = Date.now().toString();

    const property = {
        id,
        ...req.body,
        paid: false
    };

    properties.push(property);

    const paymentUrl = `https://www.payfast.co.za/eng/process?merchant_id=34557989&merchant_key=pok8tcfzu8xd1&amount=69.00&item_name=${encodeURIComponent(property.title)}&custom_str1=${id}`;

    res.json({ paymentUrl });
});

// PAYMENT CONFIRMATION
app.post("/itn", (req, res) => {
    const id = req.body.custom_str1;

    const property = properties.find(p => p.id === id);
    if (property) property.paid = true;

    res.sendStatus(200);
});

// GET LISTINGS
app.get("/properties", (req, res) => {
    res.json(properties.filter(p => p.paid));
});

app.listen(3000, () => console.log("Server running"));
