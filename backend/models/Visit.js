/**
 * Visit Model for MongoDB
 * Stores analytics data for each visitor
 */

import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  pageName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  timeOnSite: {
    milliseconds: Number,
    seconds: Number,
    minutes: Number,
    formatted: String
  },
  visitor: {
    ip: String,
    country: String,
    countryCode: String,
    city: String,
    region: String,
    timezone: String,
    isp: String,
    latitude: Number,
    longitude: Number
  },
  browser: {
    browser: String,
    deviceType: String,
    os: String,
    userAgent: String,
    language: String,
    screenWidth: Number,
    screenHeight: Number,
    viewportWidth: Number,
    viewportHeight: Number
  },
  referrer: String,
  url: String
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Indexes for better query performance
visitSchema.index({ 'visitor.country': 1 });
visitSchema.index({ 'browser.browser': 1 });
visitSchema.index({ 'browser.deviceType': 1 });
visitSchema.index({ createdAt: -1 });

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;

