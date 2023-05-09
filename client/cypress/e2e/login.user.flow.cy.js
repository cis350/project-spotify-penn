describe('Login User Flow', () => {
  beforeEach(() => {
    // Change this URL to the URL of your login page
    cy.visit('http://localhost:3000/login');
  });

  it('successfully logs in a user and redirects to the correct page', () => {
    // Use the provided email and password for the admin user
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'password';

    // Assuming you have an input field with `name="email"` and `name="password"`
    cy.get('input[name="email"]').type(adminEmail);
    cy.get('input[name="password"]').type(adminPassword);

    // Assuming you have a button with `type="submit"` for the login form
    cy.get('button[type="submit"]').click();

    // Check if the user is redirected to the correct page after successful login
    // Replace '/your-page' with the expected URL path after login
    cy.url().should('include', '/your-page');

    // Check for an element on the redirected page that indicates the user is logged in
    // Replace this with an appropriate selector for an element unique to the redirected page when a user is logged in
    cy.get('.logged-in-element').should('be.visible');
  });

  it('displays an error message for invalid credentials', () => {
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'invalidpassword';

    cy.get('input[name="email"]').type(invalidEmail);
    cy.get('input[name="password"]').type(invalidPassword);

    cy.get('button[type="submit"]').click();

    // Assuming that the error message is displayed using the 'Alert' component with the 'red' color
    // This selector targets the Alert component with the 'red' color
    cy.get('.mantine-alert-color-red').should('be.visible');
  });
});
