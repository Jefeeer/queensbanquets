export async function sendInquiryNotification(inquiry, notifier) {
  const subject = `New Queen's Banquet Events inquiry from ${inquiry.coupleName}`;
  const body = [
    `Email: ${inquiry.email}`,
    `Phone/Viber: ${inquiry.phone ?? 'Not provided'}`,
    `Preferred meeting date: ${inquiry.preferredMeetingDate ?? 'Not provided'}`,
    `Coordination need: ${inquiry.coordinationNeed ?? 'Wedding coordination'}`,
    `Event date: ${inquiry.eventDate ?? 'Not provided'}`,
    `Estimated guests: ${inquiry.estimatedGuests ?? 'Not provided'}`,
    `Notes: ${inquiry.notes || 'No notes provided'}`,
  ].join('\n');

  if (!notifier?.send) {
    return {
      delivered: false,
      reason: 'notification_provider_not_configured',
      subject,
      body,
    };
  }

  return notifier.send({ subject, body });
}
