export async function saveInquiry(pool, inquiry) {
  const result = await pool.query(
    `
      INSERT INTO event_inquiries (
        couple_name,
        email,
        phone,
        preferred_meeting_date,
        event_date,
        coordination_need,
        estimated_guests,
        notes,
        source
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING
        id,
        couple_name AS "coupleName",
        email,
        phone,
        preferred_meeting_date AS "preferredMeetingDate",
        event_date AS "eventDate",
        coordination_need AS "coordinationNeed",
        estimated_guests AS "estimatedGuests",
        notes,
        status,
        source,
        created_at AS "createdAt"
    `,
    [
      inquiry.coupleName,
      inquiry.email,
      inquiry.phone,
      inquiry.preferredMeetingDate,
      inquiry.eventDate,
      inquiry.coordinationNeed,
      inquiry.estimatedGuests,
      inquiry.notes,
      inquiry.source ?? 'website',
    ],
  );

  return result.rows[0];
}

export async function listInquiries(pool, limit = 50) {
  const result = await pool.query(
    `
      SELECT
        id,
        couple_name AS "coupleName",
        email,
        phone,
        preferred_meeting_date AS "preferredMeetingDate",
        event_date AS "eventDate",
        coordination_need AS "coordinationNeed",
        estimated_guests AS "estimatedGuests",
        notes,
        status,
        source,
        created_at AS "createdAt"
      FROM event_inquiries
      ORDER BY created_at DESC
      LIMIT $1
    `,
    [limit],
  );

  return result.rows;
}

export async function updateInquiryStatus(pool, id, status) {
  const result = await pool.query(
    `
      UPDATE event_inquiries
      SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        couple_name AS "coupleName",
        email,
        phone,
        preferred_meeting_date AS "preferredMeetingDate",
        event_date AS "eventDate",
        coordination_need AS "coordinationNeed",
        estimated_guests AS "estimatedGuests",
        notes,
        status,
        source,
        created_at AS "createdAt"
    `,
    [id, status],
  );

  return result.rows[0] ?? null;
}

export async function getAnalytics(pool) {
  const [totalRes, statusRes, needRes] = await Promise.all([
    pool.query(`SELECT COUNT(*) as count FROM event_inquiries`),
    pool.query(`SELECT status, COUNT(*) as count FROM event_inquiries GROUP BY status`),
    pool.query(`SELECT COALESCE(coordination_need, 'Unspecified') as need, COUNT(*) as count FROM event_inquiries GROUP BY coordination_need`),
  ]);

  const statusCounts = {};
  for (const row of statusRes.rows) {
    statusCounts[row.status] = parseInt(row.count, 10);
  }

  const needCounts = {};
  for (const row of needRes.rows) {
    needCounts[row.need] = parseInt(row.count, 10);
  }

  return {
    total: parseInt(totalRes.rows[0].count, 10),
    byStatus: statusCounts,
    byNeed: needCounts,
  };
}

export const inquiryRepository = {
  saveInquiry,
  listInquiries,
  updateInquiryStatus,
  getAnalytics,
};
