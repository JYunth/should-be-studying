export type TimerMode = 'work' | 'break' | 'longBreak';

export interface TimerDurations {
  work: number;
  break: number;
  longBreak: number;
}

export interface TimerSettings {
  workMinutes: string;
  breakMinutes: string;
  longBreakMinutes: string;
  workSound: string;
  breakSound: string;
}