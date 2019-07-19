// "1. When user opens the page https://www.amazon.com/
// 2. And clicks the ""Gift Cards"" button in the header section
// 3. Then user redirected to page with route /gift-cards/ and able to chose any Gift Card
// 4. When user click on eGift Card
// 5. Then user redirected to page with product route
// 6. When user set 100$ as gift amount
// 7. Then this item become selected and price changed to 100$
// 8. When the user choose "Share via messaging" delivery
// 9. And user clicks on ""Add to cart"" button
// 10. Then Gift card added and user see ""Added to Cart"" message"

import {HomePo} from "../support/home.po";
import {GiftCardsPo} from "../support/giftCards.po";

describe('Buying the Gift Card test suite', () => {
    const homePage = new HomePo();
    const giftCardsPage = new GiftCardsPo();
    const cardToBuyName = 'eGift Card';
    const cardPrice = '100';
    const succesMessage = 'Added to Cart';
    const deviceToTest = 'macbook-13';

    beforeEach(() => cy.visit(homePage.pageUrl));

    it('Buying Gift card without entering e-mail', () => {
        homePage.clickOnElem(homePage.mainNavElem.giftCards);
        giftCardsPage.isCurrentUrlInclude(giftCardsPage.pageUrl);

        giftCardsPage.clickOnElem(giftCardsPage.eGiftCardTile);
        giftCardsPage.isElemContainText(giftCardsPage.cardTitle, cardToBuyName);

        cy.viewport(deviceToTest);

        giftCardsPage.clickOnElem(giftCardsPage.giftEmount100);
        giftCardsPage.isPriceSelected(giftCardsPage.giftEmount100);
        giftCardsPage.isElemContainText(giftCardsPage.cartTotalPrice, cardPrice);

        giftCardsPage.clickOnElem(giftCardsPage.deliverViaMessageOpt);
        giftCardsPage.clickOnElem(giftCardsPage.buyNowButton);
        giftCardsPage.isElemContainText(giftCardsPage.addedToCartMessage, succesMessage);

        giftCardsPage.clickOnElem(homePage.mainNavElem.cart);
        giftCardsPage.isElemContainText(giftCardsPage.productTitleInCart, cardToBuyName)
    });
});