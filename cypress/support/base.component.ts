export abstract class BaseComponent {
  abstract pageUrl: string;

  clickOnElem(elementSelector: string, elementIndex = 0) {
    cy.get(elementSelector).eq(elementIndex).click();
  }

  clickOnElemWithText(elementSelector: string, textToContains: string) {
    cy.get(elementSelector).contains(textToContains).click();
  };

  hoverOnElem(elementSelector: string) {
    cy.get(elementSelector).trigger('mouseover');
  };

  typeIntoInput(inputSelector: string, textToType: string) {
    cy.get(inputSelector).type(textToType);
  }

  isCurrentUrlInclude(textToCompare: string) {
    cy.url()
      .should('include', textToCompare);
  }

  isElemContainText(elementSelector: string, textToContains: string) {
    cy.get(elementSelector)
      .should('to.contain', textToContains);
  };

  isElemHaveValue(elementSelector: string, valueToContains: string) {
    cy.get(elementSelector)
      .should('to.have.value', valueToContains);
  }

  isElemTextMatch(elementSelector: string, regexTempl: RegExp, elemIndex = 0) {
    cy.get(elementSelector).eq(elemIndex)
      .invoke('text')
      .should('match', regexTempl);
  }

  isElemVisible(elementSelector: string) {
    cy.get(elementSelector)
      .should('to.be.visible');
  }
}
