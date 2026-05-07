import { UserProgress } from '../types';

const STORAGE_KEY = 'english_quest_user_data';

export const INITIAL_USER_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  gems: 320,
  coins: 1250,
  lessonsCompleted: [],
  lastActive: new Date().toISOString(),
};

export function getUserProgress(): UserProgress {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return INITIAL_USER_PROGRESS;
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USER_PROGRESS));
}
