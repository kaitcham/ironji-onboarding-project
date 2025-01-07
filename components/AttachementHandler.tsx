'use client';
import { useRef, useState, DragEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createAttachment } from '@/lib/server-functions';

const isValidFileType = (file: File) => {
  const validTypes = [
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  return validTypes.includes(file.type);
};

export default function FileUpload({ shipmentId }: { shipmentId: string }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFileType(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await createAttachment(file!, {
        shipmentId,
        description,
        title: file!.name,
      });
      setIsUploading(false);
      queryClient.invalidateQueries({ queryKey: ['shipment', shipmentId] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shipment__details__page__attachments__empty">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        className={`dropzone ${isDragOver ? 'dropzone--active' : ''}`}
      >
        {!file ? (
          <>
            <h4>Select File here</h4>
            <p>Files Supported: PDF, TEXT, DOC, DOCX</p>
            <input
              hidden
              type="file"
              ref={fileInputRef}
              accept=".doc,.docx,.pdf,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              aria-label="File upload"
            />
            <button type="button" onClick={() => fileInputRef.current?.click()}>
              Choose File
            </button>
          </>
        ) : (
          <form onSubmit={handleUpload} className="attachment__form">
            <h4>
              {file.name} <span onClick={() => setFile(null)}>✖</span>
            </h4>
            <textarea
              rows={3}
              required
              value={description}
              placeholder="Description"
              aria-label="File description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
