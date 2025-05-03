const express = require('express');
const router = express.Router();
const Flow = require('../models/FlowModel');
const authenticate = require('../middleware/authMiddleware'); // JWT middleware

// Save flow (always create a new flow)
router.post('/save', authenticate, async (req, res) => {
  const { nodes, edges, title } = req.body;
  const userId = req.user.id;

  try {
    const newFlow = new Flow({
      userId,
      nodes,
      edges,
      title: title || "Untitled Flow",
      createdAt: new Date()
    });

    await newFlow.save();

    res.status(201).json({ message: "Flow saved successfully", flow: newFlow });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Load all flows of the user
router.get('/load', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const flows = await Flow.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(flows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
