import { execFile } from 'child_process';
import { $props } from './../../providers/ConfigProvider';

export class PostgresQueriesService {
  /** Execute a SQL query using psql. */
  private static executeQuery(query: string): Promise<string> {
    return new Promise((resolve, reject) => {
      execFile($props.psqlPath, [
        '-h', $props.socketDir,
        '-p', '5432',
        '-d', $props.databaseName,
        '-c', query
      ], (error, stdout, stderr) => error
        ? reject(`Error executing query: ${query}: ${stderr}`)
        : resolve(stdout)
      );
    });
  }

  /** Parse the raw query result into an array of objects. */
private static parseQueryResult(rawResult: string): unknown[] {
  const lines = rawResult.split('\n');
  const headerLine = lines[0].trim();
  const rows = lines.slice(2, -2);

  const headers = headerLine.split('|').map(header => header.trim());

  const result = rows
    .filter(row => row.trim() !== '' && !row.includes('row'))
    .map(row => {
      const columns = row.split('|').map(col => col.trim());
      return headers.reduce((acc, header, index) => {
        acc[header] = columns[index];
        return acc;
      }, {} as Record<string, unknown>);
    });

  return result;
}

  /** Get all records from a table. */
  public static async getAllRecords(tableName: string): Promise<unknown[]> {
    const query = `SELECT * FROM ${tableName};`;
    const result = await PostgresQueriesService.executeQuery(query);
    return PostgresQueriesService.parseQueryResult(result);
  }

  /** Add a new record to a table. */
  public static async addRecord(tableName: string, fields: Record<string, unknown>): Promise<void> {
    console.warn('addRecord', tableName, fields);
    const columns = Object.keys(fields).join(', ');
    const values = Object.values(fields).map(value => `'${value}'`).join(', ');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
    await PostgresQueriesService.executeQuery(query);
  }

  /** Update a record by ID. */
  public static async updateRecordById(
    tableName: string,
    id: number,
    fields: Record<string, unknown>
  ): Promise<void> {
    const updates = Object.entries(fields)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(', ');
    const query = `UPDATE ${tableName} SET ${updates} WHERE id = ${id};`;
    await PostgresQueriesService.executeQuery(query);
  }

  /** Delete a record by ID. */
  public static async deleteRecordById(tableName: string, id: number): Promise<void> {
    const query = `DELETE FROM ${tableName} WHERE id = ${id};`;
    await PostgresQueriesService.executeQuery(query);
  }
}
