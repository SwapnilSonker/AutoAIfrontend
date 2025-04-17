// src/context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for the context value
interface UserContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

// Define props for the provider component
interface UserProviderProps {
  children: ReactNode;
}

// Create the context with an initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
function UserProvider({ children }: UserProviderProps) {
  const [username, setUsername] = useState<string>("user123");
  
  const value = {
    username,
    setUsername
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easier context consumption
function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Export both the provider and the hook
export { UserProvider, useUser };