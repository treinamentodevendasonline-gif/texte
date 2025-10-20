import React from 'react';

interface PdfViewerProps {
  url: string;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, onClose }) => {
  // Handle Escape key to close the modal
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl w-full h-full max-w-5xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-2 pl-4 bg-slate-700/50 rounded-t-lg">
          <h2 id="pdf-viewer-title" className="text-lg font-semibold text-slate-300">Visualizador de Catálogo</h2>
          <button
            onClick={onClose}
            className="text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-transform duration-200 hover:scale-110"
            aria-label="Fechar leitor de PDF"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 p-2 pb-4 h-0"> {/* h-0 with flex-1 is a trick for flexbox height issues in some browsers */}
          <embed 
            src={url} 
            type="application/pdf" 
            className="w-full h-full rounded-b-lg"
          />
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PdfViewer;