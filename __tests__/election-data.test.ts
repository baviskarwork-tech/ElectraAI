import { ELECTION_TIMELINE, QUIZ_QUESTIONS } from '@/data/election';

describe('Election Data Structure', () => {
  it('28. TIMELINE has all required steps in order', () => {
    expect(ELECTION_TIMELINE.length).toBeGreaterThanOrEqual(5);
    expect(ELECTION_TIMELINE[0].title).toBe('Voter Registration');
    // The last step is 'Results Declaration'
    expect(ELECTION_TIMELINE[ELECTION_TIMELINE.length - 1].title).toBe('Results Declaration');
  });

  it('29. All QUIZ_QUESTIONS have valid options and a correct answer', () => {
    QUIZ_QUESTIONS.forEach(q => {
      expect(q.options).toContain(q.correctAnswer);
      expect(q.options.length).toBe(4);
      expect(q.explanation.length).toBeGreaterThan(10);
    });
  });

  it('30. TIMELINE steps have non-empty roles', () => {
    ELECTION_TIMELINE.forEach(step => {
      expect(step.roles.length).toBeGreaterThan(0);
    });
  });
});
