const STORAGE_KEY = "asn_mock_session";

export interface MockAuthSession {
  citizen: {
    name: string;
    email: string;
    verifiedLevel?: string;
  };
}

export function readMockSession(): MockAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockAuthSession;
  } catch {
    return null;
  }
}

export function saveMockSession(session: MockAuthSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("asn-auth-change"));
}

export function clearMockSession(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("asn-auth-change"));
}
