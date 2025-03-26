// pages/index.js
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [records, setRecords] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch records from our API
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/testRecords');
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      // data = { records: [...], count: number }
      setRecords(data.records);
      setRecordCount(data.count);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle new record form submission
  const addRecord = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a name.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/testRecords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        // e.g. 400 or 500
        const errorData = await res.json();
        alert(`Error inserting record: ${errorData.message}`);
        return;
      }

      // If successful, clear the input and re-fetch records
      setName('');
      await fetchRecords();
    } catch (error) {
      console.error('Error inserting record:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Test Records</h1>

      {/* Display the total record count */}
      <p>Total Records: {recordCount}</p>

      <form onSubmit={addRecord} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Record'}
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created_At</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
