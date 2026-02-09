
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import Summarizer from './components/Summarizer';
import RevisionManager from './components/RevisionManager';
import { View } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);

  const renderContent = () => {
    switch (activeView) {
      case View.DASHBOARD:
        return <Dashboard onNavigate={setActiveView} />;
      case View.CHAT:
        return <ChatInterface />;
      case View.SUMMARIZER:
        return <Summarizer />;
      case View.REMINDERS:
        return <RevisionManager />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
