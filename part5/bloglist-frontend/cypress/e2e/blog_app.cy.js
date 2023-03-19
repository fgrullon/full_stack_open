describe('Blog app', function() {

  beforeEach(function() {
    cy.resetdb()
    cy.createUser({ name : 'Frank', username : 'fgrullon', password : 'fullstackopen' })
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.login({ username :'fgrullon', password : 'fullstackopen' })
    })

    it('A blog can be created', function() {

      cy.get('.title').type('What Is JavaScript Made Of?')
      cy.get('.author').type('Dan Abramov')
      cy.get('.url').type('https://overreacted.io')

      cy.get('.submit').click()

      cy.get('.blog').should('contain', 'What Is JavaScript Made Of? Dan Abramov')

      cy.get('.success').should('contain', 'a new blog What Is JavaScript Made Of? by Dan Abramov added')
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')

    })

    describe('When a blog is created', function(){
      beforeEach(function() {

        cy.get('.title').type('What Is JavaScript Made Of?')
        cy.get('.author').type('Dan Abramov')
        cy.get('.url').type('https://overreacted.io')

        cy.get('.submit').click()

      })
      it.only('A blog cand be liked', function() {
        cy.get('.showDetail').click()
        cy.get('.like').click()

        cy.get('.blog').should('contain', 'likes 1')
      })

    })


  })


})

