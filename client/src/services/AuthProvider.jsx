import { useEffect, createContext, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase-config";
import { apiConfig } from "../config/api-config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleTokenAuth = async (user) => {
    const idToken = await user.getIdToken(true);
    try {
      const response = await apiConfig.post(
        "auth/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      if (response.status === 200) {
        setAuthenticatedUser(response.data);
      } else {
        console.error("Error verifying user:", response);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await handleTokenAuth(currentUser);
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSaveUser = async (user, username) => {
    const data = {
      uid: user.uid,
      email: user.email,
      username: username || user.displayName,
      authProvider: user.providerId,
    };
    try {
      const response = await apiConfig.post("auth/signup", data);
      if (response.status === 200) {
        setAuthenticatedUser(response.data);
      } else {
        console.error("Error saving user data");
        if (user) {
          await deleteUser(user);
        }
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };
  const signup = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleSaveUser(userCredential.user, username);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleTokenAuth(userCredential.user);
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      await handleTokenAuth(userCredential.user);
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };
  const signupWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      await handleSaveUser(userCredential.user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const logout = async () => {
    await signOut(auth);
    setAuthenticatedUser(null);
  };

  const contextValue = {
    authenticatedUser,
    isLoading,
    loginWithGoogle,
    login,
    logout,
    signup,
    signupWithGoogle,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
