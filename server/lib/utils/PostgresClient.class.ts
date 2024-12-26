import { execFile } from 'child_process';

export class PostgresClient {
  private static connectionOptions = {
    host: 'localhost',
    port: 5432,
    user: 'default_role',
    password: '',
    database: 'mygpx_pgsdb',
    socketDir: process.env.SOCKET_DIR,
    psqlPath: process.env.PSQL_PATH,
  };

  /**
   * Executes a raw SQL query using psql.
   * @param query - The SQL query string.
   * @param values - The values to be inserted into the query.
   * @returns A promise that resolves with the query result as a string.
   */
  private static executeQuery(query: string, values: unknown[] = []): Promise<string> {
    return new Promise((resolve, reject) => {
      const sanitizedValues = values.map(value => {
        if (typeof value === 'string') {
          return value.replace(/'/g, "''"); // Экранирование одинарных кавычек
        }
        return value;
      });

      execFile(PostgresClient.connectionOptions.psqlPath, [
        '-h', PostgresClient.connectionOptions.host,
        '-p', `${PostgresClient.connectionOptions.port}`,
        '-d', PostgresClient.connectionOptions.database,
        '-U', PostgresClient.connectionOptions.user,
        '-c', query.replace(/\$(\d+)/g, (_, index) => `'${sanitizedValues[Number(index) - 1]}'`), // Подстановка экранированных значений
      ], (error, stdout, stderr) => {
        if (error) {
          reject(`Error executing query: ${stderr || error.message}`);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  /**
   * Parses the result of a psql query.
   * @param data - The output from the psql command.
   * @returns The parsed result.
   */
  private static parsePostgresResponse(data: string): unknown[] {
    const lines = data.split('\n').map(line => line.trim());

    const dataLines = lines.filter(line =>
      line &&
      !line.match(/^\(.*\srows?\)$/) && // Строки вида "(1 row)"
      !line.startsWith('----')         // Разделители
    );

    if (dataLines.length === 0) {
      return [];
    }

    const headerIndex = dataLines.findIndex(line => !!line.trim());
    if (headerIndex === -1) {
      return [];
    }

    const headers = dataLines[0]
      .split('|')
      .map(header => header.trim());

    const rows = dataLines.slice(headerIndex + 1);

    const mergedRows: string[][] = [];
    let currentRow: string[] = [];
    rows.forEach(line => {
      const cells = line.split('|').map(cell => cell.trim());
      if (currentRow.length === 0) {
        currentRow = cells;
      } else {
        currentRow = currentRow.map((cell, index) =>
          cell.endsWith('+')
            ? cell.slice(0, -1) + '\n' + (cells[index]?.trim() || '')
            : cell.trim()
        );
      }

      if (!cells.some(cell => cell.endsWith('+'))) {
        mergedRows.push(currentRow);
        currentRow = [];
      }
    });

    return mergedRows.map(row => {
      return headers.reduce((record, header, index) => {
        record[header] = row[index] || null;
        return record;
      }, {} as Record<string, unknown>);
    });
  }

  /**
   * Creates a new record in the specified table.
   * @param tableName - The name of the table.
   * @param data - An object containing the data to insert.
   * @returns A promise that resolves with the created record.
   */
  public static async createRecord<T>(tableName: string, data: Record<string, unknown>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const query = `
      INSERT INTO ${tableName} (${keys.join(', ')})
      VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')})
      RETURNING *;
    `;

    const result = await PostgresClient.executeQuery(query, values);

    const record = PostgresClient.parsePostgresResponse(result)[0];
    return record as T;
  }

  /**
   * Updates an existing record in the specified table.
   * @param tableName - The name of the table.
   * @param data - An object containing the data to update, including the record ID.
   * @returns A promise that resolves with the updated record.
   */
  public static async updateRecord<T>(tableName: string, data: Record<string, unknown>): Promise<T> {
    const { id, ...fields } = data;
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setClause = keys.map((key, i) => `"${key}" = $${i + 1}`).join(', ');
    const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *;`;

    const result = await PostgresClient.executeQuery(query, [...values, id]);
    return PostgresClient.parsePostgresResponse(result)[0] as T;
  }

  /**
   * Reads records from the specified table with optional filtering and pagination.
   * @param tableName - The name of the table.
   * @param options - Options for filtering, limiting, and offsetting the query.
   * @returns A promise that resolves with the items and total count.
   */
  public static async readRecords<T>(
    tableName: string,
    options: { limit?: number; offset?: number; where?: Record<string, unknown> } = {}
  ): Promise<{ items: T[]; total: number }> {
    const whereClauses = options.where
      ? Object.entries(options.where).map(([key], index) => `"${key}" = $${index + 1}`).join(' AND ')
      : '';

    const query = `
      SELECT * FROM ${tableName}
      ${whereClauses ? `WHERE ${whereClauses}` : ''}
      ORDER BY "created_at" DESC
      LIMIT $${Object.keys(options.where || {}).length + 1} OFFSET $${Object.keys(options.where || {}).length + 2};
    `;

    const values = [...Object.values(options.where || {}), options.limit || 20, options.offset || 0];
    const itemsResult = await PostgresClient.executeQuery(query, values);
    const items = PostgresClient.parsePostgresResponse(itemsResult) as T[];

    const countQuery = `SELECT COUNT(*) AS total FROM ${tableName} ${whereClauses ? `WHERE ${whereClauses}` : ''};`;
    const countResult = await PostgresClient.executeQuery(countQuery, Object.values(options.where || {}));
    const [{ total }] = PostgresClient.parsePostgresResponse(countResult) as { total: number }[];

    return { items, total };
  }

  /**
   * Reads a single record by ID from the specified table.
   * @param tableName - The name of the table.
   * @param id - The ID of the record to fetch.
   * @returns A promise that resolves with the fetched record.
   */
  public static async readRecord<T>(tableName: string, id: number): Promise<T> {
    const query = `SELECT * FROM ${tableName} WHERE id = $1;`;
    const result = await PostgresClient.executeQuery(query, [id]);
    const record = PostgresClient.parsePostgresResponse(result)[0] as T;
    if (!record) throw new Error(`Record with id ${id} not found in ${tableName}`);
    return record;
  }

  /**
   * Deletes a record by ID from the specified table.
   * @param tableName - The name of the table.
   * @param id - The ID of the record to delete.
   * @returns A promise that resolves with a boolean indicating success or failure.
   */
  public static async deleteRecord(tableName: string, id: number): Promise<boolean> {
    const query = `DELETE FROM ${tableName} WHERE id = $1;`;
    const result = await PostgresClient.executeQuery(query, [id]);
    return result.includes('DELETE');
  }
}
