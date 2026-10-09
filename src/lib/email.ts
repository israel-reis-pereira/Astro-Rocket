import { RESEND_API_KEY, RESEND_AUDIENCE_ID } from 'astro:env/server';

/**
 * Whether the newsletter form has the keys it needs.
 *
 * The newsletter needs both a Resend API key and an audience ID; checking
 * these at render time lets it avoid offering a submission that cannot work.
 *
 * Both variables are optional in the env schema, so a missing key is a valid
 * state rather than a build error.
 */

/** The newsletter needs an audience to add the address to as well. */
export const newsletterConfigured = Boolean(RESEND_API_KEY && RESEND_AUDIENCE_ID);
