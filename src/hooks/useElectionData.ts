import { create } from 'zustand';
import { ELECTION_TIMELINE } from '../data/election';
import { TimelineStep } from '../types';

interface ElectionDataState {
  timeline: TimelineStep[];
  currentStepIndex: number;
  setCurrentStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const useElectionData = create<ElectionDataState>((set) => ({
  timeline: ELECTION_TIMELINE,
  currentStepIndex: 0,
  setCurrentStep: (index: number) => set({ currentStepIndex: index }),
  nextStep: () => set((state) => ({ 
    currentStepIndex: Math.min(state.currentStepIndex + 1, state.timeline.length - 1) 
  })),
  prevStep: () => set((state) => ({ 
    currentStepIndex: Math.max(state.currentStepIndex - 1, 0) 
  }))
}));
