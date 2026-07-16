export const adminToastMessages = {
  saveSuccessLive: 'Changes saved. Your live site has been updated.',
  saveSuccessDraft:
    'Changes saved on this device only. Sign out and sign in again to sync with the live site.',
  saveSuccessOffline: 'Changes saved on this device only. Connect the API to sync the live site.',
  saveError: 'Unable to save changes right now.',
  alreadyUpToDate: 'Content is already up to date.',
  removeDraft: 'Removed. Click Save to update the live site.',
  resetSuccessLive: 'All content reset to defaults. Your live site has been updated.',
  resetSuccessLocal: 'Content reset on this device. Connect the API to sync the live site.',
  syncSuccess: 'Your latest changes are now live.',
  passwordUpdated: 'Password updated successfully.',
  signedOut: 'Signed out successfully.',
  testimonialSaved: 'Review saved. Click Save to update the live site.',
  testimonialUpToDate: 'This review is already up to date.',
  passwordUnchanged: 'Enter a new password to update your credentials.',
};

export function hasUnsavedContentChanges(saved, draft) {
  return JSON.stringify(saved) !== JSON.stringify(draft);
}

export function getSaveToast({ apiOn, hasToken, savedLocally }) {
  if (apiOn && hasToken && !savedLocally) {
    return { type: 'success', message: adminToastMessages.saveSuccessLive };
  }

  if (apiOn && !hasToken) {
    return { type: 'error', message: adminToastMessages.saveSuccessDraft };
  }

  if (!apiOn) {
    return { type: 'error', message: adminToastMessages.saveSuccessOffline };
  }

  return { type: 'success', message: adminToastMessages.saveSuccessOffline };
}

export function getResetToast({ apiOn, hasToken }) {
  if (apiOn && hasToken) {
    return adminToastMessages.resetSuccessLive;
  }

  return adminToastMessages.resetSuccessLocal;
}
