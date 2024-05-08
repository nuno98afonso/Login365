"use client";

import { useState, useEffect } from 'react';
import { signIn, signOut, getToken } from "next-auth/react"; // Assuming you have implemented authentication methods in auth.js

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const token = await getToken();
        const userInfoResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          setUser(userInfo);
        } else {
          console.error('Failed to fetch user info:', userInfoResponse.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
      setLoading(false);
    }

    fetchUserInfo();
  }, []);

  const handleSignIn = async () => {
    try {
      await signIn();
      // Refresh user info after signing in
      setLoading(true);
      await fetchUserInfo();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign In with Microsoft</button>
      )}
    </div>
  );
}
