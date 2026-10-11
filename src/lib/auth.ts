import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const COOKIE_NAME = 'nexora_session';

const DEFAULT_SECRET = 'nexora-secret-key-change-in-production-min-32-chars';
const JWT_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || DEFAULT_SECRET);

export interface SessionPayload {
  id: string;
  email: string;
  name: string;
}

// Secure password hashing with salt cost factor 12
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

// Timing-safe password verification
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate RFC 7519 JSON Web Token
export async function createSessionToken(
  payload: SessionPayload,
  rememberMe: boolean = false
): Promise<string> {
  const expiresIn = rememberMe ? '30d' : '24h';
  return new SignJWT({
    id: payload.id,
    email: payload.email,
    name: payload.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setSubject(payload.id)
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
}

// Verify and decode JWT token (compatible with Edge and Node.js runtimes)
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });

    if (!payload.id || !payload.email || !payload.name) {
      return null;
    }

    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

// Cookie options for secure session storage
export function getSessionCookieOptions(rememberMe: boolean = false) {
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days vs 24 hours
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

// Retrieve current authenticated session on the server
export async function getCurrentUser(): Promise<SessionPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

// Sanitize redirect URLs to prevent open-redirect vulnerabilities
export function sanitizeRedirectUrl(
  url: string | null | undefined,
  fallback: string = '/dashboard'
): string {
  if (!url || typeof url !== 'string') return fallback;

  // Must start with '/' and not start with '//' or contain protocol schemes
  const trimmed = url.trim();
  if (
    trimmed.startsWith('/') &&
    !trimmed.startsWith('//') &&
    !trimmed.startsWith('/\\') &&
    !trimmed.includes(':')
  ) {
    return trimmed;
  }

  return fallback;
}
