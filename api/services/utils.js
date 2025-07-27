export function buildInsertQuery(table, data, allowedFields) {
  const fields = allowedFields.filter((field) => data[field] != null); // skip null & undefined
  const values = fields.map((field) => data[field]);
  const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

  const query = `
        INSERT INTO ${table} (${fields.join(", ")})
        VALUES (${placeholders})
        RETURNING *;
    `;

  return { query, values };
}

export function buildUpdateQuery(
  table,
  data,
  allowedFields,
  whereClause,
  whereValues,
  returning = "*"
) {
  const fields = allowedFields.filter((field) => data[field] != null);
  if (fields.length === 0) {
    throw new Error("No valid fields provided to update");
  }

  const setClauses = fields
    .map((field, i) => `${field} = $${i + 1}`)
    .join(", ");

  const setValues = fields.map((field) => data[field]);

  const values = [...setValues, ...whereValues];

  const query = `
    UPDATE ${table}
    SET ${setClauses}
    WHERE ${whereClause}
    RETURNING ${returning};
  `;

  return { query, values };
}

export function buildPaginatedQuery({
  baseTable,
  where = {},
  filters = {},
  searchFields = [],
  allowedSortFields = [],
  defaultSortBy = "created_at",
  page = 1,
  limit = 10,
}) {
  const values = [];
  const whereClauses = [];

  for (const [key, value] of Object.entries(where)) {
    if (value !== undefined && value !== "") {
      values.push(value);
      whereClauses.push(`${key} = $${values.length}`);
    }
  }

  if (filters.search && searchFields.length > 0) {
    const searchValue = `%${filters.search}%`;
    const searchConditions = searchFields.map((field) => {
      values.push(searchValue);
      return `${field} ILIKE $${values.length}`;
    });
    whereClauses.push(`(${searchConditions.join(" OR ")})`);
  }

  const whereClause =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const sortBy = allowedSortFields.includes(filters.sortBy)
    ? filters.sortBy
    : defaultSortBy;
  const sortOrder =
    filters.sortOrder?.toLowerCase() === "desc" ? "DESC" : "ASC";

  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM ${baseTable}
    ${whereClause}
    ORDER BY ${sortBy} ${sortOrder}
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const countQuery = `
    SELECT COUNT(*) FROM ${baseTable}
    ${whereClause}
  `;

  values.push(limit, offset);

  return { query, countQuery, values };
}
