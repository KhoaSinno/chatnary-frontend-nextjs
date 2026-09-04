'use client';

import apiClient from '@/lib/api';
import { Document } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';

interface UseDocumentsOptions {
  projectId?: string;
  autoFetch?: boolean;
}

interface UseDocumentsReturn {
  documents: Document[];
  loading: boolean;
  error: string | null;
  uploading: boolean;
  uploadDocument: (file: File) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  refreshDocuments: () => Promise<void>;
  getDocument: (documentId: string) => Promise<Document | null>;
  searchDocuments: (query: string) => Document[];
}

export function useDocuments({ projectId, autoFetch = true }: UseDocumentsOptions = {}): UseDocumentsReturn {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.getProjectDocuments(projectId);

      if (response.error) {
        setError(response.error);
        return;
      }

      setDocuments(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải documents');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const uploadDocument = useCallback(async (file: File) => {
    console.log('Upload started:', { file: file.name, projectId });

    if (!projectId) {
      const errorMsg = 'Project ID is required for upload';
      console.error('Upload failed:', errorMsg);
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      setUploading(true);
      setError(null);

      const response = await apiClient.uploadDocument(projectId, file);

      if (response.error) {
        setError(response.error);
        throw new Error(response.error);
      }

      if (response.data) setDocuments((current) => [response.data!, ...current]);
      await fetchDocuments();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi upload document';
      console.error('Upload error:', err);
      setError(errorMessage);
      throw err; // Re-throw để handleUpload có thể catch
    } finally {
      setUploading(false);
    }
  }, [projectId, fetchDocuments]);

  const deleteDocument = useCallback(async (documentId: string) => {
    try {
      setError(null);

      const response = await apiClient.deleteDocument(documentId);

      if (response.error) {
        setError(response.error);
        return;
      }

      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa document');
    }
  }, []);

  const getDocument = useCallback(async (documentId: string): Promise<Document | null> => {
    try {
      setError(null);

      const response = await apiClient.getDocument(documentId);

      if (response.error) {
        setError(response.error);
        return null;
      }

      return response.data || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải document');
      return null;
    }
  }, []);

  // Search locally within loaded documents
  const searchDocuments = useCallback((query: string): Document[] => {
    if (!query.trim()) return documents;

    const lowerQuery = query.toLowerCase();
    return documents.filter(doc =>
      doc.name.toLowerCase().includes(lowerQuery) ||
      doc.originalFilename?.toLowerCase().includes(lowerQuery)
    );
  }, [documents]);

  const refreshDocuments = useCallback(async () => {
    await fetchDocuments();
  }, [fetchDocuments]);

  // Reset state immediately when projectId changes
  useEffect(() => {
    if (projectId) {
      setLoading(true);
      setDocuments([]);
      setError(null);
    }
  }, [projectId]);

  // Auto-fetch documents when projectId changes
  useEffect(() => {
    if (autoFetch && projectId) {
      fetchDocuments();
    }
  }, [projectId, autoFetch, fetchDocuments]);

  useEffect(() => {
    if (!documents.some((document) => document.status === 'processing')) return;

    const pollId = window.setInterval(() => {
      void fetchDocuments();
    }, 5000);

    return () => window.clearInterval(pollId);
  }, [documents, fetchDocuments]);

  return {
    documents,
    loading,
    error,
    uploading,
    uploadDocument,
    deleteDocument,
    refreshDocuments,
    getDocument,
    searchDocuments,
  };
}

export default useDocuments;
