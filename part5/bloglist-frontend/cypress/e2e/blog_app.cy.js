describe('Blog app', function() {

  beforeEach(function() {
    cy.resetdb()
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('log in')
  })
})