import axios from "axios";

/**
 * Base URL of the SAM Ayurveda CMS (PHP + MySQL backend in
 * sam-ayurveda-cms-php/). Override per-environment with a
 * VITE_API_URL entry in a .env / .env.local file, e.g.:
 *
 *   VITE_API_URL=http://localhost/sam-ayurveda-cms-php   (local PHP dev)
 *   VITE_API_URL=https://cms.samayurveda.in               (production)
 */
export const API_BASE = import.meta.env.VITE_API_URL || "https://cms.samayurveda.in";

/**
 * Fetches a "single" content type (home, about, hospital, contact) from
 * the CMS. Returns null on any failure so callers can fall back to
 * their existing hardcoded content instead of showing a broken page.
 */
export async function fetchSingle(type) {
  try {
    const res = await axios.get(`${API_BASE}/api/index.php`, { params: { type } });
    return res.data || null;
  } catch (err) {
    console.error(`[CMS] Failed to load "${type}" page content:`, err);
    return null;
  }
}

/**
 * Fetches a "collection" content type (course, department, facility,
 * gallery, announcement, leader, hospital_service, ...). Always
 * resolves to an array - empty on failure - so callers can safely
 * .map() over the result or fall back to static data when empty.
 */
export async function fetchList(type) {
  try {
    const res = await axios.get(`${API_BASE}/api/index.php`, { params: { type } });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error(`[CMS] Failed to load "${type}" list:`, err);
    return [];
  }
}
