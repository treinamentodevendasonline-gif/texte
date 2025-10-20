import React, { useState, useCallback } from 'react';
import { PdfFile } from './types';
import LoginView from './components/LoginView';
import AdminView from './components/AdminView';
import PublicView from './components/PublicView';
import Header from './components/Header';
import PdfViewer from './components/PdfViewer';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoginView, setIsLoginView] = useState<boolean>(false);
  const [viewingPdfUrl, setViewingPdfUrl] = useState<string | null>(null);
  
  // In a real application, this would come from a database.
  // Here, we use mock data.
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([
    { id: 1, name: 'Manual de Serralheria Moderna.pdf', url: '#', coverUrl: 'https://via.placeholder.com/400x500.png?text=Serralheria' },
    { id: 2, name: 'Guia de Soldagem para Iniciantes.pdf', url: '#', coverUrl: 'https://via.placeholder.com/400x500.png?text=Soldagem' },
    { id: 3, name: 'Projetos de Portões Automáticos.pdf', url: '#', coverUrl: 'https://via.placeholder.com/400x500.png?text=Portões' },
  ]);

  const handleLogin = useCallback((success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      setIsLoginView(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const handleAddPdf = useCallback((pdfFile: File, coverFile: File | null) => {
    const newPdf: PdfFile = {
      id: Date.now(),
      name: pdfFile.name,
      url: URL.createObjectURL(pdfFile),
      coverUrl: coverFile ? URL.createObjectURL(coverFile) : 'https://via.placeholder.com/400x500.png?text=Sem+Capa',
    };
    setPdfFiles(prevFiles => [newPdf, ...prevFiles]);
  }, []);

  const handleDeletePdf = useCallback((id: number) => {
    setPdfFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  }, []);

  const toggleLoginView = () => {
    setIsLoginView(prev => !prev);
  }

  const handleReadPdf = useCallback((url: string) => {
    if (url === '#') {
      alert('Este é um PDF de exemplo e não pode ser aberto. Por favor, faça o upload de um PDF real.');
      return;
    }
    setViewingPdfUrl(url);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setViewingPdfUrl(null);
  }, []);


  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout}
        onLoginClick={toggleLoginView}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-300">
            Acesse os catálogos de produtos disponíveis e fique ligado pois qualquer atualização você receberá de forma gratuita.
          </p>
        </div>
        
        {isAuthenticated ? (
          <AdminView 
            files={pdfFiles} 
            onAddPdf={handleAddPdf} 
            onDeletePdf={handleDeletePdf} 
            onReadPdf={handleReadPdf}
          />
        ) : isLoginView ? (
          <LoginView onLogin={handleLogin} />
        ) : (
          <PublicView files={pdfFiles} onReadPdf={handleReadPdf} />
        )}

      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Studio do Serralheiro &copy; {new Date().getFullYear()}</p>
        <p className="mt-2 text-xs text-slate-600">
          Nota: A funcionalidade de upload é uma simulação. Os arquivos são armazenados apenas na sessão atual do navegador e serão perdidos ao recarregar a página.
        </p>
      </footer>
      {viewingPdfUrl && <PdfViewer url={viewingPdfUrl} onClose={handleCloseViewer} />}
    </div>
  );
};

export default App;