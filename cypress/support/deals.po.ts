import { BaseComponent } from './base.component';

export class DealsPo extends BaseComponent {
  pageUrl = 'todaysdeals';
  pageTitle = 'h1';
  sortDropdown = '.a-dropdown-prompt';
  dealOfTheDayFilter = '[data-value="DEAL_OF_THE_DAY"]';
  productCard = '.dealTile';
  dealOfDayLabel = '.dotdBadge';

  isAllProdLabelled(productsSel: string, labelSel: string) {
    cy.get(productsSel)
      .each($productTile => cy.wrap($productTile)
        .should('to.have.descendants', labelSel));
  }
}
