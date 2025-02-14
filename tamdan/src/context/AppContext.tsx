import { createContext, useState, ReactNode } from 'react';

import { User, AppContextType } from '../types';

export const AppContext = createContext<AppContextType>({
  user: null,
  show: false,
  setShow: () => {},
  setUser: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const contextValue: AppContextType = {
    user,
    show,
    setShow,
    setUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
