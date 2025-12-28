import { useSQLiteContext } from 'expo-sqlite';

export type ITargetCreate = {
  name: string;
  amount: number;
};

export type ITargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number; // total que tem guardado da meta
  percentage: number;
  created_at: Date;
  updated_at: Date;
};

export type ITargetUpdate = ITargetCreate & {
  id: number;
};

export function useTargetDatabase() {
  const database = useSQLiteContext();

  async function create(data: ITargetCreate) {
    const statement = await database.prepareAsync(
      'INSERT INTO targets (name, amount) VALUES ($name, $amount)'
    );

    statement.executeAsync({ $name: data.name, $amount: data.amount });
  }

  /**
   * QUANTO MAIOR O VALOR GUARDADO (MAIS TRANSAÇÕES DE ENTRADA TIVER EM UMA META)
   * VAI FICAR NA PARTE DE CIMA DA LISTA
   *
   * NO INÍCIO O CURRENT VAI RETORNAR NULL, PORQUE PRIMEIRO CADASTRA UMA META PARA
   * DEPOIS TER UMA TRANSAÇÃO, MAS PRECISAMOS RETORNAR ESSE VALOR ZERADO.
   * ENTÃO USAREMOS O COALESCE, SE NÃO ENCONTRAR VAI RETORNAR 0.
   */
  async function listByClosestTarget(): Promise<ITargetResponse[]> {
    return database.getAllAsync<ITargetResponse>(`
      SELECT
        targets.id,
        targets.name,
        targets.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
        targets.created_at,
        targets.updated_at
      FROM
        targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY targets.id, targets.name, targets.amount
      ORDER BY percentage DESC
    `);
  }

  async function show(id: number) {
    return database.getFirstAsync<ITargetResponse>(`
      SELECT
        targets.id,
        targets.name,
        targets.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
        targets.created_at,
        targets.updated_at
      FROM
        targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      WHERE targets.id = ${id}
    `);
  }

  async function update(data: ITargetUpdate) {
    const statement = await database.prepareAsync(`
      UPDATE targets SET
        name = $name,
        amount = $amount,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $id`);

    await statement.executeAsync({
      $id: data.id,
      $name: data.name,
      $amount: data.amount,
    });
  }

  async function remove(id: number) {
    await database.runAsync('DELETE FROM targets WHERE id = ?', id);
  }

  return { create, listByClosestTarget, show, update, remove };
}
