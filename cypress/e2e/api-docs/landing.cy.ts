
function visitCard(cardName) {
  cy.get(".pf-c-card").contains(cardName).click({force: true})
}

function searchFor(searchStr) {
  cy.get("input[aria-label='Search input']").type(searchStr)
}

function clearSearch() {
  cy.get("input[aria-label='Search input']").clear()
}

let landingPage = "https://developers.redhat.com/api-catalog/"


function navigateToLanding() {
    // go to the landing page and dismiss the pop-up
    cy.visit(landingPage)
    cy.contains("Close").click()
}

describe('Visit the API docs page log in', () => {
  it('Visit API catalog page', () => {
    cy.visit(landingPage)
    cy.contains("Close").click()
    // force: true is required because for some reason the parent element has "hidden" in CSS
    visitCard("Advisor")
    // TODO: Confirm the Advisor docs are shown
  })
})

describe('Filtering on landing page', () => {
	it('Filters results when I type stuff', () => {
		navigateToLanding()
		searchFor('Something something')
                cy.contains("No results found").should('be.visible')
                clearSearch()		
		searchFor('Advisor')
		// TODO: Confirm results only contained matches for Advisor
        })

	it('Restores results when I clear the filter', () => {
		navigateToLanding()
		cy.visit(landingPage)
		searchFor('Nothing')
		clearSearch()
		// TODO: Confirm that all content is displayed

	})

})
