import { HomePo } from '../support/home.po';
import { SearchDetailsPo } from '../support/searchDetails.po';
import { DealsPo } from '../support/deals.po';
import { ProductDetailsPo } from '../support/productDetails.po';

describe('Product filtering and adding to the wishlist', () => {
  const homePage = new HomePo();

  beforeEach(() => cy.visit(homePage.pageUrl));

  it('Product filtering by category check', () => {
    const searchDetailsPage = new SearchDetailsPo();
    const notEmptyResultsRegex = /1-\d+ of \d+ results for/;
    const defaultSortOption = 'featured-rank';
    const departmentName = 'Computers';
    const productForSearch = 'mouse';

    homePage.clickOnElem(homePage.shopByCategoryLink);
    homePage.clickOnElem(homePage.computerDepLink);

    searchDetailsPage.isElemContainText(searchDetailsPage.departmentTitle, departmentName);
    searchDetailsPage.isElemTextMatch(searchDetailsPage.resultsCounter, notEmptyResultsRegex);
    searchDetailsPage.isElemHaveValue(searchDetailsPage.sortDropdown, defaultSortOption);

    searchDetailsPage.typeIntoInput(searchDetailsPage.searchInput, productForSearch);
    searchDetailsPage.clickOnElem(searchDetailsPage.searchIcon);

    searchDetailsPage.isElemContainText(searchDetailsPage.afterSearchBreadcumb, departmentName);
    searchDetailsPage.isElemContainText(searchDetailsPage.afterSearchBreadcumb, productForSearch);
    searchDetailsPage.isElemTextMatch(searchDetailsPage.afterSearchResCounter, notEmptyResultsRegex);
  });

  it('Product filtering by Deal type check', () => {
    const dealsPage = new DealsPo();
    const defaulSortOption = 'Relevance';
    const dealsTitleText = 'Deals';

    homePage.clickOnElemWithText(homePage.headerNavLinks, homePage.dealLinkText);

    dealsPage.isElemContainText(dealsPage.pageTitle, dealsTitleText);
    dealsPage.isElemContainText(dealsPage.sortDropdown, defaulSortOption);

    dealsPage.clickOnElem(dealsPage.dealOfTheDayFilter);

    dealsPage.isAllProdLabelled(dealsPage.productCard, dealsPage.dealOfDayLabel);
  });

  it('Product add to wishlist functionality check', () => {
    const searchDetailsPage = new SearchDetailsPo();
    const productDetailsPage = new ProductDetailsPo();
    const productToSearch = 'headphones';
    const notEmptyResultsRegex = /1-\d+ /;
    const signInUrl = 'https://www.amazon.com/ap/signin';

    homePage.typeIntoInput(homePage.searchInput, productToSearch);
    homePage.clickOnElem(homePage.searchIcon);

    searchDetailsPage.isElemTextMatch(searchDetailsPage.afterSearchResCounter, notEmptyResultsRegex);

    searchDetailsPage.clickOnElem(searchDetailsPage.searchResNames);
    productDetailsPage.clickOnElem(productDetailsPage.addToWishlistButton);

    productDetailsPage.isCurrentUrlInclude(signInUrl);
  });
});


