import React from 'react';
import { PdfFile } from '../types';

interface PdfCardProps {
  file: PdfFile;
  isAdmin: boolean;
  onDelete?: (id: number) => void;
  onRead?: (url: string) => void;
}

const PdfCard: React.FC<PdfCardProps> = ({ file, isAdmin, onDelete, onRead }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg flex flex-col overflow-hidden hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative w-full h-56 bg-slate-700">
        <img 
          src={file.coverUrl} 
          alt={`Capa do ${file.name}`} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-slate-200 flex-1 break-words leading-tight">
          {file.name}
        </h3>
        <div className="mt-4 flex items-center justify-end gap-3">
          {isAdmin && onDelete && (
            <button
              onClick={() => onDelete(file.id)}
              className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              Excluir
            </button>
          )}
          <button
            onClick={() => onRead && onRead(file.url)}
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300 text-sm"
          >
            Ver Projeto
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;