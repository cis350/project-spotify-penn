describe('Login User Flow', () => {
  beforeEach(() => {
    // Change this URL to the URL of your login page
    cy.visit('http://localhost:3000/login');
  });

  // it('takes you to the login page', () => {
  //   cy.get('button').contains('Sign In');
  // });

  it('successfully logs in a user and redirects to the correct page', () => {

    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'password';

    cy.get('input[placeholder="you@upenn.edu"]').type(adminEmail);
    cy.get('input[placeholder="Your password"]').type(adminPassword);

    cy.get('button[type="submit"]').click();

    // cy.url().should('include', 'https://accounts.spotify.com');

    cy.wait(20000);

    cy.url().should('include', 'http://localhost:3000/home');

    cy.get('.mantine-Text-root.mantine-Title-root').should('contain', 'Welcome to Spotify@Penn!');

  });

  it('displays an error message for invalid credentials', () => {
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'invalidpassword';

    cy.get('input[placeholder="you@upenn.edu"]').type(invalidEmail);
    cy.get('input[placeholder="Your password"]').type(invalidPassword);

    cy.get('button[type="submit"]').click();

    cy.get('[role="alert"]', { timeout: 10000 }).should('be.visible');
  });
});
