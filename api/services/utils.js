export function buildInsertQuery(table, data, allowedFields) {
    const fields = allowedFields.filter(field => data[field] != null); // skip null & undefined
    const values = fields.map(field => data[field]);
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');

    const query = `
        INSERT INTO ${table} (${fields.join(', ')})
        VALUES (${placeholders})
        RETURNING *;
    `;

    return { query, values };
}