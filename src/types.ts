
export enum LessonType {
  TRANSLATION = 'translation',
  SPEAKING = 'speaking',
  LISTENING = 'listening',
  READING = 'reading',
  WRITING = 'writing'
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  gems: number;
  coins: number;
  lessonsCompleted: string[];
  lastActive: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  description: string;
  content: string;
  answer?: string;
  options?: string[];
  xpReward: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  rewardCoins: number;
  target: number;
  current: number;
}
