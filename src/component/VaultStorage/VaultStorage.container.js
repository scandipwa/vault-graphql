/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import VaultStorage from './VaultStorage.component';

export const VaultDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    '../../store/Vault/Vault.dispatcher'
);

/** @namespace VaultGraphQl/Component/VaultStorage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    storedPaymentMethods: state.VaultReducer.storedPaymentMethods,
    selectedStoredPaymentMethod: state.VaultReducer.public_hash,
    isLoading: state.VaultReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace VaultGraphQl/Component/VaultStorage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    getStoredPaymentMethods: () => {
        VaultDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch)
        );
    }
});

/** @namespace VaultGraphQl/Component/VaultStorage/Container */
export class VaultStorageContainer extends PureComponent {
    static propTypes = {
        selectedStoredPaymentMethod: PropTypes.string,
        storedPaymentMethods: PropTypes.object.isRequired,
        getStoredPaymentMethods: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        paymentMethodVaultCode: PropTypes.string
    };

    static defaultProps = {
        selectedStoredPaymentMethod: null,
        paymentMethodVaultCode: null,
        isLoading: true
    };

    componentDidMount() {
        const { getStoredPaymentMethods } = this.props;
        getStoredPaymentMethods();
    }

    containerProps = () => ({
        paymentMethods: this.handleFilterStoredPaymentMethods()
    });

    handleFilterStoredPaymentMethods() {
        const {
            isLoading,
            paymentMethodVaultCode,
            storedPaymentMethods: { items }
        } = this.props;

        if (isLoading) {
            return null;
        }

        if (!paymentMethodVaultCode) {
            return items;
        }

        // Split payment code because from selected payment we are getting code with vault postfix
        const selectedPaymentCode = 'braintree_cc_vault'.split('_')[0];

        const filteredPaymentMethods = items.filter((value) => {
            const { payment_method_code } = value;

            if (payment_method_code === selectedPaymentCode) {
                return value;
            }

            return null;
        });

        return filteredPaymentMethods;
    }

    render() {
        return (
            <VaultStorage
              { ...this.props }
              { ...this.state }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaultStorageContainer);
