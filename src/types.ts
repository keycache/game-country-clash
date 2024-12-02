export interface Country {
  id: string;
  name: string;
  flag: string;
  capital: string;
  continent: string;
  totalArea: number;
  borderingCountries: number;
  highestPoint: number;
  lowestPoint: number;
  landBorders: number;
  seaBorders: number;
}

export interface GameState {
  id: string;
  startTime: string;
  endTime?: string;
  eliminationOrder: string[];
  winner?: string;
  isComplete: boolean;
}

export interface GameHistory {
  games: GameState[];
}