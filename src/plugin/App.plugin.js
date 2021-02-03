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

import getStore from 'Store/index.js';

import { VaultReducer } from '../store/Vault/Vault.reducer';

export class AppPlugin {
    addVaultReducer = (args, callback, instance) => {
        getStore().injectReducer('VaultReducer', VaultReducer);

        return callback.apply(instance, args);
    };
}

const {
    addVaultReducer
} = new AppPlugin();

const config = {
    'Component/App/Component': {
        'member-function': {
            renderRedux: addVaultReducer
        }
    }
};

export default config;
