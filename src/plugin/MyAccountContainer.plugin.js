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

export class MyAccountContainerPlugin {
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

    aroundPropTypes = (props) => ({
        ...props,
        isInstancePurchaseActive: PropTypes.bool.isRequired
    });

    updateTabMap = (originalMember, instance) => {
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
}

const {
    aroundMapStateToProps,
    aroundPropTypes,
    updateTabMap
} = new MyAccountContainerPlugin();

export const config = {
    'Route/MyAccount/Container': {
        'member-property': {
            tabMap: updateTabMap
        },
        'static-member': {
            propTypes: aroundPropTypes
        }
    },
    'Route/MyAccount/Container/mapStateToProps': {
        function: aroundMapStateToProps
    }
};

export default config;
