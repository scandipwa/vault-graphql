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

import PropTypes from 'prop-types';

import { isSignedIn } from 'Util/Auth';

import VaultStorage from '../component/VaultStorage';
import { BRAINTREE_CC_VAULT } from '../component/VaultStorage/VaultStorage.config';

/** @namespace VaultGraphql/Plugin/CheckoutPayments/propTypes */
export const propTypes = (props) => ({
    ...props,
    isInstancePurchaseActive: PropTypes.bool.isRequired
});

/** @namespace VaultGraphql/Plugin/CheckoutPayments/rendeerBraintreeVault */
export function renderBraintreeVault() {
    const { selectedPaymentCode } = this.props;

    return (
        <VaultStorage
          paymentMethodVaultCode={ selectedPaymentCode }
          isCheckout
        />
    );
}

/** @namespace VaultGraphql/Plugin/CheckoutPayments/paymentRenderMap */
export const paymentRenderMap = (originalMember, instance) => {
    const { isInstancePurchaseActive } = instance.props;

    if (!isSignedIn() || !isInstancePurchaseActive) {
        return originalMember;
    }

    return {
        ...originalMember,
        [BRAINTREE_CC_VAULT]: renderBraintreeVault.bind(instance)
    };
};

export default {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap
        },
        'static-member': {
            propTypes
        }
    }
};
