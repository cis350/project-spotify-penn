describe('Communities', () => {
  beforeEach(() => {
    cy.visit('https://localhost:3000/communities'); // Replace with your actual login page URL
  });

  it('successfullly gets to communities page', () => {
    cy.get('button').contains('Create New Community');
  });
  
  // it('successfullly gets to communities page', () => {
  //   cy.get('input[name="email"]')
  //     .type('user@example.com')
  //     .should('have.value', 'user@example.com');

  //   cy.get('input[name="password"]')
  //     .type('P@ssw0rd')
  //     .should('have.value', 'P@ssw0rd');

  //   cy.get('button[type="submit"]').click();

  //   cy.url().should('include', '/dashboard'); // Replace with the URL path of your application's dashboard
  //   cy.contains('Welcome, user!'); // Replace with the actual text or element that confirms a successful login
  // });

  // it('shows an error message with invalid credentials', () => {
  //   cy.get('input[name="email"]')
  //     .type('invaliduser@example.com')
  //     .should('have.value', 'invaliduser@example.com');

  //   cy.get('input[name="password"]')
  //     .type('InvalidP@ssw0rd')
  //     .should('have.value', 'InvalidP@ssw0rd');

  //   cy.get('button[type="submit"]').click();

  //   cy.contains('Invalid username or password'); // Replace with the actual error message displayed on invalid login
  // });
});
