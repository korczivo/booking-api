import { Pool } from 'pg';
import envJS from '../../../env';

const databaseConfig = { connectionString: envJS.database_url };
const pool = new Pool(databaseConfig);

export default pool;
