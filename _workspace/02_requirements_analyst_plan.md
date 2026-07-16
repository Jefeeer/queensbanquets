# Requirements Plan: Contact Manager Sidepanel Redesign

Redesign the "Contact" page configuration section (`ContactEditor` component) in `AdminApp.jsx` to adopt the dark, gold-bordered bento grid layout with a sidepanel configuration.

## Proposed Changes

### ContactEditor Component

- **Layout Structure**: Port a split grid layout (12 columns):
  - **Left Booking Configuration Panel (col-span-12 lg:col-span-7 bento-card)**: Contains inputs for Booking Form Copy setting fields:
    - Booking Eyebrow (bound to `draft.contactContent.eyebrow`)
    - Booking Title (bound to `draft.contactContent.title`)
    - Booking Description (textarea bound to `draft.contactContent.description`)
    - Success Message (bound to `draft.contactContent.successMessage`)
  - **Right Contact Channels Sidepanel (col-span-12 lg:col-span-5 bento-card)**: Lists direct concierge contact channels (Viber, Mobile, Landline, Email) in a sleek vertical column.
    - Each channel has inline fields for Label, Value, and Link/href, with a delete action.
    - An Add Contact Channel button is present at the bottom of the sidebar.
