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

import { VaultDispatcher } from '../../store/Vault/Vault.dispatcher';
import VaultStorageItem from './VaultStorageItem.component';

/** @namespace VaultGraphQl/Component/VaultStorageItem/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace VaultGraphQl/Component/VaultStorageItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    deletePaymentMethod: (options) => VaultDispatcher.deletePaymentMethod(dispatch, options),
    onSelectPaymentMethod: (options) => VaultDispatcher.onSelectPaymentMethod(dispatch, options)
});

/** @namespace VaultGraphQl/Component/VaultStorageItem/Container */
export class VaultStorageItemContainer extends PureComponent {
    static propTypes = {
        deletePaymentMethod: PropTypes.func.isRequired,
        handleCardOnSelect: PropTypes.func,
        onSelectPaymentMethod: PropTypes.func.isRequired,
        paymentMethod: PropTypes.object.isRequired
    };

    containerFunctions = {
        handleDeleteStoredPaymentMethod: this.handleDeleteStoredPaymentMethod.bind(this),
        handleOnClick: this.handleOnClick.bind(this)
    };

    handleDeleteStoredPaymentMethod() {
        const { paymentMethod: { public_hash }, deletePaymentMethod } = this.props;

        deletePaymentMethod({ public_hash });
    }

    handleOnClick() {
        const { onSelectPaymentMethod, paymentMethod: { public_hash } } = this.props;

        onSelectPaymentMethod(public_hash);
    }

    render() {
        return (
            <VaultStorageItem
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaultStorageItemContainer);
