import { useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ProfileContext = createContext(null);
const initialProfile = {
  name: "Jaydeep",
  bio: "Passionate developer crafting beautiful UIs with React | Building towards full-stack mastery with the MERN ecosystem. Code is my canvas.",
  avatar: "https://avatars.githubusercontent.com/u/83915597?v=4&size=64",
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useLocalStorage("profile", initialProfile);

  const updateField = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const value = {
    ...profile,
    updateField,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used inside ProfileContext");
  }

  return context;
}
