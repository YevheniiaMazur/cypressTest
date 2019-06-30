import { HomePo } from '../support/home.po';

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
