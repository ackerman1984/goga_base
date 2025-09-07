"use client";

import { useAccount } from "wagmi";
import { useState, useMemo, useCallback } from "react";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionError,
  TransactionResponse,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionStatus,
} from "@coinbase/onchainkit/transaction";
import { useNotification } from "@coinbase/onchainkit/minikit";
import { Button, Card, Icon } from "./DemoComponents";
import { ConnectWallet, Wallet } from "@coinbase/onchainkit/wallet";

type PlanPurchaseProps = {
  setActiveTab: (tab: string) => void;
  selectedPlan?: string;
};

export function PlanPurchase({ setActiveTab, selectedPlan }: PlanPurchaseProps) {
  const { address } = useAccount();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(selectedPlan || 'standard');

  const sendNotification = useNotification();
  const CONTRACT_ADDRESS = "0x3586Fe06206C1bea0BFb8D34cDf499f0d6173E7F";

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      classes: 6,
      price: 0.001,
      priceUsd: 2.5,
      popular: false,
      features: [
        '6 clases en vivo al mes',
        '40 minutos por clase',
        'Horarios flexibles',
        'Profesores nativos certificados',
        'Práctica conversacional',
        'Soporte por chat'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      classes: 12,
      price: 0.002,
      priceUsd: 5,
      popular: true,
      features: [
        '12 clases en vivo al mes',
        '40 minutos por clase',
        'Horarios flexibles',
        'Profesores nativos certificados',
        'Práctica conversacional avanzada',
        'Material didáctico exclusivo',
        'Evaluaciones personalizadas',
        'Soporte prioritario'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      classes: 18,
      price: 0.003,
      priceUsd: 7.5,
      popular: false,
      features: [
        '18 clases en vivo al mes',
        '40 minutos por clase',
        'Horarios flexibles',
        'Profesores nativos certificados',
        'Práctica conversacional intensiva',
        'Material didáctico exclusivo',
        'Evaluaciones personalizadas',
        'Sesiones de gramática especializada',
        'Acceso a grabaciones de clases',
        'Soporte 24/7'
      ]
    }
  ];

  const selectedPlanDetails = plans.find(plan => plan.id === selectedPlanId) || plans[1];

  const calls = useMemo(() => 
    address ? [
        {
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: "0x" as `0x${string}`,
          value: BigInt(Math.floor(selectedPlanDetails.price * 10**18)), // Convert ETH to Wei
        },
      ]
    : [], [address, selectedPlanDetails.price]);

  const handleSuccess = useCallback(async (response: TransactionResponse) => {
    const transactionHash = response.transactionReceipts[0].transactionHash;

    console.log(`Plan purchase successful: ${transactionHash}`);

    await sendNotification({
      title: "¡Plan Adquirido Exitosamente!",
      body: `Has adquirido el plan ${selectedPlanDetails.name}. Hash: ${transactionHash}`,
    });

    setIsProcessing(false);
  }, [sendNotification, selectedPlanDetails.name]);

  const handleError = useCallback((error: TransactionError) => {
    console.error("Transaction failed:", error);
    setIsProcessing(false);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8 relative">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="mascot-float mascot-hover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/mascots/mascot-chef.jpg" 
              alt="GOGA Chef Mascot" 
              className="w-20 h-20 object-contain animate-wiggle mascot-no-bg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">Comprar Plan Premium</h1>
            <p className="text-[var(--app-foreground-muted)]">
              Selecciona tu plan ideal y paga con ETH
            </p>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold text-[var(--app-foreground)]">Selecciona tu Plan</h2>
        <div className="grid grid-cols-1 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`clean-card rounded-xl p-4 cursor-pointer smooth-transition ${
                selectedPlanId === plan.id 
                  ? 'ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                  : 'hover:ring-1 hover:ring-blue-300'
              } ${plan.popular ? 'border-orange-300' : ''}`}
              onClick={() => setSelectedPlanId(plan.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlanId === plan.id 
                      ? 'bg-orange-500 border-orange-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedPlanId === plan.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-[var(--app-foreground)]">{plan.name}</h3>
                      {plan.popular && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                          Más Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--app-foreground-muted)]">{plan.classes} clases/mes</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[var(--app-foreground)]">{plan.price} ETH</div>
                  <div className="text-sm text-[var(--app-foreground-muted)]">~${plan.priceUsd} USD</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Summary */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">Resumen de Compra</h3>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Plan {selectedPlanDetails.name}</span>
              <span className="font-bold">{selectedPlanDetails.price} ETH</span>
            </div>
            <div className="text-sm opacity-90">
              {selectedPlanDetails.classes} clases mensuales • Válido por 30 días
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--app-foreground-muted)]">Subtotal:</span>
              <span className="text-[var(--app-foreground)]">{selectedPlanDetails.price} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--app-foreground-muted)]">Fees de red:</span>
              <span className="text-[var(--app-foreground)]">~0.0001 ETH</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span className="text-[var(--app-foreground)]">Total:</span>
              <span className="text-[var(--app-foreground)]">{selectedPlanDetails.price} ETH</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">Método de Pago</h3>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">Ξ</span>
            </div>
            <div>
              <div className="font-medium text-[var(--app-foreground)]">Ethereum (ETH)</div>
              <div className="text-sm text-[var(--app-foreground-muted)]">Pago directo con tu wallet</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-[var(--app-foreground-muted)]">
              Smart Contract: <span className="font-mono text-xs">{CONTRACT_ADDRESS}</span>
            </div>
            
            {address ? (
              <Transaction
                calls={calls}
                onSuccess={handleSuccess}
                onError={handleError}
              >
                <TransactionButton 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 rounded-lg smooth-transition"
                  disabled={isProcessing}
                  text={isProcessing ? "Procesando..." : `Comprar Plan ${selectedPlanDetails.name}`}
                />
                <TransactionStatus>
                  <TransactionStatusAction />
                  <TransactionStatusLabel />
                </TransactionStatus>
                <TransactionToast className="mb-4">
                  <TransactionToastIcon />
                  <TransactionToastLabel />
                  <TransactionToastAction />
                </TransactionToast>
              </Transaction>
            ) : (
              <div className="text-center py-6">
                <Icon name="user" className="mx-auto mb-2 text-[var(--app-foreground-muted)]" size="lg" />
                <p className="text-[var(--app-foreground-muted)] mb-4">
                  Conecta tu wallet para comprar el plan
                </p>
                <Wallet>
                  <ConnectWallet className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-medium">
                    Conectar Wallet
                  </ConnectWallet>
                </Wallet>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Back button */}
      <div className="flex justify-center pt-4">
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab('plans')}
          icon={<Icon name="arrow-left" size="sm" />}
        >
          Volver a Planes
        </Button>
      </div>
    </div>
  );
}