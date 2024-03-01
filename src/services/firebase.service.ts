import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getDatabase, ref as databaseRef, set, get, child, push, update, onValue, Unsubscribe,
} from 'firebase/database';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Database } from '@firebase/database';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Auth, UserCredential } from '@firebase/auth';
import {
  FirebaseStorage, getStorage, ref as storageRef, uploadBytes,
} from 'firebase/storage';
import { firebaseConfig } from '../config/firebase.config';
import { Activity } from '../interfaces/activity.interface';

export default class Firebase {
  app: FirebaseApp;

  auth: Auth;

  db: Database;

  storage: FirebaseStorage;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getDatabase(this.app);
    this.storage = getStorage();
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  uploadFile(uid: string, file: Blob): Promise<any> {
    const fileRef = storageRef(this.storage, `${uid}/images/${new Date().toString()}.jpg`);
    return uploadBytes(fileRef, file);
  }

  saveUserData(uid: string, userData: { firstName: string, lastName: string, email: string }): void {
    set(databaseRef(this.db, `users/${uid}`), userData);
  }

  addActivity(uid: string, activity: Activity): Promise<void> {
    const newPostKey = push(child(databaseRef(this.db), `users/${uid}/activities`)).key;
    const updates: any = {};
    updates[`users/${uid}/activities/${newPostKey}`] = activity;

    return update(databaseRef(this.db), updates);
  }

  updateActivity(uid: string, activity: Activity | null, activityKey: string): Promise<void> {
    const updates: any = {};
    updates[`users/${uid}/activities/${activityKey}`] = activity;

    return update(databaseRef(this.db), updates);
  }

  // fetch data only once
  fetchActivitiesByUid(uid: string): Promise<any> {
    const dbRef = databaseRef(this.db);
    const activities = get(child(dbRef, `users/${uid}/activities`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return [];
    }).catch((error) => {
      console.error(error);
    });

    return activities;
  }

  // create subscription on change for activitiesRef
  fetchActivitiesByUid$(uid: string, updateData: (data: any)=> void): Unsubscribe {
    const activitiesRef = databaseRef(this.db, `users/${uid}/activities`);
    const unsubscribe = onValue(activitiesRef, (snapshot) => {
      const data = snapshot.val();
      updateData(data);
    });
    return unsubscribe;
  }
}
