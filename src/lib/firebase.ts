/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration from firebase-applet-config.json
const firebaseConfig = {
  projectId: "kingly-discovery-d6m9v",
  appId: "1:260917518702:web:55ce48b78fb4ca846b617f",
  apiKey: "AIzaSyCseAZxL0XaZiKUc0Kb7AljfE7vXDsVack",
  authDomain: "kingly-discovery-d6m9v.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-7bdfe1ef-12a4-4521-941e-7f45b3ab331a",
  storageBucket: "kingly-discovery-d6m9v.firebasestorage.app",
  messagingSenderId: "260917518702"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with the specific database ID
export const db = getFirestore(app, "ai-studio-7bdfe1ef-12a4-4521-941e-7f45b3ab331a");

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

