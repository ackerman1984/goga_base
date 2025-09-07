"use client";

import {
  useMiniKit,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Home } from "./components/DemoComponents";
import { Features } from "./components/DemoComponents";
import { DropdownMenu } from "./components/DemoComponents";
import { PremiumPlans } from "./components/DemoComponents";
import { Profile } from "./components/DemoComponents";
import { Courses } from "./components/DemoComponents";
import { SmartContract } from "./components/DemoComponents";
import { PlanPurchase } from "./components/PlanPurchase";
import { TeacherDashboard } from "./components/TeacherDashboard";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState("home");
  const [userRole, setUserRole] = useState<"student" | "teacher">("student");

  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);


  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-6 h-16">
          <div className="flex items-center space-x-3">
            {activeTab !== "home" && (
              <button
                onClick={() => setActiveTab("home")}
                className="p-2 hover:bg-[var(--app-accent-light)] rounded-lg transition-colors"
                aria-label="Volver al inicio"
              >
                <Icon name="arrow-left" size="md" className="text-[var(--app-foreground)]" />
              </button>
            )}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center relative logo-bounce smooth-transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/goga-logo.jpg" 
                alt="GOGA Logo" 
                className="w-10 h-10 object-contain rounded-lg mascot-no-bg"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--app-foreground)]">
                {activeTab === "home" ? "GOGA Español" :
                 activeTab === "profile" ? "Mi Perfil" :
                 activeTab === "courses" ? "Cursos" :
                 activeTab === "plans" ? "Planes Premium" :
                 activeTab === "features" ? "Funciones" :
                 activeTab === "contract" ? "Smart Contract" :
                 activeTab === "purchase" ? "Comprar Plan" :
                 activeTab === "teacher" ? "Panel de Profesor" :
                 "GOGA Español"}
              </h1>
              <p className="text-sm text-[var(--app-foreground-muted)]">
                {activeTab === "home" ? (userRole === "teacher" ? "Modo Profesor - Gestiona estudiantes" : "Speak to Learn") :
                 activeTab === "profile" ? "Información personal y progreso" :
                 activeTab === "courses" ? "Situaciones de la vida real" :
                 activeTab === "plans" ? "Clases en vivo con profesores" :
                 activeTab === "features" ? "Características de la app" :
                 activeTab === "contract" ? "Información del contrato desplegado" :
                 activeTab === "purchase" ? "Paga con ETH usando smart contracts" :
                 activeTab === "teacher" ? "Gestiona estudiantes y comunicación" :
                 "Speak to Learn"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Role Toggle Button */}
            <button
              onClick={() => setUserRole(userRole === "student" ? "teacher" : "student")}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                userRole === "teacher" 
                  ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                  : "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              }`}
            >
              <Icon name={userRole === "teacher" ? "academic-cap" : "user"} size="sm" />
              <span>{userRole === "teacher" ? "Profesor" : "Alumno"}</span>
            </button>
            
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 dark:text-green-400">Base Sepolia</span>
            </div>
            <Wallet className="z-10">
              <ConnectWallet className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Connect Wallet
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            <DropdownMenu setActiveTab={setActiveTab} />
          </div>
        </header>

        <main className="flex-1 smooth-transition">
          {activeTab === "home" && userRole === "student" && <div key="home" className="animate-fade-in-up"><Home setActiveTab={setActiveTab} /></div>}
          {activeTab === "home" && userRole === "teacher" && <div key="teacher-home" className="animate-fade-in-up"><TeacherDashboard setActiveTab={setActiveTab} /></div>}
          {activeTab === "features" && <div key="features" className="animate-fade-in-up"><Features setActiveTab={setActiveTab} /></div>}
          {activeTab === "plans" && <div key="plans" className="animate-fade-in-up"><PremiumPlans setActiveTab={setActiveTab} /></div>}
          {activeTab === "profile" && <div key="profile" className="animate-fade-in-up"><Profile setActiveTab={setActiveTab} /></div>}
          {activeTab === "courses" && <div key="courses" className="animate-fade-in-up"><Courses setActiveTab={setActiveTab} /></div>}
          {activeTab === "contract" && <div key="contract" className="animate-fade-in-up"><SmartContract setActiveTab={setActiveTab} /></div>}
          {activeTab === "purchase" && <div key="purchase" className="animate-fade-in-up"><PlanPurchase setActiveTab={setActiveTab} /></div>}
          {activeTab === "teacher" && <div key="teacher" className="animate-fade-in-up"><TeacherDashboard setActiveTab={setActiveTab} /></div>}
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
