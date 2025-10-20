import React, { useState } from 'react';
import { PdfFile } from '../types';
import PdfCard from './PdfCard';
import UploadForm from './UploadForm';

interface AdminViewProps {
  files: PdfFile[];
  onAddPdf: (pdfFile: File, coverFile: File | null) => void;
  onDeletePdf: (id: number) => void;
  onReadPdf: (url: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ files, onAddPdf, onDeletePdf, onReadPdf }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <UploadForm onAddPdf={onAddPdf} />
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center border-b-2 border-cyan-500/30 pb-3">
          Gerenciar Catálogos
        </h2>
        
        <div className="mb-8 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Buscar catálogo pelo nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors duration-300"
            aria-label="Buscar catálogos"
          />
        </div>

        {files.length > 0 && filteredFiles.length === 0 ? (
           <p className="text-center text-slate-400">Nenhum catálogo encontrado com o termo "{searchTerm}".</p>
        ) : files.length === 0 ? (
          <p className="text-center text-slate-400">Nenhum arquivo encontrado. Adicione um no formulário acima.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map(file => (
              <PdfCard 
                key={file.id} 
                file={file} 
                isAdmin={true} 
                onDelete={onDeletePdf} 
                onRead={onReadPdf}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;