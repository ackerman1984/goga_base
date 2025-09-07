"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";
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

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium smooth-transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none hover:scale-105 active:scale-95";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  title,
  children,
  className = "",
  onClick,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type FeaturesProps = {
  setActiveTab: (tab: string) => void;
};

type PremiumPlansProps = {
  setActiveTab: (tab: string) => void;
};

export function PremiumPlans({ setActiveTab }: PremiumPlansProps) {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      classes: 6,
      price: 0.001,
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
            <h1 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">Planes Premium</h1>
            <p className="text-[var(--app-foreground-muted)]">
              Clases en vivo con profesores nativos certificados
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-6 border ${
              plan.popular 
                ? 'border-orange-500 ring-2 ring-orange-500/20 papel-picado-border' 
                : 'border-[var(--app-card-border)]'
            } relative overflow-hidden card-hover smooth-transition ${
              index === 0 ? 'cactus-decoration' : 
              index === 1 ? 'pinata-decoration' : 
              'mexican-pattern'
            }`}
          >
            <div className="relative z-10">
              {plan.popular && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-medium">
                  ¡Más Popular!
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[var(--app-foreground)] mb-1">{plan.name}</h3>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    {plan.classes} clases por mes
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--app-foreground)]">{plan.price} ETH</div>
                  <div className="text-sm text-[var(--app-foreground-muted)]">ETH/mes</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{plan.classes} Clases</div>
                    <div className="text-sm opacity-90">40 min c/u • Horarios flexibles</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Icon name="check" className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size="sm" />
                    <span className="text-sm text-[var(--app-foreground-muted)]">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                    : ''
                }`}
                onClick={() => {
                  setActiveTab('purchase');
                }}
              >
                Seleccionar Plan {plan.name}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Icon name="help" className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">¿Cómo funcionan las clases?</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Clases individuales de 40 minutos con profesores nativos</li>
              <li>• Reserva tus horarios con hasta 48h de anticipación</li>
              <li>• Cancela o reprograma hasta 2 horas antes</li>
              <li>• Acceso a material didáctico personalizado</li>
              <li>• Progreso sincronizado con tu perfil GOGA</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          variant="ghost" 
          onClick={() => {
            console.log('Contactar soporte');
          }}
        >
          ¿Necesitas ayuda?
        </Button>
      </div>
    </div>
  );
}

type ProfileProps = {
  setActiveTab: (tab: string) => void;
};

