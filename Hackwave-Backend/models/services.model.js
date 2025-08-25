const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name is required"],
    trim: true,
    minlength: [3, "Service name must be at least 3 characters long"],
    maxlength: [100, "Service name must not exceed 100 characters"]
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Tax", "Certificates", "Complaints", "Sanitation", "General"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [500, "Description cannot exceed 500 characters"]
  },
  contactEmail: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
  },
  contactPhone: {
    type: String,
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
