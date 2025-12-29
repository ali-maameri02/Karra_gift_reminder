// ✅ Correct: import CSS first
import '../index.css';  // 👈 relative to `src/app/main.tsx` → `src/index.css`

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);