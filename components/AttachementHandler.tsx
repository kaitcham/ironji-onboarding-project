'use client';
import { useRef, useState } from 'react';

export default function AttachementHandler({
  shipmentId,
}: {
  shipmentId: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="shipment__details__page__attachments__empty">
      <div className="drop__box">
        <h4>Select File here</h4>
        <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
        <input
          hidden
          type="file"
          id="fileID"
          ref={inputRef}
          accept=".doc,.docx,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          className="select__btn"
          onClick={() => inputRef.current?.click()}
        >
          Choose File
        </button>
      </div>
    </div>
  );
}
