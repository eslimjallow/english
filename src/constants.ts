import { Lesson, LessonType, Quest } from './types';

export const SAMPLE_QUESTS: Quest[] = [
  {
    id: 'daily-1',
    title: 'Misión diaria',
    description: 'Completa 3 lecciones de vocabulario',
    rewardXp: 20,
    rewardCoins: 50,
    target: 3,
    current: 2,
  }
];

export const LEARNING_PATH = [
  { id: '1', title: 'Escucha', type: LessonType.LISTENING, icon: 'Headphones', status: 'available', stars: 3 },
  { id: '2', title: 'Habla', type: LessonType.SPEAKING, icon: 'MessageCircle', status: 'available', stars: 2 },
  { id: '3', title: 'Lee', type: LessonType.READING, icon: 'BookOpen', status: 'available', stars: 3 },
  { id: '4', title: 'Escribe', type: LessonType.WRITING, icon: 'PenTool', status: 'available', stars: 1 },
  { id: '5', title: 'Desafío', type: LessonType.TRANSLATION, icon: 'Lock', status: 'locked', stars: 0 },
];
