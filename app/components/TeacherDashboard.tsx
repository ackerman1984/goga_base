"use client";

import { useState } from "react";
import { Button, Card, Icon } from "./DemoComponents";

type Student = {
  id: string;
  name: string;
  email: string;
  level: string;
  progress: number;
  lastActive: string;
  avatar: string;
  plan: string;
  lessonsCompleted: number;
  totalLessons: number;
};

type Message = {
  id: string;
  studentId: string;
  studentName: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: "question" | "homework" | "general";
};

type TeacherDashboardProps = {
  setActiveTab: (tab: string) => void;
};

export function TeacherDashboard({ setActiveTab: _setActiveTab }: TeacherDashboardProps) {
  const [activeSection, setActiveSection] = useState("students");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Mock data - en producción vendría de una API
  const students: Student[] = [
    {
      id: "1",
      name: "María González",
      email: "maria@email.com",
      level: "Intermedio",
      progress: 75,
      lastActive: "2024-01-15",
      avatar: "/assets/mascots/mascot-bunny.jpg",
      plan: "Premium",
      lessonsCompleted: 15,
      totalLessons: 20
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      email: "carlos@email.com",
      level: "Principiante",
      progress: 45,
      lastActive: "2024-01-14",
      avatar: "/assets/mascots/mascot-selfie.jpg",
      plan: "Standard",
      lessonsCompleted: 9,
      totalLessons: 20
    },
    {
      id: "3",
      name: "Ana Martínez",
      email: "ana@email.com",
      level: "Avanzado",
      progress: 90,
      lastActive: "2024-01-15",
      avatar: "/assets/mascots/mascot-chef.jpg",
      plan: "Premium",
      lessonsCompleted: 18,
      totalLessons: 20
    },
    {
      id: "4",
      name: "Diego Herrera",
      email: "diego@email.com",
      level: "Intermedio",
      progress: 60,
      lastActive: "2024-01-13",
      avatar: "/assets/mascots/mascot-mexican.jpg",
      plan: "Starter",
      lessonsCompleted: 12,
      totalLessons: 20
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      studentId: "1",
      studentName: "María González",
      content: "Hola profesor, tengo una duda sobre los verbos irregulares en pretérito.",
      timestamp: "2024-01-15 10:30",
      read: false,
      type: "question"
    },
    {
      id: "2",
      studentId: "2",
      studentName: "Carlos Rodríguez",
      content: "He completado la tarea de conjugaciones. ¿Podrías revisarla?",
      timestamp: "2024-01-14 16:45",
      read: true,
      type: "homework"
    },
    {
      id: "3",
      studentId: "3",
      studentName: "Ana Martínez",
      content: "Gracias por la clase de hoy, muy útil la explicación sobre subjuntivo.",
      timestamp: "2024-01-15 12:15",
      read: false,
      type: "general"
    }
  ];

  const unreadCount = messages.filter(m => !m.read).length;

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedStudent) {
      console.log(`Enviando mensaje a estudiante ${selectedStudent}: ${newMessage}`);
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8 relative">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="mascot-float mascot-hover">
            <img 
              src="/assets/mascots/mascot-megaphone.jpg" 
              alt="GOGA Teacher Mascot" 
              className="w-20 h-20 object-contain animate-wiggle mascot-no-bg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--app-foreground)] mb-2">Panel de Profesor</h1>
            <p className="text-[var(--app-foreground-muted)]">
              Gestiona tus estudiantes y comunicación
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-[var(--app-card-bg)] p-1 rounded-lg">
        <button
          onClick={() => setActiveSection("students")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeSection === "students"
              ? "bg-orange-500 text-white"
              : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
          }`}
        >
          <Icon name="users" size="sm" className="inline mr-2" />
          Estudiantes ({students.length})
        </button>
        <button
          onClick={() => setActiveSection("messages")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors relative ${
            activeSection === "messages"
              ? "bg-orange-500 text-white"
              : "text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]"
          }`}
        >
          <Icon name="message" size="sm" className="inline mr-2" />
          Mensajes
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Students Section */}
      {activeSection === "students" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[var(--app-foreground)]">Lista de Estudiantes</h2>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Icon name="plus" size="sm" className="mr-1" />
              Agregar Estudiante
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {students.map((student) => (
              <Card key={student.id} className="p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover mascot-no-bg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[var(--app-foreground)]">{student.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        student.plan === 'Premium' ? 'bg-orange-100 text-orange-600' :
                        student.plan === 'Standard' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {student.plan}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-[var(--app-foreground-muted)]">
                      <span>{student.level}</span>
                      <span>•</span>
                      <span>{student.lessonsCompleted}/{student.totalLessons} lecciones</span>
                      <span>•</span>
                      <span>Último acceso: {student.lastActive}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[var(--app-foreground-muted)]">Progreso</span>
                        <span className="text-[var(--app-foreground)]">{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedStudent(student.id);
                        setActiveSection("messages");
                      }}
                    >
                      <Icon name="message" size="sm" className="mr-1" />
                      Mensaje
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="eye" size="sm" className="mr-1" />
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Messages Section */}
      {activeSection === "messages" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[var(--app-foreground)]">Mensajes de Estudiantes</h2>
            {unreadCount > 0 && (
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                {unreadCount} sin leer
              </span>
            )}
          </div>

          {/* Message Filters */}
          <div className="flex space-x-2 mb-4">
            <Button size="sm" variant="outline">Todos</Button>
            <Button size="sm" variant="ghost">Preguntas</Button>
            <Button size="sm" variant="ghost">Tareas</Button>
            <Button size="sm" variant="ghost">General</Button>
          </div>

          <div className="space-y-3">
            {messages.map((message) => (
              <Card key={message.id} className={`p-4 ${!message.read ? 'ring-1 ring-orange-300' : ''}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    message.type === 'question' ? 'bg-blue-500' :
                    message.type === 'homework' ? 'bg-green-500' :
                    'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[var(--app-foreground)]">{message.studentName}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          message.type === 'question' ? 'bg-blue-100 text-blue-600' :
                          message.type === 'homework' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {message.type === 'question' ? 'Pregunta' :
                           message.type === 'homework' ? 'Tarea' : 'General'}
                        </span>
                        <span className="text-xs text-[var(--app-foreground-muted)]">
                          {message.timestamp}
                        </span>
                        {!message.read && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-[var(--app-foreground-muted)] text-sm mb-3">
                      {message.content}
                    </p>
                    <Button size="sm" variant="outline">
                      Responder
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Message Composer */}
          {selectedStudent && (
            <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
              <h3 className="font-medium text-[var(--app-foreground)] mb-3">
                Enviar mensaje rápido
              </h3>
              <div className="space-y-3">
                <select className="w-full p-2 border rounded-lg text-sm">
                  <option value="">Seleccionar estudiante...</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                />
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Icon name="paperclip" size="sm" className="mr-1" />
                      Adjuntar
                    </Button>
                  </div>
                  <Button 
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || !selectedStudent}
                  >
                    <Icon name="send" size="sm" className="mr-1" />
                    Enviar
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}