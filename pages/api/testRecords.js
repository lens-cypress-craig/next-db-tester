// pages/api/testRecords.js
import { getConnection } from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    // -------------------------
    // GET -> return all records + count
    // -------------------------
    case 'GET':
      try {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM testRecords');
        await connection.end();

        // Return both the rows and the row count
        return res.status(200).json({
          records: rows,
          count: rows.length,
        });
      } catch (error) {
        console.error('Error fetching records:', error);
        return res.status(500).json({ message: 'Error fetching records' });
      }

    // -------------------------
    // POST -> insert a new record
    // -------------------------
    case 'POST':
      try {
        const { name } = req.body;
        if (!name) {
          return res.status(400).json({ message: 'Name is required' });
        }

        const connection = await getConnection();
        await connection.query('INSERT INTO testRecords (name) VALUES (?)', [name]);
        await connection.end();

        return res.status(201).json({ message: 'Record inserted successfully' });
      } catch (error) {
        console.error('Error inserting record:', error);
        return res.status(500).json({ message: 'Error inserting record' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
