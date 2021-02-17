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
import { PureComponent } from 'react';

import Loader from 'Component/Loader';
import { DeviceType } from 'Type/Device';

import VaultStorageItem from '../VaultStorageItem';

import './VaultStorage.style';

/** @namespace VaultGraphQl/Component/VaultStorage/Component */
export class VaultStorage extends PureComponent {
    static propTypes = {
        paymentMethods: PropTypes.array,
        isLoading: PropTypes.bool,
        selectedStoredPaymentMethod: PropTypes.string,
        device: DeviceType.isRequired,
        isCheckout: PropTypes.bool
    };

    static defaultProps = {
        isLoading: true,
        isCheckout: false,
        selectedStoredPaymentMethod: null,
        paymentMethods: []
    };

    renderVaultHeadingRow() {
        return (
            <tr>
                <th>{ __('Card Number') }</th>
                <th>{ __('Expiration Date') }</th>
                <th>{ __('Type') }</th>
                <th>{ __('Actions') }</th>
            </tr>
        );
    }

    renderVaultCard = (paymentMethod) => {
        const {
            isCheckout,
            selectedStoredPaymentMethod,
        } = this.props;
        const {
            public_hash,
            details: {
                type,
                maskedCC,
                expirationDate
            }
        } = paymentMethod;

        const isSelected = selectedStoredPaymentMethod === public_hash;

        return (
            <VaultStorageItem
              key={ `${ expirationDate }-${ type }-${ maskedCC }` }
              isCheckout={ isCheckout }
              isSelected={ isSelected }
              selectedStoredPaymentMethod={ selectedStoredPaymentMethod }
              paymentMethod={ paymentMethod }
            />
        );
    };

    renderVaultRows() {
        const { paymentMethods } = this.props;

        if (!paymentMethods || paymentMethods.length === 0) {
            return this.renderEmptyVault();
        }

        return paymentMethods.reduceRight(
            (acc, e) => [...acc, this.renderVaultCard(e)],
            []
        );
    }

    renderEmptyVault() {
        const { isCheckout } = this.props;

        if (isCheckout) {
            return this.renderEmptyVaultCheckout();
        }

        return (
            <tr block="VaultStorage" elem="EmptyVault">
                <td colSpan="4">{ __('You have no stored payment methods.') }</td>
            </tr>
        );
    }

    renderEmptyVaultCheckout() {
        return (
            <div block="VaultStorage" elem="EmptyVault">
               { __('You have no stored payment methods.') }
            </div>
        );
    }

    renderTableMobile() {
        return (
            <table block="VaultStorage" elem="Table">
                { this.renderVaultRows() }
            </table>
        );
    }

    renderTable() {
        const { device } = this.props;

        if (device.isMobile) {
            return this.renderTableMobile();
        }

        return (
            <table block="VaultStorage" elem="Table">
                <thead>
                    { this.renderVaultHeadingRow() }
                </thead>
                <tbody>
                    { this.renderVaultRows() }
                </tbody>
            </table>
        );
    }

    renderContent() {
        const { isCheckout, isLoading } = this.props;

        if (isLoading) {
            return null;
        }

        if (!isCheckout) {
            return this.renderTable();
        }

        return (
            <ul
              block="VaultStorage"
              elem="List"
            >
                { this.renderVaultRows() }
            </ul>
        );
    }

    render() {
        const { isLoading } = this.props;
        return (
            <>
                <Loader isLoading={ isLoading } />
                <div block="VaultStorage">
                    { this.renderContent() }
                </div>
            </>
        );
    }
}

export default VaultStorage;
