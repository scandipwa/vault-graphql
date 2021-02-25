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

import VaultStorage from '../component/VaultStorage';
import { VAULT_STORAGE } from '../component/VaultStorage/VaultStorage.config';

/** @namespace VaultGraphql/Plugin/MyAccount/renderMap */
export const renderMap = (originalMember) => ({
    ...originalMember,
    [VAULT_STORAGE]: VaultStorage
});

export default {
    'Route/MyAccount/Component': {
        'member-property': {
            renderMap
        }
    }
};
