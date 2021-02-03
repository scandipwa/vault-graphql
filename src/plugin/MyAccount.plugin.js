/* eslint-disable arrow-body-style */
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

import VaultStorage from '../component/VaultStorage';
import { VAULT_STORAGE } from '../component/VaultStorage/VaultStorage.config';

export class MyAccountPlugin {
    updateRenderMap = (originalMember) => {
        return {
            ...originalMember,
            [VAULT_STORAGE]: VaultStorage
        };
    };
}

const {
    updateRenderMap
} = new MyAccountPlugin();

export const config = {
    'Route/MyAccount/Component': {
        'member-property': {
            renderMap: updateRenderMap
        }
    }
};

export default config;
