describe('Blog app', function() {

  beforeEach(function() {
    cy.resetdb()
    cy.createUser({ name : 'Frank', username : 'fgrullon', password : 'fullstackopen'})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('log in')
  })

  describe('login', function(){
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('fgrullon')
      cy.get('#password').type('fullstackopen')
      cy.get('#login-button').click()

      cy.get('.success').should('contain', 'user Frank logged in')
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

  })

  it('fails with wrong credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('fgrullon')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong username or password')
    cy.get('.error').should('contain', 'Wrong username or password')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

})
