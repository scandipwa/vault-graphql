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

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Exception\GraphQlNoSuchEntityException;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;
use Magento\Vault\Api\PaymentTokenManagementInterface;
use Magento\Vault\Api\PaymentTokenRepositoryInterface;

/**
 * Delete Payment Token resolver, used for GraphQL mutation processing.
 */
class DeletePaymentToken implements ResolverInterface
{
    /**
     * @var PaymentTokenManagementInterface
     */
    private $paymentTokenManagement;

    /**
     * @var PaymentTokenRepositoryInterface
     */
    private $paymentTokenRepository;

    /**
     * @param PaymentTokenManagementInterface $paymentTokenManagement
     * @param PaymentTokenRepositoryInterface $paymentTokenRepository
     */
    public function __construct(
        PaymentTokenManagementInterface $paymentTokenManagement,
        PaymentTokenRepositoryInterface $paymentTokenRepository
    ) {
        $this->paymentTokenManagement = $paymentTokenManagement;
        $this->paymentTokenRepository = $paymentTokenRepository;
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

        $args['public_hash'] = $args['public_hash'] ?? '';
        $token = $this->paymentTokenManagement->getByPublicHash($args['public_hash'], $context->getUserId());
        if (!$token) {
            throw new GraphQlNoSuchEntityException(
                __('Could not find a token using public hash: %1', $args['public_hash'])
            );
        }

        return ['result' => $this->paymentTokenRepository->delete($token)];
    }
}
