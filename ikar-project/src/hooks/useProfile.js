import { useEffect, useState } from "react";
import { getUser } from "../modules/server-req";

export function useProfile() {
  const userId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserHere() {
      setUser(await getUser(userId));
    }
    getUserHere();
  }, []);

  console.log(user);

  return {
    user
  };
};