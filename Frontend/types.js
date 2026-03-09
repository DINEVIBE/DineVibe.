/**
 * @fileoverview Type definitions converted to JS constants and JSDoc
 * for use across the DineVibe frontend.
 */

// ─── Roles ────────────────────────────────────────────────────────────────────
/**
 * @typedef {'user' | 'restaurant_owner' | 'creator' | 'staff' | 'admin'} Role
 */
export const ROLES = {
  USER:               'user',
  RESTAURANT_OWNER:   'restaurant_owner',
  CREATOR:            'creator',
  STAFF:              'staff',
  ADMIN:              'admin',
};

// ─── Auth Steps ───────────────────────────────────────────────────────────────
/**
 * @typedef {'landing' | 'login' | 'signup' | 'mfa-select' | 'mfa-verify' | 'role-select' | 'dashboard'} AuthStep
 */
export const AUTH_STEPS = {
  LANDING:    'landing',
  LOGIN:      'login',
  SIGNUP:     'signup',
  MFA_SELECT: 'mfa-select',
  MFA_VERIFY: 'mfa-verify',
  ROLE_SELECT: 'role-select',
  DASHBOARD:  'dashboard',
};

// ─── MFA Methods ─────────────────────────────────────────────────────────────
/**
 * @typedef {'sms' | 'email'} MfaMethod
 */
export const MFA_METHODS = {
  SMS:   'sms',
  EMAIL: 'email',
};

// ─── AuthUser Shape ───────────────────────────────────────────────────────────
/**
 * @typedef {Object} AuthUser
 * @property {string}      user_id
 * @property {string}      email
 * @property {string}      username
 * @property {Role}        role
 * @property {Role}        [simulated_role]
 * @property {string}      access_token
 * @property {MfaMethod}   [mfa_method]
 * @property {string}      [avatar]
 * @property {number}      [trust_score]
 */

// ─── Restaurant Shape ─────────────────────────────────────────────────────────
/**
 * @typedef {Object} Restaurant
 * @property {number}   id
 * @property {string}   name
 * @property {string}   cuisine
 * @property {number}   rating
 * @property {number}   reviews
 * @property {string}   priceRange
 * @property {string}   image
 * @property {string}   description
 * @property {string}   address
 * @property {string}   distance
 * @property {string[]} tags
 * @property {boolean}  [featured]
 * @property {boolean}  openNow
 */

// ─── Category ─────────────────────────────────────────────────────────────────
/**
 * @typedef {'all'|'italian'|'japanese'|'mexican'|'indian'|'american'|'thai'|'french'|'mediterranean'} Category
 */
export const CATEGORIES = [
  'all',
  'italian',
  'japanese',
  'mexican',
  'indian',
  'american',
  'thai',
  'french',
  'mediterranean',
];