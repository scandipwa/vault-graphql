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
export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING ';
export const UPDATE_SELECTED_PAYMENT_METHOD = 'UPDATE_SELECTED_PAYMENT_METHOD';
export const UPDATE_STORED_PAYMENT_METHODS = 'UPDATE_STORED_PAYMENT_METHODS';

/** @namespace VaultGraphQl/Store/Vault/Action/updateStoredPaymentMethods */
export const updateStoredPaymentMethods = (storedPaymentMethods) => ({
    type: UPDATE_STORED_PAYMENT_METHODS,
    storedPaymentMethods
});

/** @namespace VaultGraphQl/Store/Vault/Action/updateVaultIsLoading */
export const updateVaultIsLoading = (isLoading) => ({
    type: UPDATE_IS_LOADING,
    isLoading
});

/** @namespace VaultGraphQl/Store/Vault/Action/updateVaultIsLoading */
export const updateSelectedPublicHash = (public_hash) => ({
    type: UPDATE_SELECTED_PAYMENT_METHOD,
    public_hash
});
