import {BaseComponent} from "./base.component";

export class GiftCardsPo extends BaseComponent {
    pageUrl = 'gift-cards';

    eGiftCardTile = '[alt="eGift"]';
    cardTitle = '#gc-asin-title';
    giftEmount100 = '#a-autoid-23';
    cartTotalPrice = '#gc-buy-box-text .a-color-price';
    deliverViaMessageOpt = '#gc-delivery-mechanism-button-Shareable-announce';
    buyNowButton = '#gc-buy-box-atc';
    addedToCartMessage = '#huc-v2-order-row-confirm-text';
    productTitleInCart = '.sc-product-title';

    isPriceSelected(priceSelector: string) {
        cy.get(priceSelector).should('to.have.class', 'a-button-selected');
    }
}