export function Profile({ setActiveTab }: ProfileProps) {
  const certificates = [
    {
      id: 1,
      level: "A1",
      title: "Certificado Básico de Español",
      description: "Dominio de vocabulario básico y estructuras simples",
      date: "15 de Marzo, 2024",
      status: "earned",
      color: "from-green-400 to-green-600"
    },
    {
      id: 2,
      level: "A2",
      title: "Certificado Elemental de Español",
      description: "Comunicación en situaciones familiares y cotidianas",
      date: "10 de Junio, 2024", 
      status: "earned",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      level: "B1",
      title: "Certificado Intermedio de Español",
      description: "Comprensión de textos complejos y expresión fluida",
      date: "Próximamente",
      status: "locked",
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 4,
      level: "B2",
      title: "Certificado Intermedio Superior",
      description: "Dominio avanzado del idioma en contextos profesionales",
      date: "Próximamente",
      status: "locked", 
      color: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header con foto de perfil */}
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-6 border border-[var(--app-card-border)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--app-foreground)]">María González</h1>
              <p className="text-[var(--app-foreground-muted)]">maria.gonzalez@email.com</p>
              <p className="text-sm text-orange-600 dark:text-orange-400">Level 3 • Intermediate</p>
            </div>
            <div className="mascot-float mascot-hover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/mascots/mascot-bunny.jpg" 
                alt="GOGA Bunny Mascot" 
                className="w-16 h-16 object-contain animate-wiggle mascot-no-bg"
              />
            </div>
          </div>
          <button className="p-2 hover:bg-[var(--app-accent-light)] rounded-lg transition-colors">
            <Icon name="edit" size="sm" className="text-[var(--app-foreground-muted)]" />
          </button>
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
              <Icon name="graduation-cap" size="md" className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-[var(--app-foreground)]">My course</span>
          </button>

          <button className="flex flex-col items-center p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-2">
              <Icon name="bar-chart" size="md" className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-[var(--app-foreground)]">Statistics</span>
          </button>

          <button className="flex flex-col items-center p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-2">
              <Icon name="users" size="md" className="text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-[var(--app-foreground)]">My teachers</span>
          </button>

          <button className="flex flex-col items-center p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
              <Icon name="message-circle" size="md" className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-[var(--app-foreground)]">Messages</span>
          </button>

          <button className="flex flex-col items-center p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
              <Icon name="calendar" size="md" className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-[var(--app-foreground)]">Meetings</span>
          </button>

          <button className="flex flex-col items-center p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-2">
              <Icon name="certificate" size="md" className="text-teal-600 dark:text-teal-400" />
            </div>
            <span className="text-sm font-medium text-[var(--app-foreground)]">Certificates</span>
          </button>
        </div>
      </div>

      {/* Certificados de Español */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--app-foreground)]">Certificados de Español</h2>
        
        {certificates.map((cert) => (
          <div 
            key={cert.id}
            className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-6 border border-[var(--app-card-border)] relative overflow-hidden card-hover smooth-transition ${
              cert.status === 'locked' ? 'opacity-60' : cert.status === 'earned' ? 'cactus-decoration' : ''
            }`}
          >
            <div className="mexican-pattern absolute inset-0 rounded-xl opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${cert.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold">{cert.level}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--app-foreground)]">{cert.title}</h3>
                      <p className="text-sm text-[var(--app-foreground-muted)]">{cert.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--app-foreground-muted)]">{cert.date}</span>
                    {cert.status === 'earned' && (
                      <div className="flex items-center space-x-2">
                        <Icon name="check" className="text-green-500" size="sm" />
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">Obtenido</span>
                      </div>
                    )}
                    {cert.status === 'locked' && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 font-medium">🔒 Bloqueado</span>
                      </div>
                    )}
                  </div>
                </div>
                {cert.status === 'earned' && (
                  <div className="ml-4">
                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Ver Certificado
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu adicional */}
      <div className="space-y-2">
        <button className="w-full flex items-center space-x-4 p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
          <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
            <Icon name="credit-card2" size="sm" className="text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-[var(--app-foreground)]">Cards</div>
          </div>
        </button>

        <button 
          className="w-full flex items-center space-x-4 p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors"
          onClick={() => setActiveTab('plans')}
        >
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
            <Icon name="gift" size="sm" className="text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-[var(--app-foreground)]">My subscription</div>
          </div>
        </button>

        <button className="w-full flex items-center space-x-4 p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Icon name="help" size="sm" className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-[var(--app-foreground)]">FAQ</div>
          </div>
        </button>

        <button className="w-full flex items-center space-x-4 p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <Icon name="info" size="sm" className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-[var(--app-foreground)]">About App</div>
          </div>
        </button>

        <button className="w-full flex items-center justify-between space-x-4 p-4 hover:bg-[var(--app-accent-light)] rounded-xl transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center">
              <Icon name="moon" size="sm" className="text-gray-600 dark:text-gray-400" />
            </div>
            <div className="font-medium text-[var(--app-foreground)]">Dark mode</div>
          </div>
          <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors">
            <div className="w-4 h-4 bg-white dark:bg-gray-200 rounded-full transition-transform"></div>
          </div>
        </button>

        <button className="w-full flex items-center space-x-4 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <Icon name="logout" size="sm" className="text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-red-600 dark:text-red-400">Log out</div>
          </div>
        </button>
      </div>
    </div>
  );
}

type CoursesProps = {
  setActiveTab: (tab: string) => void;
};

export function Courses({ }: CoursesProps) {
  const courses = [
    {
      id: 1,
      title: "Español en el Trabajo",
      description: "Comunicación profesional y reuniones de negocios",
      icon: "🏢",
      level: "A2",
      levelColor: "from-blue-400 to-blue-600",
      difficulty: "Intermedio",
      totalTasks: 24,
      completedTasks: 18,
      percentage: 75,
      scenarios: [
        "Presentaciones en español",
        "Reuniones de trabajo", 
        "Emails profesionales",
        "Llamadas telefónicas",
        "Entrevistas de trabajo"
      ]
    },
    {
      id: 2,
      title: "En el Supermercado",
      description: "Compras diarias y preguntas sobre productos",
      icon: "🛒",
      level: "A0",
      levelColor: "from-green-400 to-green-600",
      difficulty: "Principiante",
      totalTasks: 16,
      completedTasks: 16,
      percentage: 100,
      scenarios: [
        "Preguntar precios",
        "Buscar productos",
        "Formas de pago",
        "Cantidades y medidas",
        "Ofertas y descuentos"
      ]
    },
    {
      id: 3,
      title: "Viajando por España",
      description: "Turismo, hoteles y transporte público",
      icon: "🏖️",
      level: "A1",
      levelColor: "from-purple-400 to-purple-600", 
      difficulty: "Elemental",
      totalTasks: 20,
      completedTasks: 12,
      percentage: 60,
      scenarios: [
        "Reservar hotel",
        "Preguntar direcciones",
        "Transporte público",
        "Restaurantes y comida",
        "Actividades turísticas"
      ]
    },
    {
      id: 4,
      title: "Conversaciones en la Calle",
      description: "Interacciones casuales y emergencias urbanas",
      icon: "🚶‍♀️",
      level: "A1",
      levelColor: "from-orange-400 to-orange-600",
      difficulty: "Elemental",
      totalTasks: 18,
      completedTasks: 8,
      percentage: 44,
      scenarios: [
        "Saludar a vecinos",
        "Pedir ayuda",
        "Emergencias médicas",
        "Direcciones en la ciudad",
        "Quejas y problemas"
      ]
    },
    {
      id: 5,
      title: "En el Hospital/Médico",
      description: "Consultas médicas y síntomas de salud",
      icon: "🏥",
      level: "B1",
      levelColor: "from-red-400 to-red-600",
      difficulty: "Intermedio Alto",
      totalTasks: 22,
      completedTasks: 3,
      percentage: 14,
      scenarios: [
        "Explicar síntomas",
        "Citas médicas",
        "Medicamentos",
        "Seguros de salud",
        "Exámenes médicos"
      ]
    },
    {
      id: 6,
      title: "Vida Social y Amigos",
      description: "Conversaciones casuales y eventos sociales",
      icon: "🎊",
      level: "A2",
      levelColor: "from-pink-400 to-pink-600",
      difficulty: "Intermedio",
      totalTasks: 15,
      completedTasks: 9,
      percentage: 60,
      scenarios: [
        "Hacer planes",
        "Hablar del clima",
        "Fiestas y celebraciones",
        "Hobbies e intereses",
        "Invitaciones sociales"
      ]
    },
    {
      id: 7,
      title: "En el Restaurante",
      description: "Pedir comida y experiencias culinarias",
      icon: "🍽️",
      level: "A0",
      levelColor: "from-yellow-400 to-yellow-600",
      difficulty: "Principiante",
      totalTasks: 12,
      completedTasks: 10,
      percentage: 83,
      scenarios: [
        "Ordenar comida",
        "Alergias alimentarias",
        "Pedir la cuenta",
        "Propinas",
        "Reservar mesa"
      ]
    },
    {
      id: 8,
      title: "Negocios Avanzados",
      description: "Presentaciones complejas y negociaciones",
      icon: "💼",
      level: "B2",
      levelColor: "from-indigo-400 to-indigo-600",
      difficulty: "Avanzado",
      totalTasks: 30,
      completedTasks: 0,
      percentage: 0,
      scenarios: [
        "Negociaciones complejas",
        "Presentaciones ejecutivas",
        "Análisis financiero",
        "Contratos y legales",
        "Liderazgo de equipos"
      ]
    }
  ];

  const getDifficultyColor = (level: string) => {
    switch(level) {
      case 'A0': return 'text-green-600 dark:text-green-400';
      case 'A1': return 'text-blue-600 dark:text-blue-400';
      case 'A2': return 'text-purple-600 dark:text-purple-400';
      case 'B1': return 'text-orange-600 dark:text-orange-400';
      case 'B2': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'from-green-400 to-green-600';
    if (percentage >= 75) return 'from-blue-400 to-blue-600';
    if (percentage >= 50) return 'from-yellow-400 to-yellow-600';
    if (percentage >= 25) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8 relative">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="mascot-float mascot-hover">
            <img 
              src="/assets/mascots/mascot-mexican.jpg" 
              alt="GOGA Mexican Mascot" 
              className="w-20 h-20 object-contain animate-wiggle mascot-no-bg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">Cursos de Español</h1>
            <p className="text-[var(--app-foreground-muted)]">
              Aprende español en situaciones reales de la vida diaria
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-6 border border-[var(--app-card-border)] hover:shadow-md transition-all cursor-pointer card-hover smooth-transition relative"
          >
                <div className="relative z-10">
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${course.levelColor} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                  {course.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[var(--app-foreground)]">{course.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 ${getDifficultyColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-[var(--app-foreground-muted)] mb-3">{course.description}</p>
                  
                  {/* Progress Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name="tasks" size="sm" className="text-[var(--app-foreground-muted)]" />
                        <span className="text-sm text-[var(--app-foreground-muted)]">
                          {course.completedTasks}/{course.totalTasks} tareas
                        </span>
                      </div>
                      <span className={`text-sm font-bold ${
                        course.percentage === 100 ? 'text-green-600 dark:text-green-400' :
                        course.percentage >= 75 ? 'text-blue-600 dark:text-blue-400' :
                        course.percentage >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
                        course.percentage >= 25 ? 'text-orange-600 dark:text-orange-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {course.percentage}% completo
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 bg-gradient-to-r ${getProgressColor(course.percentage)} transition-all duration-500 ease-out`}
                        style={{width: `${course.percentage}%`}}
                      />
                    </div>
                  </div>
                  
                  {/* Difficulty and Scenarios */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="trophy" size="sm" className={getDifficultyColor(course.level)} />
                      <span className="text-sm text-[var(--app-foreground-muted)]">
                        {course.difficulty}
                      </span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      course.percentage === 0 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' 
                        : course.percentage === 100 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                    }`}>
                      {course.percentage === 0 ? 'Comenzar' : 
                       course.percentage === 100 ? '✓ Completado' : 
                       'Continuar'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Scenarios List */}
              <div className="mt-4 pt-4 border-t border-[var(--app-card-border)]">
                <h4 className="text-sm font-medium text-[var(--app-foreground)] mb-2">Situaciones incluidas:</h4>
                <div className="flex flex-wrap gap-2">
                  {course.scenarios.map((scenario, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-[var(--app-foreground-muted)] rounded-full"
                    >
                      {scenario}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="fiesta-gradient rounded-xl p-6 text-white card-hover smooth-transition">
        <h3 className="text-lg font-bold mb-4">Tu Progreso General</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm opacity-90">Cursos iniciados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">76</div>
            <div className="text-sm opacity-90">Tareas completadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">58%</div>
            <div className="text-sm opacity-90">Progreso promedio</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Features({ }: FeaturesProps) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card title="Key Features">
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Minimalistic and beautiful UI design
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Responsive layout for all devices
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Dark mode support
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              OnchainKit integration
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

type HomeProps = {
  setActiveTab: (tab: string) => void;
};

export function Home({ }: HomeProps) {
  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* User Greeting & Level */}
      <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-6 border border-[var(--app-card-border)] card-hover smooth-transition relative">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-[var(--app-foreground)] mb-1">¡Hola, María! 👋🇪🇸</h1>
                <p className="text-[var(--app-foreground-muted)]">Level 3 • Intermediate</p>
              </div>
              <div className="mascot-float mascot-hover">
                <img 
                  src="/assets/mascots/mascot-selfie.jpg" 
                  alt="GOGA Mascot" 
                  className="w-16 h-16 object-contain animate-wiggle mascot-no-bg"
                />
              </div>
            </div>
            <div className="flex items-center bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full">
              <span className="text-orange-600 dark:text-orange-400 mr-1">🔥</span>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">7 day streak</span>
            </div>
          </div>
          
          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">2,450</div>
              <div className="text-sm text-[var(--app-foreground-muted)]">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-500">12</div>
              <div className="text-sm text-[var(--app-foreground-muted)]">Badges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--app-foreground)]">24</div>
              <div className="text-sm text-[var(--app-foreground-muted)]">Missions</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[var(--app-foreground-muted)]">Progress to Level 4</span>
              <span className="text-sm font-medium text-[var(--app-foreground)]">75%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Mission Card */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-teal-500 rounded-xl p-6 text-white relative overflow-hidden card-hover smooth-transition">
        <div className="relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold mb-1">A1 Mission</h3>
              <p className="text-orange-100 text-sm">Practice basic conversations</p>
            </div>
            <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
              <span className="text-yellow-300 mr-1">⭐</span>
              <span className="text-sm font-medium">+50 XP</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Practice Scenarios */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--app-foreground)] mb-4">Practice Scenarios</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              id: 1,
              level: "A0",
              levelColor: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
              title: "At the Supermarket",
              description: "Learn to ask for prices and items",
              xp: 25,
              duration: "~3 min",
              icon: "🛒"
            },
            {
              id: 2,
              level: "A1",
              levelColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
              title: "Taking a Taxi",
              description: "Give directions and negotiate fare",
              xp: 50,
              duration: "~5 min",
              icon: "🚖"
            },
            {
              id: 3,
              level: "A2",
              levelColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
              title: "Restaurant Dining",
              description: "Order complex meals and make special requests",
              xp: 75,
              duration: "~7 min",
              icon: "🍽️"
            },
            {
              id: 4,
              level: "A0",
              levelColor: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300",
              title: "Greetings & Introductions",
              description: "Basic social interactions and politeness",
              xp: 20,
              duration: "~2 min",
              icon: "👥"
            }
          ].map((lesson) => (
            <div
              key={lesson.id}
              className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-4 border border-[var(--app-card-border)] hover:shadow-md transition-all cursor-pointer card-hover smooth-transition relative"
            >
              <div className="mexican-pattern absolute inset-0 rounded-xl opacity-20"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${lesson.levelColor}`}>
                    {lesson.level} • {lesson.level === "A0" ? "Beginner" : lesson.level === "A1" ? "Elementary" : "Intermediate"}
                  </div>
                  <div className="text-xl">{lesson.icon}</div>
                </div>
                
                <h3 className="font-medium text-[var(--app-foreground)] mb-1 text-sm leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-xs text-[var(--app-foreground-muted)] mb-3 leading-relaxed">
                  {lesson.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-600 mr-1">⭐</span>
                    <span className="text-xs font-medium text-[var(--app-foreground)]">+{lesson.xp} XP</span>
                  </div>
                  <span className="text-xs text-[var(--app-foreground-muted)]">{lesson.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TransactionCard />
    </div>
  );
}

type IconProps = {
  name: "heart" | "star" | "check" | "plus" | "arrow-right" | "arrow-left" | "menu" | "user" | "book" | "trophy" | "tasks" | "credit-card" | "logout" | "settings" | "help" | "leaderboard" | "achievement" | "edit" | "graduation-cap" | "bar-chart" | "users" | "message-circle" | "calendar" | "credit-card2" | "gift" | "info" | "moon" | "certificate" | "link" | "file" | "search" | "contract" | "academic-cap" | "eye" | "send" | "paperclip" | "message";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export { DropdownMenu };

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    "arrow-left": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Left</title>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    ),
    menu: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Menu</title>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    user: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>User</title>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    book: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Book</title>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    trophy: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Trophy</title>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 14 20.24 14 22" />
        <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C12.96 18.75 11 20.24 11 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    tasks: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Tasks</title>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
      </svg>
    ),
    "credit-card": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Credit Card</title>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    logout: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Logout</title>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    settings: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Settings</title>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    help: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Help</title>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    leaderboard: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Leaderboard</title>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    ),
    achievement: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Achievement</title>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    edit: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Edit</title>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
      </svg>
    ),
    "graduation-cap": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Graduation Cap</title>
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
    "bar-chart": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Bar Chart</title>
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    users: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Users</title>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    "message-circle": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Message Circle</title>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    ),
    calendar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Calendar</title>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    "credit-card2": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Credit Card</title>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    gift: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Gift</title>
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Info</title>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    moon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Moon</title>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    certificate: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Certificate</title>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        <rect x="4" y="4" width="16" height="12" rx="1" />
      </svg>
    ),
    link: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Link</title>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    file: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>File</title>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    search: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Search</title>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    contract: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Smart Contract</title>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 12l2 2 4-4" />
        <circle cx="8" cy="8" r="2" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    ),
    "academic-cap": (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${sizeClasses[size]} ${className}`}>
        <path d="M12 14l9-5-9-5-9 5 9 5z"/>
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
      </svg>
    ),
    eye: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${sizeClasses[size]} ${className}`}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    send: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${sizeClasses[size]} ${className}`}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22,2 15,21 11,13 2,9"></polygon>
      </svg>
    ),
    paperclip: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${sizeClasses[size]} ${className}`}>
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49"/>
      </svg>
    ),
    message: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${sizeClasses[size]} ${className}`}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}


