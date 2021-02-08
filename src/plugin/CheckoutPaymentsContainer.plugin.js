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

/** @namespace VaultGraphql/Plugin/CheckoutPaymentsContainer/mapStateToProps */
export const mapStateToProps = (args, callback) => {
    const [
        {
            ConfigReducer: {
                instance_purchase_active: isInstancePurchaseActive
            }
        }
    ] = args;

    return {
        ...callback(...args),
        isInstancePurchaseActive
    };
};

export default {
    'Component/CheckoutPayments/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
