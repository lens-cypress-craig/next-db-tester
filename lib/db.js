import mysql from 'mysql2/promise';

export async function getConnection() {
  // Adjust your credentials accordingly:
  const connection = await mysql.createConnection({
    host: '1631059968.t.c.aee-sites.com',
    port: 20502,
    user: 'root',
    password: '6UtyPTaVMWzU',
   database: 'sys',
    ssl: {
        // --- Minimal example (not recommended for production) ---
        //   This will skip certificate validation
        rejectUnauthorized: false,
  
        // --- Production approach ---
        //   Provide the CA certificate if MySQL server requires it:
        // ca: fs.readFileSync(path.join(process.cwd(), 'path-to-ca-cert.pem'))
      },
  });
  return connection;
}