type DropdownMenuProps = {
  setActiveTab: (tab: string) => void;
};

function DropdownMenu({ setActiveTab }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      id: 'teacher', 
      icon: 'academic-cap' as const, 
      label: 'Panel de Profesor', 
      description: 'Gestionar estudiantes y clases'
    },
    { 
      id: 'profile', 
      icon: 'user' as const, 
      label: 'Mi Perfil', 
      description: 'Información personal y progreso'
    },
    { 
      id: 'courses', 
      icon: 'book' as const, 
      label: 'Cursos', 
      description: 'Explora lecciones y contenido'
    },
    { 
      id: 'level', 
      icon: 'trophy' as const, 
      label: 'Mi Nivel', 
      description: 'Progreso y certificaciones'
    },
    { 
      id: 'tasks', 
      icon: 'tasks' as const, 
      label: 'Tareas', 
      description: 'Misiones y ejercicios pendientes'
    },
    { 
      id: 'plans', 
      icon: 'credit-card' as const, 
      label: 'Planes Premium', 
      description: 'Acceso a contenido exclusivo'
    },
    { 
      id: 'leaderboard', 
      icon: 'leaderboard' as const, 
      label: 'Tabla de Líderes', 
      description: 'Compite con otros estudiantes'
    },
    { 
      id: 'achievements', 
      icon: 'achievement' as const, 
      label: 'Logros', 
      description: 'Medallas y reconocimientos'
    },
    { 
      id: 'settings', 
      icon: 'settings' as const, 
      label: 'Configuración', 
      description: 'Preferencias y ajustes'
    },
    { 
      id: 'contract', 
      icon: 'contract' as const, 
      label: 'Smart Contract', 
      description: 'Ver información del contrato'
    },
    { 
      id: 'help', 
      icon: 'help' as const, 
      label: 'Ayuda y Soporte', 
      description: 'Contacta con el equipo de soporte'
    },
    { 
      id: 'logout', 
      icon: 'logout' as const, 
      label: 'Cerrar Sesión', 
      description: 'Salir de tu cuenta',
      isLogout: true
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-[var(--app-card-bg)] transition-colors"
        aria-label="Menú principal"
      >
        <Icon name="menu" size="md" className="text-[var(--app-foreground)]" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-12 w-80 bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-xl border border-[var(--app-card-border)] z-50 max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-[var(--app-card-border)]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">M</span>
                </div>
                <div>
                  <h3 className="font-medium text-[var(--app-foreground)]">María González</h3>
                  <p className="text-sm text-[var(--app-foreground-muted)]">Level 3 • Intermediate</p>
                </div>
              </div>
            </div>
            
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    if (item.id === 'plans') {
                      setActiveTab('plans');
                    } else if (item.id === 'profile') {
                      setActiveTab('profile');
                    } else if (item.id === 'courses') {
                      setActiveTab('courses');
                    } else if (item.id === 'contract') {
                      setActiveTab('contract');
                    } else {
                      console.log(`Navegando a: ${item.id}`);
                    }
                  }}
                  className={`w-full px-4 py-3 flex items-start space-x-3 hover:bg-[var(--app-accent-light)] transition-colors text-left ${
                    item.isLogout ? 'hover:bg-red-50 dark:hover:bg-red-900/20' : ''
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size="sm" 
                    className={`mt-0.5 ${
                      item.isLogout 
                        ? 'text-red-500' 
                        : 'text-[var(--app-foreground-muted)]'
                    }`} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${
                      item.isLogout 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-[var(--app-foreground)]'
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-[var(--app-foreground-muted)] mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TransactionCard() {
  const { address } = useAccount();

  // Example transaction call - sending 0 ETH to self
  const calls = useMemo(() => address
    ? [
        {
          to: address,
          data: "0x" as `0x${string}`,
          value: BigInt(0),
        },
      ]
    : [], [address]);

  const sendNotification = useNotification();

  const handleSuccess = useCallback(async (response: TransactionResponse) => {
    const transactionHash = response.transactionReceipts[0].transactionHash;

    console.log(`Transaction successful: ${transactionHash}`);

    await sendNotification({
      title: "Congratulations!",
      body: `You sent your a transaction, ${transactionHash}!`,
    });
  }, [sendNotification]);

  return (
    <Card title="Make Your First Transaction">
      <div className="space-y-4">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Experience the power of seamless sponsored transactions with{" "}
          <a
            href="https://onchainkit.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0052FF] hover:underline"
          >
            OnchainKit
          </a>
          .
        </p>

        <div className="flex flex-col items-center">
          {address ? (
            <Transaction
              calls={calls}
              onSuccess={handleSuccess}
              onError={(error: TransactionError) =>
                console.error("Transaction failed:", error)
              }
            >
              <TransactionButton className="text-white text-md" />
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
            <p className="text-yellow-400 text-sm text-center mt-2">
              Connect your wallet to send a transaction
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

type SmartContractProps = {
  setActiveTab: (tab: string) => void;
};

export function SmartContract({ }: SmartContractProps) {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const CONTRACT_ADDRESS = "0x3586Fe06206C1bea0BFb8D34cDf499f0d6173E7F";

  const fetchContractInfo = useCallback(async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      // Here you would typically use viem to interact with the contract
      console.log("Fetching contract info for:", CONTRACT_ADDRESS);
    } catch (error) {
      console.error("Error fetching contract info:", error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8 relative">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="mascot-float mascot-hover">
            <img 
              src="/assets/mascots/mascot-megaphone.jpg" 
              alt="GOGA Megaphone Mascot" 
              className="w-20 h-20 object-contain animate-wiggle mascot-no-bg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">Smart Contract</h1>
            <p className="text-[var(--app-foreground-muted)]">
              Información del contrato desplegado
            </p>
          </div>
        </div>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[var(--app-foreground)]">Detalles del Contrato</h3>
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 dark:text-green-400">Activo</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-[var(--app-gray)] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--app-foreground-muted)]">Dirección del Contrato</span>
                <button
                  onClick={() => navigator.clipboard.writeText(CONTRACT_ADDRESS)}
                  className="text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] text-sm"
                >
                  Copiar
                </button>
              </div>
              <div className="mt-2 font-mono text-sm text-[var(--app-foreground)] break-all">
                {CONTRACT_ADDRESS}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--app-gray)] rounded-lg p-4">
                <div className="text-sm text-[var(--app-foreground-muted)] mb-1">Red</div>
                <div className="text-[var(--app-foreground)] font-medium">Base Sepolia</div>
              </div>
              <div className="bg-[var(--app-gray)] rounded-lg p-4">
                <div className="text-sm text-[var(--app-foreground-muted)] mb-1">Tipo</div>
                <div className="text-[var(--app-foreground)] font-medium">Smart Contract</div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="primary"
              className="w-full"
              onClick={fetchContractInfo}
              disabled={!address || loading}
            >
              {loading ? "Cargando..." : "Actualizar Información"}
            </Button>
            {!address && (
              <p className="text-yellow-400 text-sm text-center mt-2">
                Conecta tu wallet para interactuar con el contrato
              </p>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">Explorar Contrato</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(`https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}`, '_blank')}
            >
              <Icon name="link" className="mr-2" size="sm" />
              Ver en BaseScan
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                const url = `https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}#code`;
                window.open(url, '_blank');
              }}
            >
              <Icon name="file" className="mr-2" size="sm" />
              Ver Código Fuente
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                const url = `https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}#readContract`;
                window.open(url, '_blank');
              }}
            >
              <Icon name="search" className="mr-2" size="sm" />
              Leer Contrato
            </Button>
          </div>
        </div>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <Icon name="help" className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Información del Smart Contract</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Contrato desplegado en Base Sepolia testnet</li>
              <li>• Puedes verificar todas las transacciones en BaseScan</li>
              <li>• El código fuente está disponible públicamente</li>
              <li>• Conecta tu wallet para interactuar con el contrato</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}