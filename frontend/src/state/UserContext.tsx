import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: Date;
}

// Define the structure of userData
interface UserData {
  imageUrl: string;
  originalImageUrl: string;
  isSignedIn: boolean;
  user: User;
}

// Define the context value type
interface UserContextType {
  userData: UserData;
  updateUser: (newUserData: Partial<UserData>) => void;
}

// Create the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// Create the default user data
const defaultUserData: UserData = {
  imageUrl: "",
  originalImageUrl: "",
  isSignedIn: false,
  user: {
    id: "1",
    name: "Guest User",
    email: "guest@test.com",
    entries: 0,
    joined: new Date(),
  },
};

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  // Function to update user data
  const updateUser = (newUserData: Partial<UserData>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newUserData,
      user: {
        ...prevData.user,
        ...newUserData.user,
      },
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
