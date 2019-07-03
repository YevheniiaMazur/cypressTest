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

describe('Localization test suite', () => {
  const homePage = new HomePo();
  let localeTempl: string;

  beforeEach(() => cy.visit(homePage.pageUrl));

  it('By default EN localization is used', () => {
    localeTempl = 'EN';

    homePage.isElemContainText(homePage.langLabel, localeTempl);

    cy.fixture('en_locale').then((enLocale) => {
      homePage.isElemContainText(homePage.mainNavElem.department, enLocale.departments);
      homePage.isElemContainText(homePage.mainNavElem.greeting, enLocale.greetingText);
      homePage.isElemContainText(homePage.mainNavElem.account, enLocale.accountLists);
      // homePage.isElemContainText(homePage.mainNavElem.returns, enLocale.returns);
      homePage.isElemContainText(homePage.mainNavElem.orders, enLocale.orders);
      homePage.isElemContainText(homePage.mainNavElem.cart, enLocale.cart);
    });
  });

  it('ES localization check', () => {
    localeTempl = 'ES';

    const esLangItem = '#nav-flyout-icp [href="#switch-lang=es_US"]';

    homePage.hoverOnElem(homePage.langNavTool);

    homePage.isElemVisible(homePage.langDropdown);

    homePage.clickOnElem(esLangItem);

    homePage.isElemContainText(homePage.langLabel, localeTempl);

    cy.fixture('es_locale').then((esLocale) => {
      homePage.isElemContainText(homePage.mainNavElem.department, esLocale.departments);
      homePage.isElemContainText(homePage.mainNavElem.greeting, esLocale.greetingText);
      homePage.isElemContainText(homePage.mainNavElem.account, esLocale.accountLists);
      // homePage.isElemContainText(homePage.mainNavElem.returns, esLocale.returns);
      homePage.isElemContainText(homePage.mainNavElem.orders, esLocale.orders);
      homePage.isElemContainText(homePage.mainNavElem.cart, esLocale.cart);
    });
  });

  it('DE localization check', () => {
    localeTempl = 'DE';

    const deLangItem = '#nav-flyout-icp [href="#switch-lang=de_DE"]';

    homePage.hoverOnElem(homePage.langNavTool);

    homePage.isElemVisible(homePage.langDropdown);

    homePage.clickOnElem(deLangItem);

    homePage.isElemContainText(homePage.langLabel, localeTempl);

    cy.fixture('de_locale').then((deLocale) => {
      homePage.isElemContainText(homePage.mainNavElem.department, deLocale.departments);
      homePage.isElemContainText(homePage.mainNavElem.greeting, deLocale.greetingText);
      homePage.isElemContainText(homePage.mainNavElem.account, deLocale.accountLists);
      // homePage.isElemContainText(homePage.mainNavElem.returns, deLocale.returns);
      homePage.isElemContainText(homePage.mainNavElem.orders, deLocale.orders);
      homePage.isElemContainText(homePage.mainNavElem.cart, deLocale.cart);
    });
  });
});
