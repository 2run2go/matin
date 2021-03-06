import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {
  FirebaseAuthContextType,
  ActionMap,
  AuthState,
  AuthUser,
} from "../types/auth";
import { firebaseConfig } from "../config";

const INITIALIZE = "INITIALIZE";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

type AuthActionTypes = {
  [INITIALIZE]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
};

type FirebaseActions =
  ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === INITIALIZE) {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext<FirebaseAuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<
    firebase.firestore.DocumentData | undefined
  >();
  const [state, dispatch] = useReducer(reducer, initialState);

  // const googleSignInRedirect = () => () => {
  //   firebase
  //     .auth()
  //     .getRedirectResult()
  //     .then((result) => {
  //       if (result.credential) {
  //         const user = result.user;
  //         if (user) {
  //           console.log(user);
  //           const docRef = firebase
  //             .firestore()
  //             .collection("users")
  //             .doc(user.uid);
  //           docRef
  //             .get()
  //             .then((doc) => {
  //               if (doc.exists) {
  //                 setProfile(doc.data());
  //               }
  //             })
  //             .catch((error) => {
  //               console.error(error);
  //             });
  //           localStorage.setItem("isLogin", "yes");
  //           navigate("/inbox");
  //           dispatch({
  //             type: INITIALIZE,
  //             payload: { isAuthenticated: true, user },
  //           });
  //         } else {
  //           localStorage.removeItem("isLogin");
  //           dispatch({
  //             type: INITIALIZE,
  //             payload: { isAuthenticated: false, user: null },
  //           });
  //         }
  //       } else {
  //         const provider = new firebase.auth.GoogleAuthProvider();
  //
  //         // provider.addScope("https://www.googleapis.com/auth/gmail.readonly");
  //         // provider.addScope("https://www.googleapis.com/auth/calendar");
  //         // provider.addScope("https://www.googleapis.com/auth/drive");
  //         // provider.addScope("https://www.googleapis.com/auth/drive.appdata");
  //         // provider.addScope("https://www.googleapis.com/auth/drive.file");
  //
  //         return firebase.auth().signInWithRedirect(provider);
  //       }
  //     });
  // };

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = firebase.firestore().collection("users").doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });
          localStorage.setItem("isLogin", "yes");
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          localStorage.removeItem("isLogin");
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),

    [dispatch]
  );

  const signIn = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    return firebase.auth().signInWithPopup(provider);
  };

  const signInWithGoogleRedirect = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
  };

  const signInWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const signInWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const signUp = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(res.user?.uid)
          .set({
            uid: res.user?.uid,
            email,
            displayName: `${firstName} ${lastName}`,
          });
      });

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };
  const auth = { ...state.user };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "firebase",
        user: {
          id: auth.uid,
          email: auth.email,
          avatar: auth.photoURL || auth.avatar || profile?.avatar,
          displayName: auth.displayName || profile?.displayName,
          role: auth.role || "user",
        },
        signIn,
        signUp,
        signInWithGoogle,
        signInWithGoogleRedirect,
        signInWithFaceBook,
        signInWithTwitter,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
