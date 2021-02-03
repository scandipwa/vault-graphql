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

import { BRAINTREE_CC_VAULT } from '../component/VaultStorage/VaultStorage.config';

export class CheckoutBillingContainerPlugin {
    aroundMapStateToProps = (args, callback) => {
        const {
            0: {
                VaultReducer: {
                    public_hash: selectedStoredPaymentMethod
                }
            }
        } = args;

        return {
            ...callback(...args),
            selectedStoredPaymentMethod
        };
    };

    aroundGetPaymentData(args, callback, instance) {
        const { selectedStoredPaymentMethod } = instance.props;
        const { paymentMethod: code } = instance.state;

        // Add new case for 3-party vault payment methods
        switch (code) {
        case BRAINTREE_CC_VAULT:

            return {
                code,
                additional_data: {
                    public_hash: selectedStoredPaymentMethod
                }
            };
        default:
            return callback(...args);
        }
    }
}

const {
    aroundGetPaymentData,
    aroundMapStateToProps
} = new CheckoutBillingContainerPlugin();

export const config = {
    'Component/CheckoutBilling/Container': {
        'member-function': {
            _getPaymentData: aroundGetPaymentData
        }
    },
    'Component/CheckoutBilling/Container/mapStateToProps': {
        function: aroundMapStateToProps
    }
};

export default config;
