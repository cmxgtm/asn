const STORAGE_KEY = "asn_mock_session";

export interface CitizenInfo {
  cccd: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  issueDate: string;
  issuePlace: string;
  nationality: string;
}

export interface MockAuthSession {
  citizen: CitizenInfo;
  verifiedLevel: "eKYC" | "Mức 2";
  loginTime: string;
}

export const MOCK_CITIZEN: CitizenInfo = {
  cccd: "079204001234",
  name: "Nguyễn Văn An",
  email: "nguyenvanan@gmail.com",
  phone: "0901 234 567",
  dob: "15/03/1990",
  gender: "Nam",
  address: "123 Nguyễn Đình Chiểu, Phường 6, Quận 3, TP. Hồ Chí Minh",
  issueDate: "20/06/2021",
  issuePlace: "Cục Cảnh sát QLHC về TTXH",
  nationality: "Việt Nam",
};

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

export function loginWithMockUser(): void {
  saveMockSession({
    citizen: MOCK_CITIZEN,
    verifiedLevel: "eKYC",
    loginTime: new Date().toISOString(),
  });
}
