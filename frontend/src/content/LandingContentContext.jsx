import { createContext, useContext, useMemo, useState } from 'react';
import { defaultLandingContent } from '../data/siteContent.js';

const LANDING_CONTENT_STORAGE_KEY = 'queens-banquet-events-content';

const LandingContentContext = createContext(null);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeContent(defaultValue, storedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(storedValue) ? storedValue : clone(defaultValue);
  }

  if (defaultValue && typeof defaultValue === 'object') {
    return Object.fromEntries(
      Object.entries(defaultValue).map(([key, value]) => [
        key,
        mergeContent(value, storedValue?.[key]),
      ]),
    );
  }

  return storedValue ?? defaultValue;
}

export function loadLandingContent() {
  try {
    const storedContent = window.localStorage.getItem(LANDING_CONTENT_STORAGE_KEY);
    return mergeContent(defaultLandingContent, storedContent ? JSON.parse(storedContent) : null);
  } catch (error) {
    return clone(defaultLandingContent);
  }
}

export function saveLandingContent(content) {
  window.localStorage.setItem(LANDING_CONTENT_STORAGE_KEY, JSON.stringify(content));
}

export function resetLandingContent() {
  window.localStorage.removeItem(LANDING_CONTENT_STORAGE_KEY);
  return clone(defaultLandingContent);
}

export function LandingContentProvider({ children }) {
  const [content, setContentState] = useState(loadLandingContent);

  function setContent(nextContent) {
    setContentState(nextContent);
    saveLandingContent(nextContent);
  }

  function resetContent() {
    const defaultContent = resetLandingContent();
    setContentState(defaultContent);
  }

  const value = useMemo(
    () => ({
      content,
      setContent,
      resetContent,
    }),
    [content],
  );

  return (
    <LandingContentContext.Provider value={value}>{children}</LandingContentContext.Provider>
  );
}

export function useLandingContent() {
  const context = useContext(LandingContentContext);

  if (!context) {
    throw new Error('useLandingContent must be used inside LandingContentProvider.');
  }

  return context;
}
