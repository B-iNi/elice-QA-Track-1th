import { createContext, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

const currentThemeContext = createContext<{
  id: number,
  setId: Dispatch<SetStateAction<number>>,
}>({
  id: 0,
  setId: () => { },
});

export const CurrentThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState(0);

  return (
    <currentThemeContext.Provider value={{ id, setId }}>
      {children}
    </currentThemeContext.Provider>
  );
};

const useCurrentTheme = () => {
  return useContext(currentThemeContext);
};

export default useCurrentTheme;