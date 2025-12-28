import { useSQLiteContext } from 'expo-sqlite';

export type ITransactionCreate = {
  target_id: number;
  amount: number;
  observation?: string;
};

export type ITransactionResponse = {
  id: number;
  target_id: number;
  amount: number;
  observation: string;
  created_at: Date;
  updated_at: Date;
};

export type ISummary = {
  input: number;
  output: number;
};

export function useTransactionsDatabase() {
  const database = useSQLiteContext();

  async function create(data: ITransactionCreate) {
    const statement = await database.prepareAsync(`
      INSERT INTO transactions (target_id, amount, observation)
      VALUES ($target_id, $amount, $observation)  
    `);

    await statement.executeAsync({
      $target_id: data.target_id,
      $amount: data.amount,
      $observation: data.observation,
    });
  }

  function listByTargetId(id: number) {
    return database.getAllAsync<ITransactionResponse>(`
      SELECT id, target_id, amount, observation, created_at, updated_at
      FROM transactions
      WHERE target_id = ${id}
      ORDER BY created_at DESC
    `);
  }

  async function remove(id: number) {
    await database.runAsync('DELETE FROM transactions WHERE id = ?', id);
  }

  function summary() {
    return database.getFirstAsync<ISummary>(`
      SELECT 
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS input,
        COALESCE(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END), 0) AS output
      FROM transactions 
    `);
  }

  return { create, listByTargetId, remove, summary };
}
