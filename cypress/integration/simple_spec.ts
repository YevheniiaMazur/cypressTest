describe('Test Suite Amazon not authorized user', () => {
  beforeEach(() => cy.visit('https://www.amazon.com/'));

  it('Product filtering by category check', () => {
    cy.get('[aria-label^="Shop by Category"]').click();
    cy.get('[href*="leftnav_computers"]').click();

    cy.get('h1')
      .should('to.contain', 'Computers');
    cy.get('#s-result-count')
      .invoke('text')
      .should('match', /1-\d+ of \d+ results for/);
    cy.get('#sort')
      .should('to.have.value', 'featured-rank');

    cy.get('#twotabsearchtextbox').type('mouse');
    cy.get('.nav-search-submit').click();

    cy.get('.s-breadcrumb')
      .should('to.contain', 'Computers')
      .and('to.contain', 'mouse');
    cy.get('.s-breadcrumb span').eq(0)
      .invoke('text')
      .should('match', /1-\d+ of \d+ results for/);
  });

  it('Product filtering by Deal type check', () => {
    cy.get('.nav-a').contains('Today\'s Deals').click();

    cy.get('.gbh1-bold')
      .should('to.contain', 'Deals')
      .and('to.be.visible');
    cy.get('.a-dropdown-prompt')
      .should('to.contain', 'Relevance');

    cy.get('[data-value="DEAL_OF_THE_DAY"]').click();

    cy.get('.dealTile')
      .each($productTile => cy.wrap($productTile)
        .should('to.have.descendants', '.dotdBadge'));
  });

  // should be reworked due to several types of logic for the product adding
  it.skip('Product ordering functionality check', () => {
    cy.get('#twotabsearchtextbox').type('laptop');
    cy.get('.nav-search-submit').click();

    cy.get('.s-search-results h2 a').eq(1).click();
    cy.get('#add-to-cart-button').click();

    cy.get('.a-alert-heading')
      .should('to.contain', 'Added to Cart');
    cy.get('#hlb-subcart')
      .should('to.be.visible');

    cy.get('#hlb-view-cart-announce').click();

    cy.url()
      .should('include', 'cart/view.html');

    cy.get('#sc-buy-box-ptc-button').click();

    cy.url()
      .should('include', 'https://www.amazon.com/ap/signin');
  });
});

describe('Localization test suite', () => {
  beforeEach(() => cy.visit('https://www.amazon.com/'));

  it('By default EN localization is used', () => {
    cy.get('.icp-nav-language').invoke('text')
      .should('match', /EN/);
    cy.get('#nav-shop .nav-line-2').invoke('text')
      .should('match', /Departments/);
    cy.get('#nav-link-accountList .nav-line-1').invoke('text')
      .should('match', /Hello, Sign in/);
    cy.get('#nav-link-accountList .nav-line-2').invoke('text')
      .should('match', /Account & Lists/);
    // amazon issue: with reproducibility 5/10 this row is empty
    // cy.get('#nav-orders .nav-line-1').invoke('text').should('match', /Returns/);
    cy.get('#nav-orders .nav-line-2').invoke('text')
      .should('match', /Orders/);
    cy.get('#nav-cart .nav-line-2').invoke('text')
      .should('match', /Cart/);
  });

  it('ES localization check', () => {
    cy.get('#icp-nav-flyout').trigger('mouseover');

    cy.get('#nav-flyout-icp')
      .should('to.be.visible');

    cy.get('#nav-flyout-icp [href="#switch-lang=es_US"]').click();

    cy.get('.icp-nav-language').invoke('text')
      .should('match', /ES/);
    cy.get('#nav-shop .nav-line-2').invoke('text')
      .should('match', /Departamentos/);
    cy.get('#nav-link-accountList .nav-line-1').invoke('text')
      .should('match', /Hola, Identifícate/);
    cy.get('#nav-link-accountList .nav-line-2').invoke('text')
      .should('match', /Cuenta y Listas/);
    // amazon issue: with reproducibility 5/10 this row is empty
    // cy.get('#nav-orders .nav-line-1').invoke('text').should('match', /Devoluciones/);
    cy.get('#nav-orders .nav-line-2').invoke('text')
      .should('match', /Pedidos/);
    cy.get('#nav-cart .nav-line-2').invoke('text')
      .should('match', /Carrito/);
  });

  it('DE localization check', () => {
    cy.get('#icp-nav-flyout').trigger('mouseover');

    cy.get('#nav-flyout-icp')
      .should('to.be.visible');

    cy.get('#nav-flyout-icp [href="#switch-lang=de_DE"]').click();

    cy.get('.icp-nav-language').invoke('text')
      .should('match', /DE/);
    cy.get('#nav-shop .nav-line-2').invoke('text')
      .should('match', /Kategorien/);
    cy.get('#nav-link-accountList .nav-line-1').invoke('text')
      .should('match', /Hallo! Anmelden/);
    cy.get('#nav-link-accountList .nav-line-2').invoke('text')
      .should('match', /Konto und Listen/);
    // amazon issue: with reproducibility 5/10 this row is empty
    // cy.get('#nav-orders .nav-line-1').invoke('text').should('match', /Rücksendungen/);
    cy.get('#nav-orders .nav-line-2').invoke('text')
      .should('match', /Bestellungen/);
    cy.get('#nav-cart .nav-line-2').invoke('text')
      .should('match', /Einkaufswagen/);
  });
});
