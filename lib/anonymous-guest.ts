/**
 * Anonymous Guest Session Management
 *
 * This module handles the creation and management of anonymous guest sessions.
 * Guests are tracked using browser fingerprinting and localStorage.
 */

import { createClient } from "./supabase/client";

const GUEST_ID_KEY = "ilashizy_guest_id";
const GUEST_FINGERPRINT_KEY = "ilashizy_guest_fingerprint";

/**
 * Generate a browser fingerprint for session persistence
 * Uses various browser and device characteristics
 */
export function generateFingerprint(): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let canvasFingerprint = "";

  if (ctx) {
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("ilashizy", 2, 2);
    canvasFingerprint = canvas.toDataURL();
  }

  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvas: canvasFingerprint.slice(0, 100), // First 100 chars
    timestamp: Date.now(),
  };

  // Create a simple hash from the fingerprint
  const fingerprintString = JSON.stringify(fingerprint);
  let hash = 0;
  for (let i = 0; i < fingerprintString.length; i++) {
    const char = fingerprintString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return `fp_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`;
}

/**
 * Get or create an anonymous guest session
 * Returns the guest ID (UUID from database)
 */
export async function getOrCreateAnonymousGuest(): Promise<string | null> {
  try {
    const supabase = createClient();

    // Check if we already have a guest ID in localStorage
    const existingGuestId = localStorage.getItem(GUEST_ID_KEY);
    if (existingGuestId) {
      // Verify it exists in the database
      const { data, error } = await supabase
        .from("anonymous_guests")
        .select("id")
        .eq("id", existingGuestId)
        .single();

      if (data && !error) {
        // Update last_seen
        await supabase
          .from("anonymous_guests")
          .update({ last_seen: new Date().toISOString() })
          .eq("id", existingGuestId);

        return existingGuestId;
      }
    }

    // Check if we have a fingerprint and can recover the session
    const existingFingerprint = localStorage.getItem(GUEST_FINGERPRINT_KEY);
    if (existingFingerprint) {
      const { data, error } = await supabase
        .from("anonymous_guests")
        .select("id")
        .eq("fingerprint", existingFingerprint)
        .single();

      if (data && !error) {
        // Recover the session
        localStorage.setItem(GUEST_ID_KEY, data.id);

        // Update last_seen
        await supabase
          .from("anonymous_guests")
          .update({ last_seen: new Date().toISOString() })
          .eq("id", data.id);

        return data.id;
      }
    }

    // Create a new anonymous guest
    const fingerprint = generateFingerprint();
    const { data, error } = await supabase
      .from("anonymous_guests")
      .insert({
        fingerprint,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error creating anonymous guest:", error);
      return null;
    }

    if (data) {
      // Store in localStorage
      localStorage.setItem(GUEST_ID_KEY, data.id);
      localStorage.setItem(GUEST_FINGERPRINT_KEY, fingerprint);

      return data.id;
    }

    return null;
  } catch (error) {
    console.error("Error in getOrCreateAnonymousGuest:", error);
    return null;
  }
}

/**
 * Get the current anonymous guest ID from localStorage
 */
export function getAnonymousGuestId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(GUEST_ID_KEY);
}

/**
 * Update anonymous guest information (name, phone, email)
 */
export async function updateAnonymousGuestInfo(data: {
  display_name?: string;
  phone?: string;
  email?: string;
}): Promise<boolean> {
  try {
    const guestId = getAnonymousGuestId();
    if (!guestId) return false;

    const supabase = createClient();
    const { error } = await supabase
      .from("anonymous_guests")
      .update(data)
      .eq("id", guestId);

    if (error) {
      console.error("Error updating anonymous guest info:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateAnonymousGuestInfo:", error);
    return false;
  }
}

/**
 * Get anonymous guest information
 */
export async function getAnonymousGuestInfo(): Promise<{
  id: string;
  display_name?: string;
  phone?: string;
  email?: string;
} | null> {
  try {
    const guestId = getAnonymousGuestId();
    if (!guestId) return null;

    const supabase = createClient();
    const { data, error } = await supabase
      .from("anonymous_guests")
      .select("id, display_name, phone, email")
      .eq("id", guestId)
      .single();

    if (error) {
      console.error("Error getting anonymous guest info:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getAnonymousGuestInfo:", error);
    return null;
  }
}

/**
 * Check if the current user is an anonymous guest
 */
export async function isAnonymousGuest(): Promise<boolean> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If there's an authenticated user, they're not anonymous
    if (user) return false;

    // Check if we have an anonymous guest session
    const guestId = getAnonymousGuestId();
    return guestId !== null;
  } catch (error) {
    console.error("Error in isAnonymousGuest:", error);
    return false;
  }
}

/**
 * Clear anonymous guest session (for account upgrade)
 */
export function clearAnonymousGuestSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_ID_KEY);
  localStorage.removeItem(GUEST_FINGERPRINT_KEY);
}
