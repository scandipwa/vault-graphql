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

/** @namespace VaultGraphql/Plugin/CheckoutBillingContainer/mapStateToProps */
export const mapStateToProps = (args, callback) => {
    const [
        {
            VaultReducer: {
                public_hash: selectedStoredPaymentMethod
            }
        }
    ] = args;

    return {
        ...callback(...args),
        selectedStoredPaymentMethod
    };
};

/** @namespace VaultGraphql/Plugin/CheckoutBillingContainer/getPaymentData */
export const _getPaymentData = (args, callback, instance) => {
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
};

export default {
    'Component/CheckoutBilling/Container': {
        'member-function': {
            _getPaymentData
        }
    },
    'Component/CheckoutBilling/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
