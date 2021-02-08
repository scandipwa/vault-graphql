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

import { VAULT_STORAGE } from '../component/VaultStorage/VaultStorage.config';

/** @namespace VaultGraphql/Plugin/MyAccountContainer/mapStateToProps */
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

/** @namespace VaultGraphql/Plugin/MyAccountContainer/propTypes */
export const propTypes = (props) => ({
    ...props,
    isInstancePurchaseActive: PropTypes.bool.isRequired
});

/** @namespace VaultGraphql/Plugin/MyAccountContainer/tabMap */
export const tabMap = (originalMember, instance) => {
    const { isInstancePurchaseActive } = instance.props;

    if (!isInstancePurchaseActive) {
        return originalMember;
    }

    return {
        ...originalMember,
        [VAULT_STORAGE]: {
            url: '/vault-storage',
            name: __('Stored Payment Methods')
        }
    };
};

export default {
    'Route/MyAccount/Container': {
        'member-property': {
            tabMap
        },
        'static-member': {
            propTypes
        }
    },
    'Route/MyAccount/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
