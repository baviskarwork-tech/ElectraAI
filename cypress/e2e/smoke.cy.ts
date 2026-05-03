describe('ElectraAI Smoke Test', () => {
  it('loads the home page and navigates to timeline', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Understand Elections in 5 Minutes').should('be.visible');
    
    // Navigate to Timeline
    cy.contains('Start Learning').click();
    cy.url().should('include', '/timeline');
    cy.contains('Election Process Timeline').should('be.visible');
  });

  it('navigates to quiz and interacts with it', () => {
    cy.visit('http://localhost:3000/quiz');
    cy.contains('Knowledge Check').should('be.visible');
    
    // Test the first question
    cy.contains('Voter Registration').click();
    cy.contains('Explanation:').should('be.visible');
    
    // Go to next question
    cy.contains('Next Question').click();
    cy.contains('Question 2 of 3').should('be.visible');
  });

  it('navigates to assistant and checks UI', () => {
    cy.visit('http://localhost:3000/assistant');
    cy.contains('AI Assistant').should('be.visible');
    cy.get('input[placeholder="Ask a question..."]').should('exist');
  });
});
