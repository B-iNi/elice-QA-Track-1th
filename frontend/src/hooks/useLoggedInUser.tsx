import { createContext, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { User } from '../types';

const LoggedInUserContext = createContext<{
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>,
}>({
  user: null,
  setUser: () => { },
});

export const LoggedInUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <LoggedInUserContext.Provider value={{ user, setUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

const useLoggedInUser = () => {
  return useContext(LoggedInUserContext);
};

export default useLoggedInUser;