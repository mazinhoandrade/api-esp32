export interface drinksType {
  id: string;
  amount: number;
  name: string;
  tempoMs: number;
  createdAt: Date;
  updatedAt?: Date | null;
}