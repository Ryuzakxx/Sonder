import { MOCK_PROFILE, PROFILE_LOG, PROFILE_TIMELINE } from "@/lib/mock-data";

export async function getProfile() {
  return MOCK_PROFILE;
}

export async function getProfileLog() {
  return PROFILE_LOG;
}

export async function getProfileTimeline() {
  return PROFILE_TIMELINE;
}
