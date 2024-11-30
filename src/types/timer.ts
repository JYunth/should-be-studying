export type TimerMode = 'work' | 'break' | 'longBreak';

export interface TimerDurations {
  work: number;
  break: number;
  longBreak: number;
}