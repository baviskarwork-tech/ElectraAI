import { create } from 'zustand';
import { ELECTION_TIMELINE } from '@/data/election';
import { TimelineStep } from '@/types';

interface ElectionDataState {
  timeline: TimelineStep[];
  currentStepIndex: number;
  setCurrentStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

/**
 * useElectionData Hook (Zustand Store)
 * Manages the election process timeline state.
 * Provides functions to navigate through steps and track active progress.
 */
export const useElectionData = create<ElectionDataState>((set) => ({
  timeline: ELECTION_TIMELINE,
  currentStepIndex: 0,

  /**
   * Updates the current active step in the timeline.
   */
  setCurrentStep: (index: number) => set({ currentStepIndex: index }),

  /**
   * Advances to the next step if available.
   */
  nextStep: () => set((state) => ({ 
    currentStepIndex: Math.min(state.currentStepIndex + 1, state.timeline.length - 1) 
  })),

  /**
   * Goes back to the previous step if available.
   */
  prevStep: () => set((state) => ({ 
    currentStepIndex: Math.max(state.currentStepIndex - 1, 0) 
  }))
}));
