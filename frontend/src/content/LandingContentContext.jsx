import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLandingContent } from '../data/siteContent.js';

const LANDING_CONTENT_STORAGE_KEY = 'queens-banquet-events-content';
const LANDING_CONTENT_UPDATED_EVENT = 'queens-banquet-events-content-updated';

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
  window.dispatchEvent(new CustomEvent(LANDING_CONTENT_UPDATED_EVENT));
}

export function resetLandingContent() {
  window.localStorage.removeItem(LANDING_CONTENT_STORAGE_KEY);
  const defaultContent = clone(defaultLandingContent);
  window.dispatchEvent(new CustomEvent(LANDING_CONTENT_UPDATED_EVENT));
  return defaultContent;
}

export function LandingContentProvider({ children }) {
  const [content, setContentState] = useState(loadLandingContent);

  useEffect(() => {
    function syncContent(event) {
      if (event.type === 'storage' && event.key !== LANDING_CONTENT_STORAGE_KEY) {
        return;
      }

      setContentState(loadLandingContent());
    }

    window.addEventListener('storage', syncContent);
    window.addEventListener(LANDING_CONTENT_UPDATED_EVENT, syncContent);

    return () => {
      window.removeEventListener('storage', syncContent);
      window.removeEventListener(LANDING_CONTENT_UPDATED_EVENT, syncContent);
    };
  }, []);

  function setContent(nextContent) {
    setContentState(nextContent);
    saveLandingContent(nextContent);
  }

  function resetContent() {
    const defaultContent = resetLandingContent();
    setContentState(defaultContent);
    return defaultContent;
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
