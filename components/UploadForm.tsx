import React, { useState, useRef } from 'react';

interface UploadFormProps {
  onAddPdf: (pdfFile: File, coverFile: File | null) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onAddPdf }) => {
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf(file);
      setMessage(`PDF: ${file.name}`);
    } else {
      setSelectedPdf(null);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedCover(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedCover(null);
      setCoverPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPdf) {
      onAddPdf(selectedPdf, selectedCover);
      setMessage(`'${selectedPdf.name}' foi enviado com sucesso!`);
      
      // Reset state
      setSelectedPdf(null);
      setSelectedCover(null);
      setCoverPreview(null);
      if (pdfInputRef.current) pdfInputRef.current.value = '';
      if (coverInputRef.current) coverInputRef.current.value = '';

    } else {
      setMessage('Selecione pelo menos um arquivo PDF para enviar.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl mb-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">
        Adicionar Novo Catálogo
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PDF Upload */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg border-2 border-dashed border-slate-600">
             <label
              htmlFor="pdf-upload"
              className="w-full text-center cursor-pointer text-slate-300 font-semibold py-3 px-4 rounded-lg hover:text-cyan-400 transition-colors duration-300"
            >
              1. Escolher Arquivo PDF
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
              ref={pdfInputRef}
              className="hidden"
              required
            />
            {selectedPdf && <p className="text-xs text-slate-400 mt-2 truncate max-w-full px-2">{selectedPdf.name}</p>}
          </div>

          {/* Cover Upload */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-700/50 rounded-lg border-2 border-dashed border-slate-600">
            <label
              htmlFor="cover-upload"
              className="w-full text-center cursor-pointer text-slate-300 font-semibold py-3 px-4 rounded-lg hover:text-cyan-400 transition-colors duration-300"
            >
              2. Escolher Capa (Opcional)
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              ref={coverInputRef}
              className="hidden"
            />
            {coverPreview && <img src={coverPreview} alt="Pré-visualização" className="mt-2 h-16 w-auto rounded" />}
          </div>
        </div>

        {message && <p className="text-sm text-slate-400 text-center">{message}</p>}
        
        <button
          type="submit"
          disabled={!selectedPdf}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors duration-300"
        >
          Enviar Catálogo
        </button>
      </form>
    </div>
  );
};

export default UploadForm;