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

/** @namespace VaultGraphql/Plugin/ConfigQuery/getStoreConfigFields */
export const _getStoreConfigFields = (args, callback) => [
    ...callback(...args),
    'instance_purchase_active'
];

export default {
    'Query/Config': {
        'member-function': {
            _getStoreConfigFields
        }
    }
};
