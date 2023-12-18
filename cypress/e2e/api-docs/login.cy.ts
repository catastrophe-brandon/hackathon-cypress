
function visitCard(cardName) {
  cy.get(".pf-c-card").contains(cardName).click({force: true})
}
describe('Visit the API docs page log in', () => {
  it('Visit API catalog page', () => {
    cy.visit('https://developers.redhat.com/api-catalog/')
    cy.contains("Close").click()
    // force: true is required because for some reason the parent element has "hidden" in CSS
    visitCard("Advisor")
  })
})