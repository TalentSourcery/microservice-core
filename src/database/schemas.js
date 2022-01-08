import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  email: String,
  password: String,
  name: String,
});

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  company: String,
  plan: String,
  createdAt: String,
  searchesLeft: Number,
  stripeCustomerId: String,
  lastUpdatedAt: String,
  numberOfSearchesThisMonth: Number,
  numberOfTotalSearches: Number,
});

const searchSchema = new Schema({
  email: String,
  source: String,
  createdAt: {
    readableDate: String,
    isoDate: String,
    month: String,
    year: String,
  },
  booleanString: String,
  reference: String,
});

const linkedinSearchSchema = new Schema({
  searchName: String,
  location: {
    country: String,
    countryCode: String,
    city: String,
  },
  jobTitles: Array,
  keywords: Array,
  unwantedKeywords: Array,
  preferredCompanies: Array,
  unwantedCompanies: Array,
});

const linkedinAccountSchema = new Schema({
  email: String,
  password: String,
  handle: String,
  cookies: {
    LI_AT_VALUE: String,
    JSESSIONID_VALUE: String,
    CSRF_VALUE: String,
  },
});

const purchaseSchema = new Schema({
  email: String,
  createdAt: {
    readableDate: String,
    isoDate: String,
    month: String,
    year: String,
  },
  amount: String,
  quantity: Number,
  receiptUrl: String,
});

export {
  adminSchema,
  userSchema,
  searchSchema,
  linkedinSearchSchema,
  linkedinAccountSchema,
  purchaseSchema,
};
