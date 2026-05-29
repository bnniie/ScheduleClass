// Autor: Paula Guerrero
// Fecha: 25/05/26
// Descripción: Prueba unitaria para el componente raíz App.
//              Utiliza React Testing Library para renderizar el componente
//              y verificar que se muestre correctamente el enlace "learn react".

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
