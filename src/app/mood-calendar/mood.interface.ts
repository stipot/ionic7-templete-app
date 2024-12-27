// mood.interface.ts
export interface MoodEntry {
  id: string;
  date: Date;
  mood: MoodType;
  note?: string;
}

export type MoodType = 'happy' | 'relaxed' | 'grateful' | 
                      'tired' | 'unsure' | 'bored' |
                      'angry' | 'stressed' | 'sad';

export interface MoodInfo {
  type: MoodType;
  icon: string;
  color: string;
  label: string;
}

export const MOODS: { [key in MoodType]: MoodInfo } = {
  happy: { type: 'happy', icon: '😊', color: '#FFE15D', label: 'Счастливый' },
  relaxed: { type: 'relaxed', icon: '😌', color: '#98D8AA', label: 'Расслабленный' },
  grateful: { type: 'grateful', icon: '🥰', color: '#FFD93D', label: 'Благодарный' },
  tired: { type: 'tired', icon: '😪', color: '#F6C6EA', label: 'Уставший' },
  unsure: { type: 'unsure', icon: '😕', color: '#E4A5FF', label: 'Неуверенный' },
  bored: { type: 'bored', icon: '😐', color: '#B4CDE6', label: 'Скучающий' },
  angry: { type: 'angry', icon: '😠', color: '#FF8080', label: 'Злой' },
  stressed: { type: 'stressed', icon: '😫', color: '#A0A0A0', label: 'В стрессе' },
  sad: { type: 'sad', icon: '😢', color: '#BEADFA', label: 'Грустный' }
};