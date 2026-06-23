export function normalizeInquiry(inquiry) {
  return {
    coupleName: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || null,
    preferredMeetingDate: inquiry.meetingDate || null,
    eventDate: inquiry.eventDate || null,
    coordinationNeed: inquiry.coordinationNeed || 'Wedding coordination',
    estimatedGuests: inquiry.guests ? Number(inquiry.guests) : null,
    notes: inquiry.message || '',
    source: 'website',
  };
}

export async function createEventInquiry(inquiry, repository) {
  const normalizedInquiry = normalizeInquiry(inquiry);

  if (!repository?.saveInquiry) {
    return {
      id: crypto.randomUUID(),
      status: 'pending_database_integration',
      ...normalizedInquiry,
    };
  }

  return repository.saveInquiry(normalizedInquiry);
}
