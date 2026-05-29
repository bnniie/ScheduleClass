// Autor: Paula Guerrero
// Fecha: 29/05/26
// Descripción: Configuración de ESLint para el proyecto ScheduleClass.
//              Define reglas y plugins para mantener la calidad del código,
//              integrando soporte para TypeScript, React y Jest.
//              Utiliza el nuevo formato "flat config" de ESLint.

import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      globals: {
        ...globals.browser, // reconoce alert, window, document, HTMLInputElement
        ...globals.jest     // reconoce test, expect, describe, beforeEach, afterEach
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Apaga la regla base de JS
      "no-unused-vars": "off",

      // Activa la versión de TS con excepciones
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",   // ignora parámetros que empiecen con _
          varsIgnorePattern: "^_",   // ignora variables que empiecen con _
          ignoreRestSiblings: true   // ignora casos en destructuring
        }
      ],

      "no-console": "off"
    },
  },
];