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

export class CheckoutPaymentsContainerPlugin {
    aroundMapStateToProps = (args, callback) => {
        const {
            0: {
                ConfigReducer: {
                    instance_purchase_active: isInstancePurchaseActive
                }
            }
        } = args;

        return {
            ...callback(...args),
            isInstancePurchaseActive
        };
    };
}

const {
    aroundMapStateToProps
} = new CheckoutPaymentsContainerPlugin();


export const config = {
    'Component/CheckoutPayments/Container/mapStateToProps': {
        function: aroundMapStateToProps
    }
};

export default config;

