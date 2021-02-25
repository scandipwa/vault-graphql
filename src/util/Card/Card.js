/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/vault-graphql
 * @link https://github.com/scandipwa/vault-graphql
 */

/* eslint-disable import/prefer-default-export */
import NONE from '../../../view/base/web/images/cc/NONE.png';
import { CARD_ICON_MAP } from './Card.config';

/** @namespace VaultGraphQl/util/Card/searchIcon */
export const searchIcon = (type) => CARD_ICON_MAP.find(((card) => card.type === type));

/** @namespace VaultGraphQl/util/Card/getCardIconByType */
export const getCardIconByType = (type) => {
    const result = searchIcon(type);

    if (!result) {
        return NONE;
    }

    const { src } = result;

    return src;
};

