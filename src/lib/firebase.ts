/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration from firebase-applet-config.json with support for Vercel/Production Env Variables
const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kingly-discovery-d6m9v",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:260917518702:web:55ce48b78fb4ca846b617f",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCseAZxL0XaZiKUc0Kb7AljfE7vXDsVack",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kingly-discovery-d6m9v.firebaseapp.com",
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || "ai-studio-7bdfe1ef-12a4-4521-941e-7f45b3ab331a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kingly-discovery-d6m9v.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "260917518702"
};

// Singleton initialization pattern to prevent hot-reloading duplicate instances
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with robust database detection & fallback
let dbInstance;
try {
  const isVercelOrProd = typeof window !== 'undefined' && (
    window.location.hostname.includes('vercel.app') || 
    window.location.hostname.includes('netlify.app') || 
    (window.location.hostname.includes('localhost') && !window.location.hostname.includes('ais-dev'))
  );

  // If we are in production on Vercel, the user's project likely uses the default database '(default)'
  // We can try to use the configured firestoreDatabaseId unless it is the ai-studio named one and we're on Vercel.
  if (isVercelOrProd && firebaseConfig.firestoreDatabaseId.startsWith('ai-studio-')) {
    console.log("Production detected: Bypassing AI Studio-specific named database to use the standard default Firestore database.");
    dbInstance = getFirestore(app);
  } else {
    const dbId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== 'default' 
      ? firebaseConfig.firestoreDatabaseId 
      : undefined;
    dbInstance = getFirestore(app, dbId);
  }
} catch (error) {
  console.warn("Could not load Firestore with database ID, falling back to standard default database instance:", error);
  dbInstance = getFirestore(app);
}

export const db = dbInstance;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

