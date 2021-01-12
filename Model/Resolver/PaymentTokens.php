<?php
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/quote-graphql
 * @link    https://github.com/scandipwa/quote-graphql
 */

declare(strict_types=1);

namespace ScandiPWA\VaultGraphQl\Model\Resolver;

use Magento\Framework\Serialize\Serializer\Json;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;
use Magento\Vault\Model\PaymentTokenManagement;

/**
 * Customers Payment Tokens resolver, used for GraphQL request processing.
 */
class PaymentTokens implements ResolverInterface
{
    /**
     * @var PaymentTokenManagement
     */
    private $paymentTokenManagement;

    /**
     * $var Json
     */
    protected $json;

    /**
     * @param PaymentTokenManagement $paymentTokenManagement
     */
    public function __construct(
        PaymentTokenManagement $paymentTokenManagement,
        Json $json
    ) {
        $this->paymentTokenManagement = $paymentTokenManagement;
        $this->json = $json;
    }

    /**
     * @inheritdoc
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        /** @var ContextInterface $context */
        if (false === $context->getExtensionAttributes()->getIsCustomer()) {
            throw new GraphQlAuthorizationException(__('The current customer isn\'t authorized.'));
        }

        $tokens = $this->paymentTokenManagement->getVisibleAvailableTokens($context->getUserId());
        $result = [];

        foreach ($tokens as $token) {
            //Parse JSON to get array instead of string
            $details = $this->json->unserialize($token->getTokenDetails());

            $result[] = [
                'public_hash' => $token->getPublicHash(),
                'payment_method_code' => $token->getPaymentMethodCode(),
                'type' => $token->getType(),
                'details' => [
                    'type' => $details['type'],
                    'maskedCC' => $details['maskedCC'],
                    'expirationDate' => $details['expirationDate']
                ]
            ];
        }
        return ['items' => $result];
    }
}
