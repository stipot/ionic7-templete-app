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
  translationKey: string; // Ключ для перевода
}

export const MOODS: { [key in MoodType]: MoodInfo } = {
  happy: { type: 'happy', icon: '😊', color: '#FFE15D', translationKey: 'MOOD.HAPPY' },
  relaxed: { type: 'relaxed', icon: '😌', color: '#98D8AA', translationKey: 'MOOD.RELAXED' },
  grateful: { type: 'grateful', icon: '🥰', color: '#FFD93D', translationKey: 'MOOD.GRATEFUL' },
  tired: { type: 'tired', icon: '😪', color: '#F6C6EA', translationKey: 'MOOD.TIRED' },
  unsure: { type: 'unsure', icon: '😕', color: '#E4A5FF', translationKey: 'MOOD.UNSURE' },
  bored: { type: 'bored', icon: '😐', color: '#B4CDE6', translationKey: 'MOOD.BORED' },
  angry: { type: 'angry', icon: '😠', color: '#FF8080', translationKey: 'MOOD.ANGRY' },
  stressed: { type: 'stressed', icon: '😫', color: '#A0A0A0', translationKey: 'MOOD.STRESSED' },
  sad: { type: 'sad', icon: '😢', color: '#BEADFA', translationKey: 'MOOD.SAD' }
};