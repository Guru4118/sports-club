import mongoose, { Schema, Document, models, model } from 'mongoose'

// ─── Tournament ───────────────────────────────────────────────
const PrizeTierSchema = new Schema({
  rank:   { type: Number, required: true },
  label:  { type: String, required: true },
  amount: { type: String, required: true },
  trophy: { type: String },
}, { _id: false })

const TournamentSchema = new Schema({
  slug:              { type: String, required: true, unique: true, lowercase: true, trim: true },
  name:              { type: String, required: true, trim: true },
  edition:           { type: String, required: true },
  startDate:         { type: Date, required: true },
  endDate:           { type: Date, required: true },
  venue:             { type: String, required: true },
  location:          { type: String, required: true },
  posterUrl:         { type: String, default: '' },
  prizePool:         { type: [PrizeTierSchema], default: [] },
  totalPrize:        { type: String },
  rules:             { type: [String], default: [] },
  registrationOpen:  { type: Boolean, default: true },
  maxTeams:          { type: Number, default: 32 },
  registeredTeams:   { type: Number, default: 0 },
  status:            { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  description:       { type: String },
}, { timestamps: true })

// ─── Player ───────────────────────────────────────────────────
const PlayerSchema = new Schema({
  name:         { type: String, required: true, trim: true },
  nameTamil:    { type: String },
  jerseyNumber: { type: Number, required: true },
  role:         { type: String, enum: ['Raider', 'Defender', 'All-Rounder'], required: true },
  photoUrl:     { type: String, default: '' },
  achievements: { type: [String], default: [] },
  bio:          { type: String },
  active:       { type: Boolean, default: true },
  hometown:     { type: String },
  joinedYear:   { type: Number },
}, { timestamps: true })

// ─── Match ────────────────────────────────────────────────────
const MatchSchema = new Schema({
  tournamentId:   { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
  tournamentName: { type: String },
  teamA:          { type: String, required: true },
  teamB:          { type: String, required: true },
  scoreA:         { type: Number },
  scoreB:         { type: Number },
  winner:         { type: String },
  matchDate:      { type: Date, required: true },
  matchTime:      { type: String },
  round:          { type: String, required: true },
  venue:          { type: String },
  status:         { type: String, enum: ['scheduled', 'live', 'completed'], default: 'scheduled' },
  notes:          { type: String },
}, { timestamps: true })

// ─── Registration ─────────────────────────────────────────────
const RegistrationSchema = new Schema({
  tournamentId:   { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
  tournamentName: { type: String },
  teamName:       { type: String, required: true, trim: true },
  captainName:    { type: String, required: true, trim: true },
  contactPhone:   { type: String, required: true },
  contactEmail:   { type: String, required: true, lowercase: true, trim: true },
  playerCount:    { type: Number, default: 12 },
  location:       { type: String, required: true },
  district:       { type: String },
  experience:     { type: String },
  message:        { type: String },
  status:         { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true })

// ─── Sponsorship ──────────────────────────────────────────────
const SponsorshipSchema = new Schema({
  businessName: { type: String, required: true, trim: true },
  contactName:  { type: String, required: true, trim: true },
  phone:        { type: String, required: true },
  email:        { type: String, required: true, lowercase: true, trim: true },
  website:      { type: String },
  message:      { type: String },
  tier:         { type: String, enum: ['title', 'gold', 'silver', 'general'], default: 'general' },
  status:       { type: String, enum: ['new', 'contacted', 'confirmed'], default: 'new' },
}, { timestamps: true })

// ─── Gallery ──────────────────────────────────────────────────
const GallerySchema = new Schema({
  tournamentId:  { type: Schema.Types.ObjectId, ref: 'Tournament' },
  imageUrl:      { type: String, required: true },
  thumbnailUrl:  { type: String },
  caption:       { type: String },
  category:      { type: String, enum: ['match', 'celebration', 'community', 'training'], default: 'match' },
  width:         { type: Number },
  height:        { type: Number },
}, { timestamps: true })

// ─── Announcement ─────────────────────────────────────────────
const AnnouncementSchema = new Schema({
  text:   { type: String, required: true },
  link:   { type: String },
  active: { type: Boolean, default: true },
}, { timestamps: true })

// ─── Admin ────────────────────────────────────────────────────
const AdminSchema = new Schema({
  username:  { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },  // bcrypt hashed
  email:     { type: String, required: true },
  role:      { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
  lastLogin: { type: Date },
}, { timestamps: true })

// ─── Export models (singleton pattern for Next.js hot reload) ─
export const Tournament    = models.Tournament    || model('Tournament',    TournamentSchema)
export const Player        = models.Player        || model('Player',        PlayerSchema)
export const Match         = models.Match         || model('Match',         MatchSchema)
export const Registration  = models.Registration  || model('Registration',  RegistrationSchema)
export const Sponsorship   = models.Sponsorship   || model('Sponsorship',   SponsorshipSchema)
export const Gallery       = models.Gallery       || model('Gallery',       GallerySchema)
export const Announcement  = models.Announcement  || model('Announcement',  AnnouncementSchema)
export const Admin         = models.Admin         || model('Admin',         AdminSchema)
