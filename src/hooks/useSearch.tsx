import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const clearSearchTerm = () => setSearchTerm('');

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, clearSearchTerm }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch deve ser usado dentro de um SearchProvider');
  }
  return context;
};
