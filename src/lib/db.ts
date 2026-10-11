import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResetTokenRecord {
  id: string;
  userId: string;
  email: string;
  token: string;
  expiresAt: number; // timestamp in milliseconds
  used: boolean;
  createdAt: string;
}

interface DatabaseSchema {
  users: UserRecord[];
  resetTokens: ResetTokenRecord[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

// Ensure database file and directory exist
function initDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_PATH)) {
      const initialData: DatabaseSchema = {
        users: [],
        resetTokens: [],
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }

    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.users) parsed.users = [];
    if (!parsed.resetTokens) parsed.resetTokens = [];
    return parsed;
  } catch (err) {
    console.error('Failed to initialize or read database file:', err);
    return { users: [], resetTokens: [] };
  }
}

// Atomic file write using temporary file to prevent corruption
function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tempPath = path.join(DATA_DIR, `db.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`);
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_PATH);
}

// Normalize email for case-insensitive lookup
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  const db = initDb();
  const normalized = normalizeEmail(email);
  const user = db.users.find((u) => normalizeEmail(u.email) === normalized);
  return user ? { ...user } : null;
}

export async function getUserById(id: string): Promise<UserRecord | null> {
  const db = initDb();
  const user = db.users.find((u) => u.id === id);
  return user ? { ...user } : null;
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string
): Promise<UserRecord> {
  const db = initDb();
  const normalized = normalizeEmail(email);

  if (db.users.some((u) => normalizeEmail(u.email) === normalized)) {
    throw new Error('User already exists');
  }

  const newUser: UserRecord = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalized,
    passwordHash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  saveDb(db);
  return { ...newUser };
}

export async function updateUserPassword(
  userId: string,
  newPasswordHash: string
): Promise<boolean> {
  const db = initDb();
  const index = db.users.findIndex((u) => u.id === userId);
  if (index === -1) return false;

  db.users[index].passwordHash = newPasswordHash;
  db.users[index].updatedAt = new Date().toISOString();
  saveDb(db);
  return true;
}

export async function createResetToken(
  userId: string,
  email: string
): Promise<ResetTokenRecord> {
  const db = initDb();
  const normalized = normalizeEmail(email);

  // Invalidate any existing unused tokens for this user
  db.resetTokens.forEach((t) => {
    if (normalizeEmail(t.email) === normalized && !t.used) {
      t.used = true;
    }
  });

  const tokenRecord: ResetTokenRecord = {
    id: crypto.randomUUID(),
    userId,
    email: normalized,
    token: crypto.randomBytes(32).toString('hex'),
    expiresAt: Date.now() + 1000 * 60 * 60, // 1 hour expiration
    used: false,
    createdAt: new Date().toISOString(),
  };

  db.resetTokens.push(tokenRecord);
  saveDb(db);
  return { ...tokenRecord };
}

export async function getResetToken(token: string): Promise<ResetTokenRecord | null> {
  const db = initDb();
  const record = db.resetTokens.find((t) => t.token === token);
  if (!record) return null;
  return { ...record };
}

export async function consumeResetToken(token: string): Promise<boolean> {
  const db = initDb();
  const record = db.resetTokens.find((t) => t.token === token);
  if (!record || record.used || Date.now() > record.expiresAt) {
    return false;
  }

  record.used = true;
  saveDb(db);
  return true;
}
