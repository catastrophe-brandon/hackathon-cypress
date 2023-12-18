
function visitCard(cardName) {
  cy.get(".pf-c-card").contains(cardName).click({force: true})
}

function cardVisible(cardName) {
  cy.get(".pf-c-card").get("article").get(".pf-m-selectable-raised").filter(":visible").contains(cardName).should("be.visible")
}

function cardHidden(cardName) {
  cy.get(".pf-c-card").contains(cardName).should("not.be.visible")
}

function visibleCards() {
	return cy.get(".pf-c-card").filter(":visible")
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

function docsPageShown(docsPageTitle) {

}

function toggleSelection(checkBoxName) {
	cy.get(".pf-c-check").contains(checkBoxName).click()
}

describe('Visit the API docs page log in', () => {

  it('Visit API catalog page', () => {
    cy.visit(landingPage)
    cy.contains("Close").click()
    // force: true is required because for some reason the parent element has "hidden" in its CSS
    visitCard("Advisor")
    // TODO: Confirm the Advisor docs are shown
    docsPageShown("Advisor")
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
		docsPageShown('Advisor')
        })

	it('Restores results when I clear the filter', () => {
		navigateToLanding()
		cy.visit(landingPage)
		searchFor('Nothing')
		cy.contains("No results found").should('be.visible')
		clearSearch()
		// Confirm cards are visible again
		cardVisible("Advisor")
		cardVisible("Automation Hub")
		cardVisible("Compliance")
		cardVisible("Cost Management")

	})

})

describe('Checkboxes on landing page', () => {
	it('Hides cards when certain checkboxes are clicked', () => {
		// Note: This test could be converted to Data-Driven, but not necessary for a Hackathon demo
		navigateToLanding()
		toggleSelection("Automation")
		cardVisible("Automation Hub")
		visibleCards().should("have.length", 3)
		toggleSelection("Automation")

		toggleSelection("Deploy");
		cardVisible("Repositories");
		cardVisible("Launch");
		cardVisible("Image Builder");
		visibleCards().should("have.length", 3);

	})

})

function menuLink(buttonLabel){
	return cy.get('pfe-navigation').shadow().find(`button#main-menu__button--${buttonLabel}`).filter(":visible")
}

describe('Nav menu is present and has the desired headings', () => {
	it('shows the expected headings on the nav menu', () => {
        navigateToLanding()
        cy.wait(1000);
        cy.get('pfe-navigation').shadow().find("button#mobile__button").click();
        menuLink("Products").should("be.visible")
        menuLink("Technologies").should("be.visible")
        menuLink("Learn").should("be.visible")
        menuLink("Events").should("be.visible")
    })
})
