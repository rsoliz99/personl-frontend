// utils/validate.js

const certificateFormats = {
  TX: /^\d{7}$/,   // TEA ID (Texas)
  CA: /^\d{7}$/,   // California
  PA: /^\d{6}$/,   // Pennsylvania
  // Add more as needed
};

/**
 * Validates a certificate number for a given state
 * @param {string} state - The two-letter state code
 * @param {string} certificate - The certificate number to validate
 * @returns {boolean} true if valid, false otherwise
 */
export function isValidCertificate(state, certificate) {
  const pattern = certificateFormats[state];
  return pattern ? pattern.test(certificate) : true; // allow if no rule exists
}
