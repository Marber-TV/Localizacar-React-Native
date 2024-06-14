import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const ThemeContext = createContext();

// Crear un proveedor de tema que envuelve la aplicación
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light' es el valor predeterminado

  // Cambiar entre 'light' y 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el tema en cualquier componente
export const useTheme = () => useContext(ThemeContext);
