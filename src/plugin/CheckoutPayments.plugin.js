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

export class CheckoutPaymentsPlugin {
    aroundPropTypes = (props) => ({
        ...props,
        isInstancePurchaseActive: PropTypes.bool.isRequired
    });

    renderBrainTreeVault() {
        const { selectedPaymentCode } = this.props;

        return (
            <VaultStorage
              paymentMethodVaultCode={ selectedPaymentCode }
              isCheckout
            />
        );
    }

    addVaultPayments = (originalMember, instance) => {
        const { isInstancePurchaseActive } = instance.props;

        if (!isSignedIn() || !isInstancePurchaseActive) {
            return originalMember;
        }

        return {
            ...originalMember,
            [BRAINTREE_CC_VAULT]: this.renderBrainTreeVault.bind(instance)
        };
    };
}

const {
    addVaultPayments,
    aroundPropTypes
} = new CheckoutPaymentsPlugin();

export const config = {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap: addVaultPayments
        },
        'static-member': {
            propTypes: aroundPropTypes
        }
    }
};

export default config;
