# Project Export

## Project Statistics

- Total files: 73

## Folder Structure

```
src
  app
    auth
      login
        page.tsx
      register
        page.tsx
    bookmark
      page.tsx
    chat
      page.tsx
      [id]
        page.tsx
    dashboard
      page.tsx
    documents
      page.tsx
    globals.css
    layout.tsx
    login
      page.tsx
    notebook
      page.tsx
    page.tsx
    quiz
      page.tsx
    register
      page.tsx
    settings
      page.tsx
  components
    auth
      AuthGuard.tsx
    chat
      ChatInput.tsx
      ChatListItem.tsx
      ChatMessage.tsx
      ChatNotFound.tsx
      ChatRenameModal.tsx
      CitationCard.tsx
      SuggestionChips.tsx
    document
      DocumentCard.tsx
      DocumentControls.tsx
      DocumentList.tsx
      DocumentViewer.tsx
      FileUploadZone.tsx
    layout
      AppLayout.tsx
      Breadcrumb.tsx
      ChatSidebar.tsx
      GlobalHeader.tsx
      HeaderButton.tsx
      index.ts
      MainLayout.tsx
      PageHeader.tsx
      ProfileMenu.tsx
      ProjectContextProvider.tsx
      Sidebar.tsx
      ThemeToggle.tsx
    ui
      Button.tsx
      Card.tsx
      ColorPicker.tsx
      EmptyState.tsx
      ErrorPage.tsx
      FileIcon.tsx
      HeaderBadge.tsx
      IconPicker.tsx
      index.ts
      Input.tsx
      Loading.tsx
      LoadingState.tsx
      Modal.tsx
      Pagination.tsx
      ThemeToggle.tsx
      Toast.tsx
  contexts
    AuthContext.tsx
    BreadcrumbContext.tsx
    ChatContext.tsx
    SidebarContext.tsx
    ThemeContext.tsx
    ToastContext.tsx
  hooks
    useBreadcrumb.tsx
    useChat.ts
    useDocumentFilters.ts
    useDocuments.ts
    useProject.ts
  lib
    api.ts
    auth.ts
    mockData.ts
    types.ts
    utils.ts
package.json

```

### src\app\auth\login\page.tsx

```tsx
'use client';

import { Button } from '@/components/ui';
import { authApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authApi.login({ email, password });
      
      if (response.success) {
        // Redirect to global dashboard (no project required)
        router.push('/dashboard');
      } else {
        setError(response.error || 'Đăng nhập thất bại');
      }
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/20 blur-[100px]" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-400/20 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Chào mừng trở lại!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Đăng nhập để tiếp tục quản lý dự án Chatnary
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mật khẩu
                </label>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button
              className="w-full py-6 text-base font-semibold shadow-lg shadow-blue-500/20"
              isLoading={isLoading}
            >
              Đăng nhập
              {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Chưa có tài khoản?{' '}
            <Link href="/auth/register" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors">
              Đăng ký ngay
            </Link>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Điều khoản</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Bảo mật</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">Trợ giúp</a>
        </div>
      </motion.div>
    </div>
  );
}

```

### src\app\auth\register\page.tsx

```tsx
'use client';

import { Button } from '@/components/ui';
import { authApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { Check, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }

    if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Assuming name is not supported by backend yet based on API analysis
      const response = await authApi.register({ email, password, name: email.split('@')[0] });
      
      if (response.success) {
        // Automatically login or redirect to login page
        // Let's try to login immediately for better UX
        const loginResponse = await authApi.login({ email, password });
        if (loginResponse.success) {
            router.push('/');
        } else {
            // Fallback to login page if auto-login fails
            router.push('/auth/login?registered=true');
        }
      } else {
        setError(response.error || 'Đăng ký thất bại');
      }
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-400/20 blur-[100px]" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-400/20 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Tạo tài khoản mới
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Bắt đầu hành trình khám phá tài liệu thông minh cùng Chatnary
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                Nhập lại mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Check className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button
              className="w-full py-6 text-base font-semibold bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20"
              isLoading={isLoading}
            >
              Đăng ký tài khoản
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Đã có tài khoản?{' '}
            <Link href="/auth/login" className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 transition-colors">
              Đăng nhập
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

```

### src\app\bookmark\page.tsx

```tsx
"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Button, Loading } from "@/components/ui";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function BookmarksPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <Loading size="lg" text="Đang tải..." />
        </div>
      }
    >
      <BookmarksPageContent />
    </Suspense>
  );
}

function BookmarksPageContent() {
  const router = useRouter();

  return (
    <MainLayout
      headerTitle="Đã lưu"
      headerSubtitle="Các mục quan trọng bạn đã đánh dấu"
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
         <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Bookmark className="w-10 h-10 text-gray-400" />
         </div>
         <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Chưa có mục nào được lưu
         </h2>
         <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
            Tính năng đang được phát triển. Bạn sẽ sớm có thể lưu lại các đoạn chat, tài liệu quan trọng hoặc kết quả trắc nghiệm tại đây.
         </p>
         
         <div className="flex gap-4">
            <Button variant="secondary" onClick={() => router.push('/documents')}>
               Khám phá tài liệu
            </Button>
            <Button onClick={() => router.push('/chat')}>
               Tạo cuộc trò chuyện
            </Button>
         </div>
      </div>
    </MainLayout>
  );
}

```

### src\app\chat\page.tsx

```tsx
"use client";

import ChatSidebar from '@/components/layout/ChatSidebar';
import MainLayout from '@/components/layout/MainLayout';
import { Button, Card, FileIcon, Loading } from '@/components/ui';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { useChats } from '@/contexts/ChatContext';
import { useProject } from '@/hooks/useProject';
import apiClient, { chatsApi, documentsApi } from '@/lib/api';
import { type Document } from "@/lib/types";
import { MessageSquare } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

// Wrapper component with Suspense boundary for useSearchParams
export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <Loading size="lg" text="Đang tải..." />
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  );
}

function ChatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const { addChat } = useChats();
  
  // Get project data and set breadcrumb context  
  const { project } = useProject();
  const { setProjectName, setProjectColor } = useBreadcrumb();
  
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Set project name and color for breadcrumb when project loads
  useEffect(() => {
    if (project?.name) {
      setProjectName(project.name);
    }
    if (project?.color) {
      setProjectColor(project.color);
    }
  }, [project, setProjectName, setProjectColor]);

  // Auto-select first project if no project is specified
  useEffect(() => {
    const loadProjects = async () => {
      if (!projectId) {
        try {
          setLoadingProjects(true);
          const response = await apiClient.getProjects();

          if (response.success && response.data && response.data.length > 0) {
            // Auto-redirect to first project
            const firstProject = response.data[0];
            router.push(`/chat?project=${firstProject.id}`);
          } else {
            // No projects available, redirect to home
            router.push("/");
          }
        } catch (err) {
          console.error("Failed to load projects:", err);
          router.push("/");
        } finally {
          setLoadingProjects(false);
        }
      }
    };

    loadProjects();
  }, [projectId, router]);

  const fetchDocuments = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    try {
      console.log("Fetching documents for project:", projectId);
      const response = await documentsApi.getProjectDocuments(projectId);

      if (response.success && response.data) {
        const completedDocs = response.data.filter(
          (doc) => doc.status === "processed"
        );
        setDocuments(completedDocs);
        console.log("Loaded documents:", completedDocs.length);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchDocuments();
    }
  }, [projectId, fetchDocuments]);

  const handleToggleDoc = (docId: string) => {
    setSelectedDocs((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  const handleCreateChat = async () => {
    if (selectedDocs.length === 0 || !projectId) {
      console.error("Cannot create chat: missing selectedDocs or projectId", {
        selectedDocs: selectedDocs.length,
        projectId,
      });
      return;
    }

    setCreating(true);
    try {
      console.log("Creating chat for project:", projectId);
      console.log("Request payload:", {
        project_id: projectId,
        title: "Chat mới",
      });

      const response = await chatsApi.createChat({
        project_id: projectId,
        title: "Chat mới",
      });

      console.log("Create chat response:", response);

      if (response.success && response.data) {
        addChat(response.data); // Add to global state
        console.log("Chat created successfully:", response.data.id);
        router.push(`/chat/${response.data.id}?project=${projectId}`);
      } else {
        console.error("Create chat failed:", response.error);
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
      // Log more details about the error
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
    } finally {
      setCreating(false);
    }
  };

  if (!projectId || loadingProjects) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" text="Đang tải..." />
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout
        headerTitle="Tạo cuộc trò chuyện mới"
        headerSubtitle="Chọn tài liệu bạn muốn trò chuyện"
      >
        <div className="flex h-full">
          {/* Chat Sidebar */}
          <ChatSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center">
            <Loading size="lg" text="Đang tải tài liệu..." />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showHeaderBorder={false}>
      <div className="flex h-full">
        {/* Chat Sidebar */}
        <ChatSidebar />
        
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tạo cuộc trò chuyện mới</h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Chọn tài liệu bạn muốn trò chuyện</p>
               </div>
               
               {/* Action Button moved here if needed, or keep logic */}
               {selectedDocs.length > 0 && (
                  <Button
                    onClick={handleCreateChat}
                    disabled={creating}
                    className="shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {creating ? "Đang tạo..." : `Bắt đầu chat (${selectedDocs.length})`}
                  </Button>
               )}
            </div>

          {documents.length === 0 ? (
            <Card variant="bordered" className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Chưa có tài liệu nào
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Upload tài liệu để bắt đầu trò chuyện
              </p>
              <Button onClick={() => router.push(`/documents?project=${projectId}`)}>
                Upload tài liệu
              </Button>
            </Card>
          ) : (
            <>
              {/* Document Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <Card
                    key={doc.id}
                    variant="bordered"
                    className={`cursor-pointer transition-all ${
                      selectedDocs.includes(doc.id)
                        ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "hover:shadow-md"
                    }`}
                  >
                      <label
                        className="flex items-start gap-3 p-4 cursor-pointer w-full"
                        htmlFor={`doc-${doc.id}`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <input
                            id={`doc-${doc.id}`}
                            type="checkbox"
                            checked={selectedDocs.includes(doc.id)}
                            onChange={() => handleToggleDoc(doc.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                            aria-label={`Chọn tài liệu ${doc.name}`}
                          />
                        </div>
                        <FileIcon
                          fileType={doc.mimeType || "unknown"}
                          size="md"
                          className="flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {doc.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Tài liệu
                          </p>
                        </div>
                      </label>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

```

### src\app\chat\[id]\page.tsx

```tsx
"use client";

import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatNotFound from '@/components/chat/ChatNotFound';
import ChatRenameModal from '@/components/chat/ChatRenameModal';
import ChatSidebar from '@/components/layout/ChatSidebar';
import MainLayout from '@/components/layout/MainLayout';
import { Button, EmptyState, LoadingState } from '@/components/ui';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { useChats } from '@/contexts/ChatContext';
import { useChat } from '@/hooks/useChat';
import { useProject } from '@/hooks/useProject';
import { suggestionsApi } from '@/lib/api';
import { Edit2, Share, Trash2 } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

// Wrapper component with Suspense boundary for useSearchParams
export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <LoadingState
            title="Đang tải cuộc trò chuyện"
            message="Đang lấy thông tin chat và tin nhắn..."
          />
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  );
}

function ChatPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = params.id as string;
  const projectId = searchParams.get('project');
  
  // Get project data and set breadcrumb context
  const { project } = useProject();
  const { setProjectName, setProjectColor } = useBreadcrumb();
  
  const {
    chat,
    messages,
    loading,
    sending,
    error: chatError,
    sendMessage,
    updateChatLocal,
  } = useChat({ chatId, projectId: projectId || undefined });

  const { updateChat, chats } = useChats();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set project name and color for breadcrumb when project loads
  useEffect(() => {
    if (project?.name) {
      setProjectName(project.name);
    }
    if (project?.color) {
      setProjectColor(project.color);
    }
  }, [project, setProjectName, setProjectColor]);

  // Sync chat title từ context khi có thay đổi từ sidebar
  useEffect(() => {
    if (chatId && chats.length > 0) {
      const updatedChatFromContext = chats.find((c) => c.id === chatId);
      if (
        updatedChatFromContext &&
        chat &&
        updatedChatFromContext.title !== chat.title
      ) {
        updateChatLocal(updatedChatFromContext);
      }
    }
  }, [chats, chatId, chat, updateChatLocal]);

  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await suggestionsApi.getSuggestions(chatId);
      if (response.success && response.data) {
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      fetchSuggestions();
    }
  }, [chatId, fetchSuggestions]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    try {
      console.log("Chat page sending message:", content);
      await sendMessage(content);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message in chat page:", error);
      // Show error message to user
      alert("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.");
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleChatUpdate = (updatedChat: typeof chat) => {
    if (updatedChat) {
      updateChatLocal(updatedChat);
      updateChat(updatedChat);
    }
  };

  if (loading) {
    return (
      <MainLayout showHeaderBorder={false}>
        <LoadingState
          title="Đang tải cuộc trò chuyện"
          message="Đang lấy thông tin chat và tin nhắn..."
        />
      </MainLayout>
    );
  }

  if (chatError) {
    // Kiểm tra nếu là lỗi 404 (Chat not found)
    if (chatError.includes("Chat not found") || chatError.includes("404")) {
      return (
        <MainLayout showHeaderBorder={false}>
          <ChatNotFound />
        </MainLayout>
      );
    }

    // Lỗi khác
    return (
      <MainLayout showHeaderBorder={false}>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto w-16 h-16 mb-6">
              <div className="w-full h-full rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Có lỗi xảy ra
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{chatError}</p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                className="w-full"
              >
                🔄 Thử lại
              </Button>
              <Button
                onClick={() => router.push(`/chat?project=${projectId}`)}
                variant="secondary"
                className="w-full"
              >
                Tạo cuộc trò chuyện mới
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!chat) {
    return (
      <MainLayout showHeaderBorder={false}>
        <ChatNotFound />
      </MainLayout>
    );
  }



  return (
    <MainLayout showHeaderBorder={false}>
      <div className="flex h-full">
        {/* Chat Sidebar - Full Height */}
        <ChatSidebar />
        
        {/* Chat Content */}
        <div className="flex-1 h-full flex flex-col bg-white dark:bg-gray-900">
          {/* Custom Chat Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
             <div className="flex-1 min-w-0">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {chat?.title || "Đang tải..."}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {messages.length} tin nhắn • ID: {chatId.substring(0, 8)}
                </p>
             </div>
             
             <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRenameModalOpen(true)}
                  title="Đổi tên"
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => console.log("Share chat")}
                  title="Chia sẻ"
                  className="h-8 w-8 p-0"
                >
                  <Share className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("Bạn có chắc muốn xóa cuộc trò chuyện này?")) {
                       console.log("Delete chat");
                    }
                  }}
                  title="Xóa"
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto h-full">
              {messages.length === 0 ? (
                <EmptyState
                  title="Bắt đầu cuộc trò chuyện"
                  description="Đặt câu hỏi về tài liệu trong dự án này. AI sẽ phân tích và trả lời dựa trên nội dung tài liệu."
                  suggestions={suggestions}
                  onSuggestionClick={handleSuggestionSelect}
                />
              ) : (
                <div className="px-4 py-6 space-y-6">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 relative bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4">
             <div className="max-w-4xl mx-auto">
                <ChatInput
                  onSend={handleSendMessage}
                  disabled={sending}
                  placeholder="Hỏi gì về tài liệu này..."
                />
             </div>
          </div>
        </div>
      </div>

      {/* Chat Rename Modal */}
      <ChatRenameModal
        isOpen={isRenameModalOpen}
        chat={chat}
        onClose={() => setIsRenameModalOpen(false)}
        onUpdate={handleChatUpdate}
      />
    </MainLayout>
  );
}

```

### src\app\dashboard\page.tsx

```tsx
"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Loading } from "@/components/ui";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useProject } from "@/hooks/useProject";
import { USE_MOCK_DATA, getMockProjects } from "@/lib/mockData";
import { Project } from "@/lib/types";
import {
    BookMarked,
    BrainCircuit,
    Calendar,
    Clock,
    FileText,
    Lightbulb,
    MessageSquare,
    NotebookPen,
    Upload,
    Zap
} from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

// Wrapper component with Suspense boundary
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <Loading size="lg" text="Đang tải..." />
        </div>
      }
    >
      <DashboardPageContent />
    </Suspense>
  );
}

function DashboardPageContent() {
  const { project, projectId } = useProject();
  const { setProjectName, setProjectColor } = useBreadcrumb();
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  // Set breadcrumb for project-specific view
  useEffect(() => {
    if (project?.name) {
      setProjectName(project.name);
    }
    if (project?.color) {
      setProjectColor(project.color);
    }
  }, [project, setProjectName, setProjectColor]);

  // Load all projects for global view
  useEffect(() => {
    if (USE_MOCK_DATA) {
      setAllProjects(getMockProjects());
    }
  }, []);

  // Always show Global Dashboard (with optional project highlight)
  return (
    <MainLayout showProjectStats={false}>
      <div className="h-full overflow-y-auto p-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Xin chào, Người dùng! 👋</h1>
              <p className="text-blue-100 mb-4">
                Bạn đã tham gia từ <span className="font-semibold">15 Tháng 1, 2024</span>
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Hôm nay là {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Project Spotlight - Show when project is selected */}
        {projectId && project && (
          <div 
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border-2 shadow-md"
            style={{ borderColor: project.color }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <NotebookPen className="w-6 h-6" style={{ color: project.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                      {project.name}
                    </h3>
                    <div 
                      className="px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                      style={{ 
                        backgroundColor: `${project.color}20`,
                        color: project.color 
                      }}
                    >
                      Đang xem
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>{project.documentsCount} tài liệu</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{project.chatsCount} chats</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/documents?project=${project.id}`}>
                  <button className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-xs font-medium">
                    <Upload className="w-3 h-3 inline mr-1" />
                    Tài liệu
                  </button>
                </Link>
                <Link href={`/chat?project=${project.id}`}>
                  <button 
                    className="px-3 py-1.5 text-white rounded-lg hover:opacity-90 transition-opacity text-xs font-medium"
                    style={{ backgroundColor: project.color }}
                  >
                    <MessageSquare className="w-3 h-3 inline mr-1" />
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

          {/* Row 1: Stats Overview - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <NotebookPen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {allProjects.length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Dự án</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {allProjects.reduce((sum, p) => sum + (p.documentsCount || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Tài liệu</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {allProjects.reduce((sum, p) => sum + (p.chatsCount || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Cuộc trò chuyện</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    24h
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Hoạt động gần đây</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Recent Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Tài liệu gần đây
                  </h3>
                  <Link href="/documents">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Xem tất cả
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        Document {i}.pdf
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Cập nhật {i} giờ trước
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Notebooks */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Sổ tay gần đây
                  </h3>
                  <Link href="/notebook">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Xem tất cả
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {allProjects.slice(0, 3).map((project) => (
                  <Link key={project.id} href={`/notebook?project=${project.id}`}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${project.color}20` }}
                      >
                        <NotebookPen
                          className="w-5 h-5"
                          style={{ color: project.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {project.documentsCount} tài liệu
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Quick Actions - Only show when project is selected */}
          {projectId && project && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={`/quiz?project=${project.id}`}>
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Quiz</h3>
                  <p className="text-sm text-white/80">Kiểm tra kiến thức</p>
                </div>
              </Link>

              <Link href={`/quiz?project=${project.id}`}>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Quick Exam</h3>
                  <p className="text-sm text-white/80">Thi nhanh</p>
                </div>
              </Link>

              <Link href={`/chat?project=${project.id}`}>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Chat với AI</h3>
                  <p className="text-sm text-white/80">Trò chuyện thông minh</p>
                </div>
              </Link>

              <Link href={`/bookmark?project=${project.id}`}>
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookMarked className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Bookmark</h3>
                  <p className="text-sm text-white/80">Lưu trữ quan trọng</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </MainLayout>
    );
}

```

### src\app\documents\page.tsx

```tsx
"use client";

import DocumentControls from "@/components/document/DocumentControls";
import DocumentList from "@/components/document/DocumentList";
import DocumentViewer from "@/components/document/DocumentViewer";
import FileUploadZone from "@/components/document/FileUploadZone";
import MainLayout from "@/components/layout/MainLayout";
import { Button, FileIcon, Loading, Modal } from "@/components/ui";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useDocumentFilters } from "@/hooks/useDocumentFilters";
import useDocuments from "@/hooks/useDocuments";
import { useProject } from "@/hooks/useProject";
import apiClient from "@/lib/api";
import { type Document } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PanelRightClose, PanelRightOpen, Search, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Wrapper component with Suspense boundary for useSearchParams
export default function DocumentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <Loading size="lg" />
        </div>
      }
    >
      <DocumentsPageContent />
    </Suspense>
  );
}

function DocumentsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const { project, isLoading: projectLoading } = useProject();
  const { setProjectName, setProjectColor } = useBreadcrumb();
  
  // View Scope State
  const [viewScope, setViewScope] = useState<'project' | 'all'>('project');
  
  const { 
    documents, 
    loading, 
    error, 
    uploading, 
    uploadDocument, 
    deleteDocument, 
    refreshDocuments 
  } = useDocuments({ projectId: projectId || undefined });

  // Use the new hook for filtering/sorting/pagination
  const [searchTerm, setSearchTerm] = useState('');
  const {
    paginatedResult,
    filters,
    currentPage,
    itemsPerPage, 
    handlePageChange,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    setItemsPerPage
  } = useDocumentFilters(documents, searchTerm);

  // Set project name and color for breadcrumb when project loads
  useEffect(() => {
    if (project?.name) {
      setProjectName(project.name);
    }
    if (project?.color) {
      setProjectColor(project.color);
    }
  }, [project, setProjectName, setProjectColor]);
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Auto-select first project if no project is specified
  useEffect(() => {
    const loadProjects = async () => {
      if (!projectId) {
        try {
          setLoadingProjects(true);
          const response = await apiClient.getProjects();

          if (response.success && response.data && response.data.length > 0) {
            // Auto-redirect to first project
            const firstProject = response.data[0];
            router.push(`/documents?project=${firstProject.id}`);
          } else {
            // No projects available, redirect to home
            router.push("/");
          }
        } catch (err) {
          console.error("Failed to load projects:", err);
          router.push("/");
        } finally {
          setLoadingProjects(false);
        }
      }
    };

    loadProjects();
  }, [projectId, router]);

  const handleUpload = async (file: File) => {
    try {
      setUploadError(null);
      await uploadDocument(file);
      setShowUploadModal(false);
    } catch (err) {
      console.error("DocumentsPage: Upload failed:", err);
      setUploadError(
        err instanceof Error ? err.message : "Có lỗi xảy ra khi upload file"
      );
    }
  };

  const handleMultipleUpload = async (files: File[]) => {
    try {
      setUploadError(null);
      const results = await Promise.allSettled(
        files.map((file) => uploadDocument(file))
      );

      const failed = results.filter((result) => result.status === "rejected");
      if (failed.length > 0) {
        setUploadError(`${failed.length}/${files.length} file upload thất bại`);
      } else {
        setShowUploadModal(false);
      }
    } catch (err) {
      console.error("DocumentsPage: Multiple upload failed:", err);
      setUploadError(
        err instanceof Error ? err.message : "Có lỗi xảy ra khi upload file"
      );
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      await deleteDocument(id);
      if (selectedDocument?.id === id) {
        setSelectedDocument(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!projectId || loadingProjects || projectLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <Loading size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Project không tìm thấy
            </h2>
            <Button onClick={() => router.push("/")}>Quay về trang chủ</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Custom Unified Header
  const customHeader = (
    <div className="px-6 py-4 flex flex-col gap-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
       <div className="flex items-center justify-between gap-4">
          {/* Left: Title & Count & Scope Toggle */}
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                  Tài liệu
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                  {paginatedResult.pagination.total}
                </span>
             </div>
             
             {/* Scope Toggle */}
             <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg h-9">
                <button 
                  onClick={() => setViewScope('all')} 
                  className={cn(
                    "px-3 text-xs font-medium rounded-md transition-all", 
                    viewScope === 'all' 
                      ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100" 
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  Tất cả
                </button>
                <div className="w-px bg-gray-200 dark:bg-gray-700 my-1 mx-0.5"></div>
                <button 
                  onClick={() => setViewScope('project')} 
                  className={cn(
                    "px-3 text-xs font-medium rounded-md transition-all", 
                    viewScope === 'project' 
                      ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100" 
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  Dự án
                </button>
             </div>
          </div>

          {/* Right: Actions Toolbar */}
          <div className="flex items-center gap-3">
             {/* Search */}
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                   type="text"
                   placeholder="Tìm kiếm..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-64 pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 border focus:border-blue-500 rounded-lg transition-all outline-none"
                />
             </div>
             
             {/* Divider */}
             <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

             {/* Controls (Pagination, Filter) */}
             <DocumentControls 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                currentPage={currentPage}
                totalPages={paginatedResult.pagination.totalPages}
                totalDocuments={paginatedResult.pagination.total}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={setItemsPerPage}
             />

             {/* Upload Button */}
             <Button 
                onClick={() => setShowUploadModal(true)}
                disabled={uploading}
                className="ml-2 gap-2 shadow-sm"
             >
                <Upload className="w-4 h-4" />
                {uploading ? "Đang upload..." : "Upload"}
             </Button>

             {/* View Toggle (Expand/Collapse Panel) */}
             <div className="border-l border-gray-200 dark:border-gray-700 pl-2 ml-1">
               <button
                  onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isPanelCollapsed 
                      ? "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30" 
                  )}
                  title={isPanelCollapsed ? "Hiển thị chi tiết" : "Ẩn chi tiết"}
                >
                  {isPanelCollapsed ? (
                    <PanelRightOpen className="w-5 h-5" />
                  ) : (
                    <PanelRightClose className="w-5 h-5" />
                  )}
               </button>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <MainLayout
      showHeaderBorder={false} // Disable default border
      headerExtras={customHeader} // Inject custom header
    >
      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          <p className="font-medium">Lỗi: {error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshDocuments}
            className="mt-2"
          >
            Thử lại
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex min-h-0 h-full">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loading size="lg" text="Đang tải tài liệu..." />
          </div>
        ) : (
          <>
            {viewScope === 'all' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/50 dark:bg-gray-900/50"> 
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Xem tất cả tài liệu</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md text-center mt-2">
                        Tính năng xem tổng hợp tất cả tài liệu từ mọi dự án đang được phát triển. <br/>
                        Vui lòng chọn chế độ <b>&quot;Dự án&quot;</b> để quản lý tài liệu của dự án hiện tại.
                    </p>
                    <Button onClick={() => setViewScope('project')} variant="outline" className="mt-6">
                        Quay lại chế độ Dự án
                    </Button>
                 </div>
            ) : (
             <>
                {/* Document List */}
                <DocumentList
                  documents={paginatedResult.data}
                  selectedDocument={selectedDocument}
                  onSelectDocument={setSelectedDocument}
                  onDeleteDocument={handleDeleteDocument}
                  isPanelCollapsed={isPanelCollapsed}
                />
    
                {/* Document Viewer */}
                {selectedDocument && !isPanelCollapsed && (
                  <DocumentViewer
                    document={selectedDocument}
                    onClose={() => setSelectedDocument(null)}
                  />
                )}
    
                {/* Preview Placeholder */}
                {!selectedDocument && !isPanelCollapsed && (
                  <div className="w-1/2 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center h-full min-h-full">
                    <div className="text-center max-w-lg px-6 py-8 flex-shrink-0">
                      <div className="w-20 h-20 mx-auto mb-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">
                        <FileIcon fileType="txt" size="xl" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Chọn tài liệu để xem trước
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Click vào một tài liệu bên trái để xem nội dung chi tiết.
                      </p>
                    </div>
                  </div>
                )}
             </>
            )}
          </>
        )}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        title="Upload tài liệu"
        onClose={() => {
          if (!uploading) {
            setShowUploadModal(false);
            setUploadError(null);
          }
        }}
      >
        <div className="p-6">
          <FileUploadZone
            onUpload={handleUpload}
            onMultipleUpload={handleMultipleUpload}
            isUploading={uploading}
            allowMultiple={true}
          />
          {uploadError && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
            </div>
          )}
        </div>
      </Modal>
    </MainLayout>
  );
}

```

### src\app\globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Smooth transitions for theme switching */
html {
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  scrollbar-gutter: stable;
  overscroll-behavior: none;
}

/* Custom Global Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1; /* slate-300 */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; /* slate-400 */
}

.dark ::-webkit-scrollbar-thumb {
  background: #374151; /* gray-700 */
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #4b5563; /* gray-600 */
}

html.light {
  color-scheme: light;
}

html.dark {
  color-scheme: dark;
}

/* Light mode specific styles */
.light body {
  background-color: #f9fafb;
  color: #111827;
}

/* Dark mode specific styles */
.dark body {
  background-color: #030712;
  color: #f9fafb;
}

/* File Icon Styles */
.file-icon {
  transition: transform 0.2s ease-in-out;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.file-icon:hover {
  transform: scale(1.05);
}

/* File icon sizes */
.file-icon-sm {
  width: 24px;
  height: 24px;
}

.file-icon-md {
  width: 32px;
  height: 32px;
}

.file-icon-lg {
  width: 40px;
  height: 40px;
}

.file-icon-xl {
  width: 48px;
  height: 48px;
}

/* Document viewer and list styles */
.document-list-item {
  transition: all 0.2s ease-in-out;
}

.document-list-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .document-list-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.document-list-item.selected {
  border-left: 3px solid #3b82f6;
  background: linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.1) 0%,
    transparent 100%
  );
}

.dark .document-list-item.selected {
  background: linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.2) 0%,
    transparent 100%
  );
}

/* Document viewer content */
.document-viewer-content {
  background: #fafafa;
}

.dark .document-viewer-content {
  background: #1a1a1a;
}

/* Scrollbar for document list */
.document-list-scroll::-webkit-scrollbar {
  width: 6px;
}

.document-list-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.document-list-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.document-list-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dark .document-list-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.dark .document-list-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

```

### src\app\layout.tsx

```tsx
import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chatnary - AI Chat với Tài liệu",
  description: "Trò chuyện với AI dựa trên tài liệu của bạn",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <SidebarProvider>
              <BreadcrumbProvider>
                <ChatProvider>
                  <AppLayout>{children}</AppLayout>
                </ChatProvider>
              </BreadcrumbProvider>
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

```

### src\app\login\page.tsx

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({ email, password });

      if (result.success) {
        // Use window.location for more reliable redirect after auth state change
        window.location.href = "/dashboard";
      } else {
        setError(result.error || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <img
                src="/logo-192.png"
                alt="Chatnary"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Chào mừng trở lại
            </h1>
            <p className="text-white/70">
              Đăng nhập để tiếp tục sử dụng Chatnary
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-100 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-purple-500 focus:ring-purple-500/50"
                />
                <span className="text-sm text-white/70">Ghi nhớ đăng nhập</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-white text-purple-700 font-semibold shadow-lg hover:shadow-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-purple-700/30 border-t-purple-700 rounded-full animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/50">hoặc</span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Register link */}
          <p className="mt-8 text-center text-white/70">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-white font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-white/50 text-sm">
          © 2025 Chatnary. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

```

### src\app\notebook\page.tsx

```tsx
'use client';

import HeaderButton from '@/components/layout/HeaderButton';
import MainLayout from '@/components/layout/MainLayout';
import ColorPicker from '@/components/ui/ColorPicker';
import IconPicker from '@/components/ui/IconPicker';
import apiClient from '@/lib/api';
import { USE_MOCK_DATA, createMockProject, deleteMockProject, getMockProjects, simulateDelay, updateMockProject } from '@/lib/mockData';
import { CreateProjectRequest, Project } from '@/lib/types';
import { BookOpen, Clock, Edit, FileText, MessageSquare, Plus, Trash2, Wifi, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface CreateProjectModalProps {
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

interface EditProjectModalProps {
  project: Project;
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

function CreateProjectModal({ onClose, onSubmit }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [selectedIcon, setSelectedIcon] = useState('folder');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isLoading) return;

    setIsLoading(true);
    
    try {
      const projectData: CreateProjectRequest = {
        name: name.trim(),
        description: description.trim() || undefined,
        color: selectedColor,
        icon: selectedIcon,
      };

      if (USE_MOCK_DATA) {
        await simulateDelay(500);
        const newProject = createMockProject(projectData);
        onSubmit(newProject);
      } else {
        const response = await apiClient.createProject(projectData);
        
        if (response.error) {
          alert('Lỗi khi tạo dự án: ' + response.error);
          return;
        }

        if (response.data) {
          const newProject = {
            ...response.data,
            updatedAt: response.data.createdAt,
          };
          onSubmit(newProject);
        }
      }
    } catch (error) {
      alert('Lỗi khi tạo dự án: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Tạo Dự án Mới
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tên Dự án
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Nhập tên dự án"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mô tả (Tùy chọn)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Nhập mô tả dự án"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Màu sắc project
                  </label>
                  <ColorPicker
                    value={selectedColor}
                    onChange={setSelectedColor}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Biểu tượng project
                  </label>
                  <IconPicker
                    value={selectedIcon}
                    onChange={setSelectedIcon}
                    disabled={isLoading}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                disabled={isLoading}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Đang tạo...' : 'Tạo Dự án'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function EditProjectModal({ project, onClose, onSubmit }: EditProjectModalProps) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const [selectedColor, setSelectedColor] = useState(project.color);
  const [selectedIcon, setSelectedIcon] = useState(project.icon || 'folder');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isLoading) return;

    setIsLoading(true);
    
    try {
      const projectData: any = {
        name: name.trim(),
        description: description.trim() || undefined,
        color: selectedColor,
        icon: selectedIcon,
      };

      if (USE_MOCK_DATA) {
        await simulateDelay(400);
        const updatedProject = updateMockProject(project.id, projectData);
        if (updatedProject) {
          onSubmit(updatedProject);
        }
      } else {
        const response = await apiClient.updateProject(project.id, projectData);
        
        if (response.error) {
          alert('Lỗi khi cập nhật dự án: ' + response.error);
          return;
        }

        if (response.data) {
          const updatedProject = {
            ...response.data,
            updatedAt: response.data.updatedAt,
          };
          onSubmit(updatedProject);
        }
      }
    } catch (error) {
      alert('Lỗi khi cập nhật dự án: ' + (error instanceof Error ? error.message : 'Lỗi không xác định'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Chỉnh sửa Dự án
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tên Dự án
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Nhập tên dự án"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mô tả (Tùy chọn)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Nhập mô tả dự án"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Màu sắc project
                  </label>
                  <ColorPicker
                    value={selectedColor}
                    onChange={setSelectedColor}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Biểu tượng project
                  </label>
                  <IconPicker
                    value={selectedIcon}
                    onChange={setSelectedIcon}
                    disabled={isLoading}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                disabled={isLoading}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Đang cập nhật...' : 'Cập nhật Dự án'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function NotebookPageContent() {
  const searchParams = useSearchParams();
  const currentProjectId = searchParams.get('project');
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dự án này không?')) return;
    
    setIsLoading(true);
    try {
      if (USE_MOCK_DATA) {
        await simulateDelay(300);
        deleteMockProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } else {
        const response = await apiClient.deleteProject(id);
        if (response.error) {
          alert('Lỗi khi xóa dự án: ' + response.error);
          return;
        }
        setProjects(projects.filter(p => p.id !== id));
      }

    } catch {
      alert('Lỗi khi xóa dự án');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    setShowEditModal(false);
    setEditingProject(null);
  };

  // Load projects on mount
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      setConnectionError(false);
      try {
        if (USE_MOCK_DATA) {
          await simulateDelay(400);
          const mockProjects = getMockProjects();
          setProjects(mockProjects);
          console.log('Mock projects loaded:', mockProjects.length);
        } else {
          const response = await apiClient.getProjects();
          if (response.data) {
            const apiProjects = response.data.map((project: Project) => ({
              ...project,
              updatedAt: project.updatedAt,
            }));
            setProjects(apiProjects);
          } else if (response.error) {
            setConnectionError(true);
            console.error('Lỗi API:', response.error);
          }
        }
      } catch (error) {
        setConnectionError(true);
        console.error('Lỗi kết nối:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <MainLayout
      headerTitle="Sổ tay Dự án"
      headerSubtitle="Tổ chức tài liệu theo dự án và trò chuyện với AI về chúng"
      headerActions={
        <div className="flex items-center gap-2">
          {/* Connection Status */}
          {connectionError ? (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
              <WifiOff className="w-4 h-4" />
              <span>Ngoại tuyến</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm">
              <Wifi className="w-4 h-4" />
              <span>Đã kết nối</span>
            </div>
          )}

          <HeaderButton
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowCreateModal(true)}
            disabled={isLoading || connectionError}
            tooltip={connectionError ? "Không thể tạo dự án khi ngoại tuyến" : "Tạo dự án mới"}
          >
            Dự án Mới
          </HeaderButton>
        </div>
      }
    >
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {isLoading && projects.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                Đang tải dự án...
              </div>
            </div>
          ) : connectionError ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md text-center">
                <WifiOff className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  Lỗi Kết nối
                </h3>
                <p className="text-red-600 dark:text-red-300 mb-4">
                  Không thể kết nối tới cơ sở dữ liệu. Vui lòng kiểm tra kết nối internet và thử lại.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Thử lại
                </button>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 max-w-md text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Chưa có Dự án nào
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Tạo dự án đầu tiên để bắt đầu tổ chức tài liệu và trò chuyện với AI.
                </p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Tạo Dự án Đầu tiên
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const isActive = currentProjectId === project.id;
                
                return (
                  <div 
                    key={project.id} 
                    className={`group rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border overflow-hidden relative ${
                      isActive 
                        ? 'border-2 shadow-xl ring-2 ring-offset-2' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                    style={isActive ? {
                      borderColor: project.color,
                      background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}08 50%, transparent 100%)`
                    } : {}}
                  >
                    {/* Enlarged Icon Watermark for Active Project */}
                    {isActive && (
                      <div 
                        className="absolute -right-8 -bottom-8 opacity-10 dark:opacity-5 pointer-events-none"
                        style={{ color: project.color }}
                      >
                        <BookOpen className="w-48 h-48" />
                      </div>
                    )}
                    
                    {/* Top Color Bar */}
                    <div className={isActive ? "h-2" : "h-1"} style={{ backgroundColor: project.color }} />
                    
                    <div className="p-6 relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {isActive && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold mb-2" 
                              style={{ 
                                backgroundColor: `${project.color}20`,
                                color: project.color 
                              }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
                              Đang hoạt động
                            </div>
                          )}
                          <Link href={`/notebook?project=${project.id}`}>
                            <h3 className={`text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer hover:underline ${
                              isActive ? 'text-gray-900 dark:text-gray-100 text-xl' : 'text-gray-900 dark:text-gray-100'
                            }`}>
                              {project.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {project.description || 'Không có mô tả'}
                          </p>
                        </div>
                        
                        <div className={`flex items-center gap-1 transition-opacity ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleEditProject(project);
                            }}
                            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                            disabled={isLoading}
                            title="Chỉnh sửa dự án"
                          >
                            <Edit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteProject(project.id);
                            }}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            disabled={isLoading}
                            title="Xóa dự án"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <FileText className="w-4 h-4" />
                          <span>{project.documentsCount} tài liệu</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <MessageSquare className="w-4 h-4" />
                          <span>{project.chatsCount} cuộc trò chuyện</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(project.updatedAt)}</span>
                        </div>
                        
                        <Link href={`/dashboard?project=${project.id}`}>
                          <button 
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              isActive 
                                ? 'text-white' 
                                : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                            }`}
                            style={isActive ? { backgroundColor: project.color } : {}}
                          >
                            {isActive ? 'Đang mở' : 'Mở'}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div 
                onClick={() => setShowCreateModal(true)}
                className="group border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex flex-col items-center justify-center min-h-[200px]"
              >
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Tạo Dự án Mới
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                  Bắt đầu tổ chức tài liệu và trò chuyện với AI
                </p>
              </div>
            </div>
          )}

          {showCreateModal && !connectionError && (
            <CreateProjectModal 
              onClose={() => setShowCreateModal(false)}
              onSubmit={(newProject) => {
                setProjects([newProject, ...projects]);
                setShowCreateModal(false);
              }}
            />
          )}

          {showEditModal && editingProject && !connectionError && (
            <EditProjectModal 
              project={editingProject}
              onClose={() => {
                setShowEditModal(false);
                setEditingProject(null);
              }}
              onSubmit={handleUpdateProject}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default function NotebookPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    }>
      <NotebookPageContent />
    </Suspense>
  );
}

```

### src\app\page.tsx

```tsx
'use client';

import { ArrowRight, Layout, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chatnary</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <button className="px-5 py-2 text-gray-600 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
              Đăng nhập
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
              Đăng ký
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 pb-2">
            Quản lý tài liệu thông minh &<br/>Trò chuyện cùng AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tổ chức tài liệu của bạn theo dự án và khai thác sức mạnh của AI để tìm kiếm, tóm tắt và hỏi đáp trực tiếp.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 shadow-xl">
                Bắt đầu ngay <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                Đã có tài khoản?
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Tổ chức Dự án</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tạo không gian làm việc riêng biệt cho từng dự án, giúp quản lý tài liệu khoa học và dễ dàng.
            </p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">AI Mạnh mẽ</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Sử dụng các mô hình AI tiên tiến nhất để phân tích nội dung và trả lời câu hỏi của bạn ngay lập tức.
            </p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Bảo mật</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Dữ liệu của bạn được mã hóa và bảo vệ an toàn. Nội dung tài liệu chỉ được sử dụng cho mục đích của bạn.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

```

### src\app\quiz\page.tsx

```tsx
"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Button, Card, Loading } from "@/components/ui";
import { useProject } from "@/hooks/useProject";
import { BookOpen, CheckCircle2, Clock, HelpCircle, Play, Trophy } from "lucide-react";
import { Suspense, useState } from "react";

// Mock Data
const MOCK_NOTEBOOKS = [
  { id: '1', title: 'Kiến thức React cơ bản', topic: 'Frontend', questionCount: 15, duration: '15 phút' },
  { id: '2', title: 'Từ vựng IELTS chủ đề Environment', topic: 'English', questionCount: 20, duration: '20 phút' },
  { id: '3', title: 'Lịch sử Việt Nam thế kỷ 20', topic: 'History', questionCount: 10, duration: '10 phút' },
];

const MOCK_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "React Hook nào được sử dụng để quản lý state trong functional component?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1 // Index
  },
  {
    id: 2,
    question: "Hook nào chạy side-effects sau khi render?",
    options: ["useMemo", "useCallback", "useEffect", "useRef"],
    correctAnswer: 2
  }
];

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <Loading size="lg" text="Đang tải Quiz..." />
        </div>
      }
    >
      <QuizPageContent />
    </Suspense>
  );
}

function QuizPageContent() {
  const { project } = useProject();
  const [selectedNotebook, setSelectedNotebook] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Mock Quiz Flow
  if (isPlaying) {
    if (showResult) {
      return (
        <MainLayout headerTitle="Kết quả trắc nghiệm" headerSubtitle="Kết quả bài kiểm tra của bạn">
           <div className="max-w-2xl mx-auto p-6">
              <Card className="text-center py-12 px-6 space-y-6">
                 <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <Trophy className="w-12 h-12 text-yellow-500" />
                 </div>
                 <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Hoàn thành!</h2>
                    <p className="text-gray-500 mt-2">Bạn đã trả lời đúng {score}/{MOCK_QUIZ_QUESTIONS.length} câu hỏi</p>
                 </div>
                 <div className="text-4xl font-extrabold text-blue-600">
                    {Math.round((score / MOCK_QUIZ_QUESTIONS.length) * 100)}%
                 </div>
                 <Button onClick={() => { setIsPlaying(false); setShowResult(false); setCurrentQuestion(0); setScore(0); }}>
                    Quay lại danh sách
                 </Button>
              </Card>
           </div>
        </MainLayout>
      );
    }

    const question = MOCK_QUIZ_QUESTIONS[currentQuestion];

    return (
      <MainLayout headerTitle="Đang làm bài..." headerSubtitle={`Câu hỏi ${currentQuestion + 1}/${MOCK_QUIZ_QUESTIONS.length}`}>
        <div className="max-w-3xl mx-auto p-6">
           <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-gray-500">Thời gian còn lại: 14:32</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500" style={{ width: `${((currentQuestion + 1) / MOCK_QUIZ_QUESTIONS.length) * 100}%` }}></div>
              </div>
           </div>

           <Card className="p-8 mb-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">{question.question}</h3>
              <div className="space-y-3">
                 {question.options.map((option, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 transition-all flex items-center gap-3 group"
                      onClick={() => {
                        if (index === question.correctAnswer) setScore(s => s + 1);
                        if (currentQuestion < MOCK_QUIZ_QUESTIONS.length - 1) {
                           setCurrentQuestion(c => c + 1);
                        } else {
                           setShowResult(true);
                        }
                      }}
                    >
                       <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          {String.fromCharCode(65 + index)}
                       </div>
                       <span className="text-gray-700 dark:text-gray-200">{option}</span>
                    </button>
                 ))}
              </div>
           </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      headerTitle="Trắc nghiệm & Ôn tập"
      headerSubtitle="Tạo bài kiểm tra từ nội dung sổ tay của bạn"
    >
      <div className="p-6 max-w-5xl mx-auto space-y-8">
         {/* Stats */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 flex items-center gap-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
               <div className="p-3 bg-blue-500/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
               </div>
               <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Sổ tay đã tạo</div>
               </div>
            </Card>
            <Card className="p-6 flex items-center gap-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-100 dark:border-green-800">
               <div className="p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
               </div>
               <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">85%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Tỷ lệ đúng trung bình</div>
               </div>
            </Card>
            <Card className="p-6 flex items-center gap-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-100 dark:border-purple-800">
               <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
               </div>
               <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Bài thi tuần này</div>
               </div>
            </Card>
         </div>

         {/* Available Notebooks */}
         <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
               <Play className="w-5 h-5 text-blue-500" />
               Bắt đầu bài kiểm tra mới
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {MOCK_NOTEBOOKS.map((notebook) => (
                  <Card key={notebook.id} className="group hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-blue-500 cursor-pointer" onClick={() => setSelectedNotebook(notebook.id)}>
                     <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                           <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                              {notebook.topic}
                           </span>
                           <HelpCircle className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                           {notebook.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                           <span className="flex items-center gap-1">
                              <HelpCircle className="w-4 h-4" /> {notebook.questionCount} câu
                           </span>
                           <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {notebook.duration}
                           </span>
                        </div>
                        <Button className="w-full mt-2" variant="secondary" onClick={(e) => { e.stopPropagation(); setIsPlaying(true); }}>
                           Làm bài ngay
                        </Button>
                     </div>
                  </Card>
               ))}
            </div>
         </div>
         
      </div>
    </MainLayout>
  );
}

```

### src\app\register\page.tsx

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (!acceptTerms) {
      setError("Vui lòng đồng ý với điều khoản sử dụng");
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({ email, password });

      if (result.success) {
        setSuccess("Đăng ký thành công! Chuyển đến trang đăng nhập...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(result.error || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Register Card */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <img
                src="/logo-192.png"
                alt="Chatnary"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Tạo tài khoản mới
            </h1>
            <p className="text-white/70">Bắt đầu hành trình với Chatnary</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-100 text-sm text-center">
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-100 text-sm text-center">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
              <p className="mt-1 text-xs text-white/50">Ít nhất 6 ký tự</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
              />
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-white/30 bg-white/10 text-teal-500 focus:ring-teal-500/50"
              />
              <span className="text-sm text-white/70">
                Tôi đồng ý với{" "}
                <Link
                  href="/terms"
                  className="text-white underline hover:no-underline"
                >
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link
                  href="/privacy"
                  className="text-white underline hover:no-underline"
                >
                  Chính sách bảo mật
                </Link>
              </span>
            </label>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-white text-teal-700 font-semibold shadow-lg hover:shadow-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-teal-700/30 border-t-teal-700 rounded-full animate-spin" />
                  Đang tạo tài khoản...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/50">
                hoặc đăng ký với
              </span>
            </div>
          </div>

          {/* Social register */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Login link */}
          <p className="mt-8 text-center text-white/70">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="text-white font-semibold hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-white/50 text-sm">
          © 2025 Chatnary. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

```

### src\app\settings\page.tsx

```tsx
'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Button, Card, CardContent, CardHeader, CardTitle, ColorPicker, IconPicker, Input, Loading, Modal, ModalFooter } from '@/components/ui';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useProject } from '@/hooks/useProject';
import apiClient from '@/lib/api';
import { Cloud, CreditCard, HardDrive, Moon, Settings, Sun, User, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface EditedProject {
  name: string;
  description: string;
  color: string;
  icon: string;
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <Loading size="lg" text="Đang tải..." />
        </div>
      }
    >
      <SettingsPageContent />
    </Suspense>
  );
}

function SettingsPageContent() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  // Project Context
  const { project, isLoading: projectLoading, refetch } = useProject();
  const { setProjectName, setProjectColor } = useBreadcrumb();
  
  // Tab State: 'account' | 'project'
  const [activeTab, setActiveTab] = useState<'account' | 'project'>('account');

  // --- Project Logic ---
  const [editedProject, setEditedProject] = useState<EditedProject>({
    name: '', description: '', color: '#3b82f6', icon: 'folder'
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (project) {
      setEditedProject({
        name: project.name || '',
        description: project.description || '',
        color: project.color || '#3b82f6',
        icon: project.icon || 'folder'
      });
      setProjectName(project.name);
      setProjectColor(project.color);
    }
  }, [project, setProjectName, setProjectColor]);

  const handleUpdateProject = async () => {
    if (!project) return;
    setIsUpdating(true);
    setErrorMessage('');
    try {
      const response = await apiClient.updateProject(project.id, editedProject);
      if (response.success) {
        setProjectName(editedProject.name);
        setProjectColor(editedProject.color);
        refetch();
      } else {
        setErrorMessage(response.error || 'Lỗi khi cập nhật project');
      }
    } catch {
      setErrorMessage('Lỗi kết nối đến server');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!project) return;
    setIsDeleting(true);
    setErrorMessage('');
    try {
      const response = await apiClient.deleteProject(project.id);
      if (response.success) {
        router.push('/dashboard');
      } else {
        setErrorMessage(response.error || 'Lỗi khi xóa project');
      }
    } catch {
      setErrorMessage('Lỗi kết nối đến server');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // --- Mock Data for Account ---
  const user = { name: 'Người dùng', email: 'user@example.com', plan: 'Pro Plan', avatar: null };
  const quota = {
    storage: { used: 2.5, total: 10, percent: 25 },
    aiTokens: { used: 150000, total: 1000000, percent: 15 },
    projects: { used: 5, total: 20, percent: 25 }
  };

  return (
    <MainLayout
      headerTitle="Cài đặt"
      headerSubtitle="Quản lý tài khoản và dự án"
      showProjectStats={false}
    >
      <div className="h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'account'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <User className="w-4 h-4" />
              Tài khoản & Ứng dụng
            </button>
            {project && (
              <button
                onClick={() => setActiveTab('project')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'project'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                Cài đặt Project: {project.name}
              </button>
            )}
          </div>

          {/* TAB CONTENT: ACCOUNT */}
          {activeTab === 'account' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Account Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Thông tin cá nhân
                </h2>
                <Card variant="bordered">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                          {user.name.charAt(0)}
                        </div>
                        <Button variant="secondary" size="sm">Đổi ảnh đại diện</Button>
                      </div>
                      <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Họ và tên</label>
                            <Input value={user.name} readOnly />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <Input value={user.email} readOnly />
                          </div>
                        </div>
                        <div className="mt-1 flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <span className="font-semibold text-blue-900 dark:text-blue-100">{user.plan}</span>
                          </div>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Nâng cấp</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quota */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-purple-500" />
                  Dung lượng & Giới hạn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Reuse Quota Cards from previous turn */}
                  <Card variant="bordered">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><HardDrive className="w-6 h-6 text-gray-600 dark:text-gray-400" /></div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Lưu trữ</span>
                      </div>
                      <div className="mb-2 flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{quota.storage.used}GB</span>
                        <span className="text-sm text-gray-500">/ {quota.storage.total}GB</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${quota.storage.percent}%` }}></div>
                      </div>
                    </CardContent>
                  </Card>
                   <Card variant="bordered">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg"><Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" /></div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">AI Tokens</span>
                      </div>
                      <div className="mb-2 flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">150K</span>
                        <span className="text-sm text-gray-500">/ 1M</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${quota.aiTokens.percent}%` }}></div>
                      </div>
                    </CardContent>
                  </Card>
                   <Card variant="bordered">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg"><Settings className="w-6 h-6 text-green-600 dark:text-green-400" /></div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Dự án</span>
                      </div>
                      <div className="mb-2 flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{quota.projects.used}</span>
                        <span className="text-sm text-gray-500">/ {quota.projects.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                         <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${quota.projects.percent}%` }}></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* App Settings */}
               <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-500" />
                  Cài đặt ứng dụng
                </h2>
                <Card variant="bordered">
                  <CardContent className="p-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Giao diện (Theme)
                      </label>
                      <div className="grid grid-cols-3 gap-4 max-w-xl">
                        {(['light', 'dark', 'system'] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                              theme === t
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                          >
                           {t === 'light' ? <Sun className="w-6 h-6 text-amber-500" /> : t === 'dark' ? <Moon className="w-6 h-6 text-indigo-500" /> : <Settings className="w-6 h-6 text-gray-500" />}
                            <span className="text-sm font-medium capitalize">{t === 'light' ? 'Sáng' : t === 'dark' ? 'Tối' : 'Hệ thống'}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* TAB CONTENT: PROJECT */}
          {activeTab === 'project' && project && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Thông tin Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {errorMessage && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-red-800 dark:text-red-200 text-sm">{errorMessage}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Input
                        label="Tên project"
                        value={editedProject.name}
                        onChange={(e) => setEditedProject(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Nhập tên project"
                        disabled={isUpdating}
                      />
                      <Input
                        label="Mô tả project"
                        value={editedProject.description}
                        onChange={(e) => setEditedProject(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Mô tả ngắn gọn về project"
                        disabled={isUpdating}
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Màu sắc project</label>
                        <ColorPicker
                          value={editedProject.color}
                          onChange={(color) => setEditedProject(prev => ({ ...prev, color }))}
                          disabled={isUpdating}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Biểu tượng project</label>
                        <IconPicker
                          value={editedProject.icon}
                          onChange={(icon) => setEditedProject(prev => ({ ...prev, icon }))}
                          disabled={isUpdating}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button onClick={handleUpdateProject} disabled={isUpdating || !editedProject.name.trim()}>
                      {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card variant="bordered" className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Vùng nguy hiểm</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Xóa project</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Xóa vĩnh viễn project và tất cả dữ liệu liên quan</p>
                    </div>
                    <Button variant="danger" onClick={() => setShowDeleteModal(true)} disabled={isDeleting}>
                      {isDeleting ? 'Đang xóa...' : 'Xóa project'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

       {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Xác nhận xóa project"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
             <div className="flex items-start gap-3">
               <div className="text-red-600 dark:text-red-400 mt-1">⚠️</div>
               <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-200">Hành động này không thể hoàn tác</h3>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">Việc xóa project sẽ xóa vĩnh viễn tất cả dữ liệu.</p>
               </div>
             </div>
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-300">Nhập tên project <span className="font-semibold">{project?.name}</span> để xác nhận:</p>
            <input
              type="text"
              placeholder={project?.name}
              className="w-full mt-2 px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
              onChange={(e) => {
                 const confirmButton = document.getElementById('confirm-delete') as HTMLButtonElement;
                 if (confirmButton) confirmButton.disabled = e.target.value !== project?.name;
              }}
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          <Button id="confirm-delete" variant="danger" onClick={handleDeleteProject} disabled={true}>
             {isDeleting ? 'Đang xóa...' : 'Xóa project'}
          </Button>
        </ModalFooter>
      </Modal>

    </MainLayout>
  );
}

```

### src\components\auth\AuthGuard.tsx

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

/**
 * AuthGuard - Protects routes that require authentication
 *
 * Usage:
 * <AuthGuard>
 *   <ProtectedContent />
 * </AuthGuard>
 */
export function AuthGuard({
  children,
  fallback,
  redirectTo = "/login",
}: AuthGuardProps) {
  // ========================================
  // 🔓 BYPASS LOGIN - TẠM THỜI DISABLE AUTH
  // TODO: Uncomment code bên dưới để bật lại authentication
  // ========================================
  return <>{children}</>;

  // const { isAuthenticated, isLoading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push(redirectTo);
  //   }
  // }, [isAuthenticated, isLoading, router, redirectTo]);

  // // Show loading state
  // if (isLoading) {
  //   return fallback || <AuthLoadingFallback />;
  // }

  // // Not authenticated - redirect is happening
  // if (!isAuthenticated) {
  //   return fallback || <AuthLoadingFallback />;
  // }

  // // Authenticated - render children
  // return <>{children}</>;
}

/**
 * Default loading fallback
 */
function AuthLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">
          Đang kiểm tra xác thực...
        </p>
      </div>
    </div>
  );
}

/**
 * GuestGuard - Protects routes that should only be accessible to guests (not logged in)
 *
 * Usage:
 * <GuestGuard>
 *   <LoginPage />
 * </GuestGuard>
 */
export function GuestGuard({
  children,
  redirectTo = "/dashboard",
}: Omit<AuthGuardProps, "fallback">) {
  // ========================================
  // 🔓 BYPASS LOGIN - TẠM THỜI DISABLE AUTH
  // TODO: Uncomment code bên dưới để bật lại authentication
  // ========================================
  return <>{children}</>;

  // const { isAuthenticated, isLoading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && isAuthenticated) {
  //     router.push(redirectTo);
  //   }
  // }, [isAuthenticated, isLoading, router, redirectTo]);

  // // Show loading state
  // if (isLoading) {
  //   return <AuthLoadingFallback />;
  // }

  // // Authenticated - redirect is happening
  // if (isAuthenticated) {
  //   return <AuthLoadingFallback />;
  // }

  // // Not authenticated - render children
  // return <>{children}</>;
}

export default AuthGuard;

```

### src\components\chat\ChatInput.tsx

```tsx
'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled, placeholder = 'Nhập câu hỏi của bạn...' }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-3">
      {/* AI Indicator */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full border border-blue-200/50 dark:border-blue-700/50">
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Chatnary AI</span>
        </div>
      </div>
      
      <div className="relative bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700/50 rounded-3xl shadow-lg border border-gray-200/60 dark:border-gray-600/60 backdrop-blur-sm">
        <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-6 py-3 pr-14 bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none resize-none min-h-[48px] max-h-32 rounded-3xl font-medium"
            style={{ overflowY: message.length > 100 ? 'auto' : 'hidden' }}
          />
          
          {/* AI Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="absolute right-2.5 bottom-2.5 w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {disabled ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            )}
          </button>
        </div>
      
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 text-center select-none">
        Nhấn <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">Enter</kbd> để gửi • 
        <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono ml-1">Shift + Enter</kbd> để xuống dòng
      </p>
    </div>
  );
}


```

### src\components\chat\ChatListItem.tsx

```tsx
'use client';

import { ChatSession } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import ChatRenameModal from './ChatRenameModal';

interface ChatListItemProps {
  chat: ChatSession;
  isActive: boolean;
  onUpdate: (updatedChat: ChatSession) => void;
  onDelete: (chatId: string) => void;
}

export default function ChatListItem({ chat, isActive, onUpdate, onDelete }: ChatListItemProps) {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsRenameModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onDelete(chat.id);
  };

  const handleUpdate = (updatedChat: ChatSession) => {
    onUpdate(updatedChat);
  };

  const content = (
    <>
      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      
      <span className="truncate flex-1">{chat.title}</span>
      
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
        <button
          onClick={handleEditClick}
          className="p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-all"
          aria-label="Sửa tên chat"
        >
          <svg className="w-3.5 h-3.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={handleDeleteClick}
          className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
          aria-label="Xóa chat"
        >
          <svg className="w-3.5 h-3.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </>
  );

  const className = cn(
    'group flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm',
    isActive
      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
  );

  return (
    <>
      <Link href={projectId ? `/chat/${chat.id}?project=${projectId}` : `/chat/${chat.id}`} className={className}>
        {content}
      </Link>
      
      <ChatRenameModal
        isOpen={isRenameModalOpen}
        chat={chat}
        onClose={() => setIsRenameModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </>
  );
}
```

### src\components\chat\ChatMessage.tsx

```tsx
'use client';

import { Message } from '@/lib/types';
import { copyToClipboard, formatDateTime } from '@/lib/utils';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CitationCard from './CitationCard';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [showCitations, setShowCitations] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Message Content */}
      <div className={`${isUser ? 'max-w-[70%]' : 'w-full'}`}>
        <div
          className={`${
            isUser
              ? 'bg-gray-100 dark:bg-gray-800 rounded-2xl px-5 py-3'
              : 'px-0 py-1'
          }`}
        >
          {isUser ? (
            <div className="text-[15px] leading-7 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
              {message.content}
            </div>
          ) : (
            <div className="markdown-content text-[15px] leading-7 text-gray-900 dark:text-gray-100">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({children}) => <p className="my-4 first:mt-0 last:mb-0">{children}</p>,
                  h1: ({children}) => <h1 className="text-2xl font-semibold mt-6 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-semibold mt-6 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-semibold mt-6 mb-4">{children}</h3>,
                  code: ({inline, children, ...props}: any) => 
                    inline ? (
                      <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 font-mono text-sm" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props}>
                        {children}
                      </code>
                    ),
                  pre: ({children}) => <pre className="my-4">{children}</pre>,
                  ul: ({children}) => <ul className="my-4 list-disc list-inside space-y-1">{children}</ul>,
                  ol: ({children}) => <ol className="my-4 list-decimal list-inside space-y-1">{children}</ol>,
                  // ReactMarkdown ensures li is wrapped in ul/ol
                  li: ({children}) => <span className="block my-1">{children}</span>,
                  a: ({children, href}) => (
                    <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  strong: ({children}) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Sources - Only for AI messages - Icon First Design */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-4">
              {/* Compact citation trigger */}
              <button
                onClick={() => setShowCitations(!showCitations)}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-200 text-sm"
              >
                <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  {message.sources.length} nguồn
                </span>
                <svg 
                  className={`w-3 h-3 text-blue-600 dark:text-blue-400 transition-transform ${showCitations ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded citations */}
              {showCitations && (
                <div className="mt-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
                  {message.sources.map((source, idx) => (
                    <CitationCard 
                      key={`${source.documentId}-${source.chunkId}-${idx}`}
                      source={source} 
                      index={idx} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Metadata - Actions for AI messages */}
        {!isUser && (
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={copied ? 'Đã copy' : 'Copy'}
            >
              {copied ? (
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDateTime(message.createdAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}


```

### src\components\chat\ChatNotFound.tsx

```tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ErrorPage from '../ui/ErrorPage';

export default function ChatNotFound() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');

  const handleCreateNewChat = () => {
    const url = projectId ? `/chat?project=${projectId}` : '/chat';
    router.push(url);
  };

  return (
    <ErrorPage
      title="Cuộc trò chuyện không tồn tại"
      message="Cuộc trò chuyện này có thể đã bị xóa hoặc bạn không có quyền truy cập. Bạn có thể tạo cuộc trò chuyện mới hoặc quay lại danh sách chat."
      statusCode={404}
      actionButton={{
        text: "🚀 Tạo cuộc trò chuyện mới",
        onClick: handleCreateNewChat,
        variant: 'primary'
      }}
      showBackButton={true}
      showHomeButton={true}
    />
  );
}
```

### src\components\chat\ChatRenameModal.tsx

```tsx
'use client';

import { chatsApi } from '@/lib/api';
import { ChatSession } from '@/lib/types';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, ModalFooter } from '../ui';

interface ChatRenameModalProps {
  isOpen: boolean;
  chat: ChatSession | null;
  onClose: () => void;
  onUpdate: (updatedChat: ChatSession) => void;
}

export default function ChatRenameModal({ isOpen, chat, onClose, onUpdate }: ChatRenameModalProps) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && chat) {
      setTitle(chat.title);
      setError('');
      // Focus input after modal opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 100);
    }
  }, [isOpen, chat]);

  const handleSave = async () => {
    if (!chat || !title.trim()) {
      setError('Tên chat không được để trống');
      return;
    }

    if (title.trim() === chat.title) {
      onClose();
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await chatsApi.updateChat(chat.id, { title: title.trim() });
      if (response.success && response.data) {
        onUpdate(response.data);
        onClose();
      } else {
        setError(response.error || 'Có lỗi xảy ra khi cập nhật tên chat');
      }
    } catch (error) {
      console.error('Error updating chat title:', error);
      setError('Có lỗi xảy ra khi cập nhật tên chat');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  if (!chat) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đổi tên cuộc trò chuyện">
      <div className="space-y-4">
        <div>
          <label htmlFor="chat-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tên cuộc trò chuyện
          </label>
          <input
            ref={inputRef}
            id="chat-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50"
            placeholder="Nhập tên cuộc trò chuyện..."
            maxLength={100}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      </div>
      
      <ModalFooter>
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? 'Đang lưu...' : 'Lưu'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
```

### src\components\chat\CitationCard.tsx

```tsx
'use client';

import { SourceCitation } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { useState } from 'react';

interface CitationCardProps {
  source: SourceCitation;
  index: number;
}

export default function CitationCard({ source, index }: CitationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(source.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleViewDocument = () => {
    window.open(`/documents/${source.documentId}?page=${source.pageNumber}`, '_blank');
  };

  return (
    <div className="group p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg border border-gray-200/60 dark:border-gray-700/60 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
            <svg className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
              {source.documentName}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                P.{source.pageNumber}
              </span>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  source.score > 0.8 ? 'bg-green-400' : 
                  source.score > 0.6 ? 'bg-yellow-400' : 'bg-orange-400'
                }`}></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(source.score * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 opacity-60">
            #{index + 1}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Copy trích dẫn"
            >
              {copied ? (
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <button
              onClick={handleViewDocument}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Mở tài liệu"
            >
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Compact Content Preview */}
      <blockquote className="border-l-2 border-blue-300 dark:border-blue-600 pl-3 py-1">
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic line-clamp-2">
          &quot;{source.content}&quot;
        </p>
      </blockquote>
    </div>
  );
}
```

### src\components\chat\SuggestionChips.tsx

```tsx
'use client';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                   text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-700
                   transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}


```

### src\components\document\DocumentCard.tsx

```tsx
'use client';

import { Button, FileIcon, Modal, ModalFooter } from '@/components/ui';
import { Document } from '@/lib/types';
import { formatDate, formatFileSize } from '@/lib/utils';
import { useState } from 'react';

interface DocumentCardProps {
  document: Document;
  onDelete?: (id: string) => void;
  onChat?: (id: string) => void;
}

export default function DocumentCard({ document, onDelete, onChat }: DocumentCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    onDelete?.(document.id);
    setShowDeleteModal(false);
  };

  const handleChat = () => {
    onChat?.(document.id);
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all">
        {/* File Icon */}
        <div className="flex items-start gap-3">
          <FileIcon 
            fileType={document.mimeType || 'unknown'}
            size="lg"
          />
          
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate mb-1">
              {document.originalFilename || document.name}
            </h3>
            
            {/* Meta */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>{formatFileSize(document.fileSize || 0)}</span>
              <span>•</span>
              <span>{formatDate(document.createdAt || document.updatedAt || '')}</span>
            </div>
            
            {/* Status & Info */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                document.status === 'processed'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : document.status === 'processing'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : document.status === 'uploading'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {document.status === 'processed' ? 'Hoàn tất' :
                 document.status === 'processing' ? 'Đang xử lý' : 
                 document.status === 'uploading' ? 'Đang upload' : 'Thất bại'}
              </span>
              {/* Metadata removed for now - not available in current Document interface */}
            </div>
          </div>
          
          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Menu tài liệu"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-20">
                  {document.status === 'processed' && (
                    <button
                      onClick={handleChat}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Chat với tài liệu
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowDeleteModal(true);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Xóa
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Actions on hover */}
        {document.status === 'processed' && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="outline"
              onClick={handleChat}
              className="w-full"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat ngay
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Xác nhận xóa"
        size="sm"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bạn có chắc chắn muốn xóa tài liệu <strong>{document.originalFilename || document.name}</strong>?
          Hành động này không thể hoàn tác.
        </p>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}


```

### src\components\document\DocumentControls.tsx

```tsx
import { FilterState } from '@/hooks/useDocumentFilters';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DocumentControlsProps {
  // Filters
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export default function DocumentControls({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  currentPage,
  totalPages,
  totalDocuments,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: DocumentControlsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close popup logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current && !settingsRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Pagination Simple Controls (Prev/Next) */}
      <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-2">
         <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
         </button>
         <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
            {currentPage} / {Math.max(1, totalPages)}
         </span>
         <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
         </button>
      </div>

      {/* Filter Settings Button with Popover */}
      <div className="relative">
        <button
          ref={triggerRef}
          onClick={() => setShowSettings(!showSettings)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            showSettings || hasActiveFilters
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          )}
        >
          <Settings className="w-4 h-4" />
          <span>Bộ lọc</span>
          {hasActiveFilters && (
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
          )}
        </button>

        {showSettings && (
          <div 
            ref={settingsRef}
            className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          >
             <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Cài đặt hiển thị</h3>
                  {hasActiveFilters && (
                    <button onClick={onClearFilters} className="text-xs text-red-500 hover:text-red-600">
                      Xóa bộ lọc
                    </button>
                  )}
                </div>

                {/* Items per page */}
                <div className="space-y-2">
                   <label className="text-xs font-medium text-gray-500 uppercase">Số dòng / trang</label>
                   <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 20, 50].map(n => (
                        <button
                          key={n}
                          onClick={() => onItemsPerPageChange(n)}
                          className={cn(
                            "px-2 py-1 text-xs rounded border transition-colors",
                            itemsPerPage === n 
                              ? "bg-blue-500 text-white border-blue-500" 
                              : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          )}
                        >
                          {n}
                        </button>
                      ))}
                   </div>
                </div>

                {/* File Type */}
                <div className="space-y-2">
                   <label className="text-xs font-medium text-gray-500 uppercase">Loại file</label>
                   <select 
                      value={filters.fileType}
                      onChange={(e) => onFilterChange('fileType', e.target.value)}
                      className="w-full text-sm p-2 rounded border border-gray-200 dark:border-gray-600 bg-transparent"
                    >
                      <option value="">Tất cả</option>
                      <option value="pdf">PDF</option>
                      <option value="docx">Word</option>
                      <option value="xlsx">Excel</option>
                      <option value="txt">Text</option>
                      <option value="image">Image</option>
                   </select>
                </div>
                 
                 {/* Sort */}
                 <div className="space-y-2">
                   <label className="text-xs font-medium text-gray-500 uppercase">Sắp xếp</label>
                   <div className="flex gap-2">
                      <select 
                        value={filters.sortBy}
                        onChange={(e) => onFilterChange('sortBy', e.target.value)}
                        className="flex-1 text-sm p-2 rounded border border-gray-200 dark:border-gray-600 bg-transparent"
                      >
                        <option value="uploadedAt">Ngày upload</option>
                        <option value="name">Tên</option>
                        <option value="size">Kích thước</option>
                      </select>
                      <button 
                        onClick={() => onFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="p-2 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50"
                      >
                        {filters.sortOrder === 'asc' ? '↑' : '↓'}
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

```

### src\components\document\DocumentList.tsx

```tsx
'use client';

import { FileIcon } from '@/components/ui';
import { type Document } from '@/lib/types';
import { cn, formatDate, formatFileSize } from '@/lib/utils';

interface DocumentListProps {
  documents: Document[]; // Current page documents
  selectedDocument?: Document | null;
  onSelectDocument: (document: Document) => void;
  onDeleteDocument?: (documentId: string) => void;
  isPanelCollapsed?: boolean;
}

export default function DocumentList({ 
  documents, 
  selectedDocument, 
  onSelectDocument,
  onDeleteDocument,
  isPanelCollapsed = false,
}: DocumentListProps) {
  
  // Handle document selection
  const handleSelectDocument = (document: Document) => {
    onSelectDocument(document);
  };

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 flex flex-col document-list-scroll transition-all duration-300 h-full",
      isPanelCollapsed ? "w-full" : "w-1/2"
    )}>
      {/* Document Content */}
      <div className="flex-1 overflow-y-auto">
        {!isPanelCollapsed ? (
          // List View (Panel Open)
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {documents.map((document) => (
              <div
                key={document.id}
                className={cn(
                  'document-list-item p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700',
                  selectedDocument?.id === document.id && 'document-list-item selected bg-blue-50 dark:bg-blue-900/20'
                )}
                onClick={() => handleSelectDocument(document)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <FileIcon fileType={document.mimeType || 'unknown'} size="md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {document.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{formatFileSize(document.fileSize || 0)}</span>
                          <span>•</span>
                          <span>{formatDate(document.createdAt)}</span>
                          <span>•</span>
                          <span className={cn(
                            'px-2 py-1 rounded-full',
                            document.status === 'processed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : document.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          )}>
                            {document.status === 'processed' ? 'Đã xử lý' : 
                             document.status === 'processing' ? 'Đang xử lý' : 'Lỗi'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-start gap-1 ml-2">
                     {onDeleteDocument && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDocument(document.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Xóa"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grid View (Panel Collapsed)
          <div className="p-4">
            <div className={cn(
              "grid gap-4",
              "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            )}>
              {documents.map((document) => (
                <div
                  key={document.id}
                  className={cn(
                    'cursor-pointer border rounded-lg p-4 transition-all duration-200 hover:shadow-md group',
                    selectedDocument?.id === document.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                  onClick={() => handleSelectDocument(document)}
                >
                  <div className="flex justify-center mb-3">
                    <FileIcon fileType={document.mimeType || 'unknown'} size="lg" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                      {document.name}
                    </h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      <div>{formatFileSize(document.fileSize || 0)}</div>
                      <div>{formatDate(document.createdAt)}</div>
                    </div>
                    <span className={cn(
                        'inline-block px-2 py-1 text-xs rounded-full',
                        document.status === 'processed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : document.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      )}>
                      {document.status === 'processed' ? 'Đã xử lý' :
                       document.status === 'processing' ? 'Đang xử lý' : 'Lỗi'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {documents.length === 0 && (
          <div className="flex items-center justify-center h-64">
             <div className="text-center text-gray-500 dark:text-gray-400">
              <p>Không có tài liệu nào trong trang này</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### src\components\document\DocumentViewer.tsx

```tsx
'use client';

import { Button } from '@/components/ui';
import apiClient from '@/lib/api';
import { Document } from '@/lib/types';
import { formatDate, formatFileSize } from '@/lib/utils';
import { useState } from 'react';

interface DocumentViewerProps {
  document: Document | null;
  onClose: () => void;
}

export default function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Handle download
  const handleDownload = () => {
    if (document) {
      const downloadUrl = apiClient.getDocumentDownloadUrl(document.id);
      const link = window.document.createElement('a');
      link.href = downloadUrl;
      link.download = document.originalFilename || document.name;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
  };

  if (!document) {
    return (
      <div className="w-1/2 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-lg font-medium">Chọn tài liệu để xem</p>
          <p className="text-sm mt-1">Click vào một tài liệu bên trái để xem nội dung</p>
        </div>
      </div>
    );
  }

  const fileType = document.mimeType?.toLowerCase() || '';
  const displayName = document.originalFilename || document.name;

  const canPreview = fileType.includes('pdf') || fileType.includes('image');

  return (
    <div className="w-1/2 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {displayName}
          </h2>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto">
        {canPreview ? (
          <div className="p-4">
            {fileType.includes('pdf') && (
              <iframe
                src={apiClient.getDocumentPreviewUrl(document.id)}
                title={`Preview of ${displayName}`}
                className="w-full h-96 border border-gray-200 dark:border-gray-700 rounded"
                onLoad={() => setIsLoading(false)}
              />
            )}
            {fileType.includes('image') && (
              <img
                src={apiClient.getDocumentPreviewUrl(document.id)}
                alt={displayName}
                className="max-w-full h-auto rounded border border-gray-200 dark:border-gray-700"
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Không thể xem trước
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Định dạng tài liệu này không hỗ trợ xem trước trực tiếp
            </p>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Tải xuống
            </Button>
          </div>
        )}
      </div>

      {/* Document Info */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
          Thông tin tài liệu
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Tên file:</span>
            <span className="text-gray-900 dark:text-gray-100 truncate max-w-48" title={displayName}>
              {displayName}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Kích thước:</span>
            <span className="text-gray-900 dark:text-gray-100">
              {formatFileSize(document.fileSize || 0)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Trạng thái:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              document.status === 'processed'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : document.status === 'processing'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : document.status === 'uploading'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {document.status === 'processed' ? 'Đã xử lý' :
               document.status === 'processing' ? 'Đang xử lý' :
               document.status === 'uploading' ? 'Đang upload' : 'Lỗi'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Tải lên:</span>
            <span className="text-gray-900 dark:text-gray-100">
              {formatDate(document.createdAt || document.updatedAt || '')}
            </span>
          </div>

          {/* Metadata removed - not available in current Document interface */}
        </div>

        {/* Action Buttons section removed - no more chat button */}
      </div>
    </div>
  );
}
```

### src\components\document\FileUploadZone.tsx

```tsx
'use client';

import { Button } from '@/components/ui';
import { formatFileSize, isValidFileSize, isValidFileType } from '@/lib/utils';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';

interface FileUploadZoneProps {
  onUpload: (file: File) => void;
  onMultipleUpload?: (files: File[]) => void;
  isUploading?: boolean;
  allowMultiple?: boolean;
}

export default function FileUploadZone({ onUpload, onMultipleUpload, isUploading, allowMultiple = false }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!isValidFileType(file.type)) {
      setError('Định dạng file không được hỗ trợ. Vui lòng chọn PDF, DOCX, TXT hoặc MD.');
      return false;
    }

    if (!isValidFileSize(file.size)) {
      setError(`File quá lớn. Kích thước tối đa là ${formatFileSize(50 * 1024 * 1024)}.`);
      return false;
    }

    return true;
  };

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    console.log('FileUploadZone: Files selected:', fileArray.map(f => ({ 
      name: f.name, 
      size: f.size, 
      type: f.type 
    })));
    
    if (allowMultiple && onMultipleUpload) {
      // Multiple file upload mode
      const validFiles: File[] = [];
      const errors: string[] = [];
      
      fileArray.forEach(file => {
        if (validateFile(file)) {
          validFiles.push(file);
        } else {
          errors.push(`${file.name}: ${error}`);
        }
      });
      
      if (validFiles.length > 0) {
        console.log('FileUploadZone: Valid files for multiple upload:', validFiles.length);
        onMultipleUpload(validFiles);
        
        // Show errors for invalid files if any
        if (errors.length > 0) {
          setError(`Một số file không hợp lệ: ${errors.join(', ')}`);
        }
      } else {
        console.log('FileUploadZone: No valid files for multiple upload');
      }
    } else {
      // Single file upload mode
      const file = fileArray[0];
      if (file && validateFile(file)) {
        console.log('FileUploadZone: File validation passed, calling onUpload');
        onUpload(file);
      } else {
        console.log('FileUploadZone: File validation failed');
      }
    }
    
    // Clear the file input after upload
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFile = (file: File) => {
    handleFiles([file]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragOver
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.md"
          onChange={handleFileSelect}
          disabled={isUploading}
          multiple={allowMultiple}
          aria-label={allowMultiple ? "Chọn file để tải lên (có thể chọn nhiều)" : "Chọn file để tải lên"}
        />

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
              {isDragOver 
                ? (allowMultiple ? 'Thả file tại đây' : 'Thả file tại đây')
                : (allowMultiple ? 'Kéo thả file hoặc click để chọn (có thể chọn nhiều)' : 'Kéo thả file hoặc click để chọn')
              }
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hỗ trợ: PDF, DOCX, TXT, MD (tối đa 50MB{allowMultiple ? ' mỗi file' : ''})
            </p>
          </div>

          {!isUploading && (
            <Button 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent div click
                handleClick();
              }}
            >
              {allowMultiple ? 'Chọn nhiều file' : 'Chọn file'}
            </Button>
          )}

          {isUploading && (
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Đang upload...</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}


```

### src\components\layout\AppLayout.tsx

```tsx
'use client';

import { useSidebar } from '@/contexts/SidebarContext';
import { usePathname } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import GlobalHeader from './GlobalHeader';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { sidebarWidth, isCollapsed } = useSidebar();
  const pathname = usePathname();

  // Define routes that should NOT have the main layout structure (No Sidebar/Header)
  const isAuthPage = pathname?.startsWith('/auth');
  const isLandingPage = pathname === '/';
  
  const shouldHideLayout = isAuthPage || isLandingPage;

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Global Header */}
      <Suspense fallback={<div className="h-12 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" />}>
        <GlobalHeader />
      </Suspense>
      
      {/* Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        <Suspense fallback={<div className="w-[300px] border-r bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" />}>
          <Sidebar />
        </Suspense>
        <main 
          style={{ marginLeft: isCollapsed ? '64px' : `${sidebarWidth}px` }} 
          className="flex-1 transition-[margin] duration-200 flex flex-col overflow-hidden w-full"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

```

### src\components\layout\Breadcrumb.tsx

```tsx
'use client';

import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { cn } from '@/lib/utils';
import { ChevronRight, Edit2, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BreadcrumbProps {
  className?: string;
  showProjectName?: boolean;
}

export default function Breadcrumb({ className, showProjectName = true }: BreadcrumbProps) {
  const { breadcrumbs, projectName, projectColor } = useBreadcrumb();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');

  const handleProjectEdit = () => {
    // Redirect to settings page where project management UI exists with project context
    const settingsUrl = projectId ? `/settings?project=${projectId}` : '/settings';
    window.location.href = settingsUrl;
  };

  // Chỉ hiển thị khi có breadcrumb hoặc có project name
  if (breadcrumbs.length === 0 && !projectName) {
    return null;
  }

  return (
    <nav 
      className={cn(
        'flex items-center gap-2 px-6 py-1.5 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700',
        className
      )}
      aria-label="Breadcrumb"
    >
      <div className="flex items-center justify-between w-full">
        {/* Left side - Project name with breadcrumbs */}
        <div className="flex items-center gap-2">
          {/* Project name as first breadcrumb item */}
          {showProjectName && projectName && (
            <div className="flex items-center text-sm">
              <div 
                className="flex items-center px-3 py-1.5 rounded-lg font-medium shadow-sm bg-transparent border-2 group cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden"
                style={{ 
                  borderColor: projectColor || '#3b82f6',
                  color: projectColor || '#3b82f6'
                }}
              >
                <span className="whitespace-nowrap">{projectName}</span>
                <div className="overflow-hidden transition-all duration-200 w-0 group-hover:w-3 group-hover:ml-1">
                  <button
                    onClick={handleProjectEdit}
                    className="transition-all duration-200 hover:scale-110 w-full h-3 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    title="Chỉnh sửa thông tin project"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              {breadcrumbs.length > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
              )}
            </div>
          )}

          {/* Regular breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li key={index} className="flex items-center">
                    {breadcrumb.href && !isLast ? (
                      <Link 
                        href={breadcrumb.href}
                        className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                      >
                        {breadcrumb.icon}
                        <span>{breadcrumb.label}</span>
                      </Link>
                    ) : (
                      <span 
                        className={cn(
                          'flex items-center gap-1.5',
                          breadcrumb.isActive 
                            ? 'text-gray-900 dark:text-gray-100 font-medium' 
                            : 'text-gray-600 dark:text-gray-400'
                        )}
                      >
                        {breadcrumb.icon}
                        <span>{breadcrumb.label}</span>
                      </span>
                    )}

                    {!isLast && (
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
        
        {/* Right side - Navigate to project selection */}
        <div className="flex items-center text-sm">
          <Link href="/">
            <button 
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Quay về trang chọn project"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Chọn project</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

### src\components\layout\ChatSidebar.tsx

```tsx
"use client";

import { useChats } from '@/contexts/ChatContext';
import { chatsApi } from '@/lib/api';
import { ChatSession } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ChatListItem from '../chat/ChatListItem';
import { Button, Modal, ModalFooter, Toast } from '../ui';

// Helper function to group chats
function groupChatsByTime(chats: ChatSession[]) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recent: ChatSession[] = [];
  const older: ChatSession[] = [];

  chats.forEach((chat) => {
    const chatDate = new Date(chat.updatedAt);
    if (chatDate >= sevenDaysAgo) {
      recent.push(chat);
    } else {
      older.push(chat);
    }
  });

  return { recent, older };
}

export default function ChatSidebar() {
  const pathname = usePathname();
  const { chats, loading, updateChat, removeChat } = useChats();
  const [displayLimit, setDisplayLimit] = useState(20);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    chatId: string | null;
  }>({
    isOpen: false,
    chatId: null,
  });

  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    visible: false,
    message: "",
    type: "success",
  });
  
  const searchParams = useSearchParams();
  const currentProjectId = searchParams.get("project");

  const handleDeleteChat = async () => {
    if (!deleteModal.chatId) return;

    try {
      const response = await chatsApi.deleteChat(deleteModal.chatId);
      if (response.success) {
        removeChat(deleteModal.chatId);
        setDeleteModal({ isOpen: false, chatId: null });

        // Show success toast
        setToast({
          visible: true,
          message: "Đã xóa cuộc trò chuyện thành công",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);

      // Show error toast
      setToast({
        visible: true,
        message: "Không thể xóa cuộc trò chuyện. Vui lòng thử lại.",
        type: "error",
      });
    }
  };

  // Filter chats by search term
  const filteredChats = searchTerm
    ? chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : chats;

  const { recent, older } = groupChatsByTime(
    filteredChats.slice(0, displayLimit)
  );
  const hasMore = filteredChats.length > displayLimit;

  return (
    <>
      <div className="w-64 h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
        {/* New Chat Button */}
        <div className="p-3">
          <Link
            href={
              currentProjectId
                ? `/chat?project=${currentProjectId}`
                : "/chat"
            }
          >
            <button className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 text-white hover:from-violet-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:shadow-violet-500/20 transform hover:scale-[1.02] border border-white/10 backdrop-blur-sm relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400/15 via-purple-400/15 to-indigo-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon consistent with nav items */}
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-90 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>

              {/* Text consistent with nav items */}
              <span className="relative z-10 font-medium">
                Tạo Chat mới
              </span>

              {/* Subtle sparkle effects */}
              <div className="absolute top-1.5 right-2 w-0.5 h-0.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-ping delay-0"></div>
              <div className="absolute bottom-1.5 right-3 w-1 h-1 bg-yellow-200/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse delay-200"></div>
            </button>
          </Link>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-3">
            <button
              onClick={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <span>Lịch sử chat</span>
              <svg
                className={cn(
                  "w-4 h-4 transition-transform",
                  isHistoryCollapsed && "-rotate-90"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {!isHistoryCollapsed && (
              <>
                {/* Search Input */}
                <div className="py-2">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-2 w-4 h-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label="Xóa tìm kiếm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {loading ? (
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    Đang tải...
                  </div>
                ) : filteredChats.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    {searchTerm ? "Không tìm thấy" : "Chưa có chat nào"}
                  </div>
                ) : (
                  <div className="space-y-4 mt-2">
                    {/* Recent Chats */}
                    {recent.length > 0 && (
                      <div>
                        <h4 className="px-3 mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
                          Gần đây
                        </h4>
                        <div className="space-y-0.5">
                          {recent.map((chat) => {
                            const isActive = pathname === `/chat/${chat.id}`;

                            return (
                              <ChatListItem
                                key={chat.id}
                                chat={chat}
                                isActive={isActive}
                                onUpdate={updateChat}
                                onDelete={(chatId) =>
                                  setDeleteModal({ isOpen: true, chatId })
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Older Chats */}
                    {older.length > 0 && (
                      <div>
                        <h4 className="px-3 mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
                          Trước đây
                        </h4>
                        <div className="space-y-0.5">
                          {older.map((chat) => {
                            const isActive = pathname === `/chat/${chat.id}`;

                            return (
                              <ChatListItem
                                key={chat.id}
                                chat={chat}
                                isActive={isActive}
                                onUpdate={updateChat}
                                onDelete={(chatId) =>
                                  setDeleteModal({ isOpen: true, chatId })
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Load More Button */}
                    {hasMore && (
                      <div>
                        <button
                          onClick={() => setDisplayLimit((prev) => prev + 20)}
                          className="w-full px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          Tải thêm...
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(209 213 219 / 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(156 163 175 / 0.7);
        }

        :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(75 85 99 / 0.5);
        }

        :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(107 114 128 / 0.7);
        }
      `}</style>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, chatId: null })}
        title="Xác nhận xóa"
        size="sm"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Bạn có chắc chắn muốn xóa cuộc trò chuyện này? Hành động này không thể
          hoàn tác.
        </p>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => setDeleteModal({ isOpen: false, chatId: null })}
          >
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDeleteChat}>
            Xóa
          </Button>
        </ModalFooter>
      </Modal>

      {/* Toast Notification */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </>
  );
}

```

### src\components\layout\GlobalHeader.tsx

```tsx
import { useSidebar } from '@/contexts/SidebarContext';
import { useProject } from '@/hooks/useProject';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileMenu from './ProfileMenu';
import ThemeToggle from './ThemeToggle';

export default function GlobalHeader() {
  const { project } = useProject();
  const router = useRouter();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  return (
    <header 
      className={cn(
        "h-12 border-b flex items-center px-4 gap-4 sticky top-0 z-40 transition-all duration-300 relative",
        project?.color 
          ? "border-transparent text-white" 
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
      )}
      style={project?.color ? {
         backgroundColor: project.color,
      } : {}}
    >
      {/* Dynamic Background Pattern (Watermark) */}
      {project?.color && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           {/* Icon Watermark - Positioned to the right or scattered */}
           <div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12">
              {/* Replace with Dynamic Icon if available, using generic BookOpen for now to match NotebookPage */}
              <Settings className="w-64 h-64" /> 
           </div>
           {/* Secondary decorative circle */}
           <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Content Layer (z-10) */}
      <div className="relative z-10 flex items-center w-full gap-4">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-2 rounded-lg transition-colors",
            project?.color ? "hover:bg-white/20 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
          title={isCollapsed ? "Mở sidebar" : "Thu gọn sidebar"}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Text */}
        <Link href="/notebook" className="hover:opacity-80 transition-opacity">
           <span className={cn("text-xl font-bold tracking-tight", project?.color ? "text-white" : "text-gray-900 dark:text-gray-100")}>
             Chatnary
           </span>
        </Link>



        {/* Center: Project Name with Pill Style */}
        <div className="flex-1 flex items-center justify-center">
          {project && (
            <Link href={`/notebook?project=${project.id}`}>
              <button className={cn(
                  "flex items-center gap-2 px-6 py-1.5 rounded-full transition-all group backdrop-blur-sm shadow-sm",
                  project.color 
                    ? "bg-white/20 hover:bg-white/30 text-white border border-white/10" 
                    : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100"
                )}>
                {/* Removed Color Dot */}
                <span className="text-sm font-semibold tracking-wide">
                  {project.name}
                </span>
                <ChevronDown className={cn(
                    "w-4 h-4 transition-colors",
                    project.color ? "text-white/70 group-hover:text-white" : "text-gray-500"
                  )} 
                />
              </button>
            </Link>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
        {/* ThemeToggle */}
        <div className={project?.color ? "[&_button]:!text-white [&_button]:hover:!bg-white/20 [&_svg]:!text-white" : ""}>
           <ThemeToggle />
        </div>

          {/* Settings */}
          <button
            onClick={() => {
              if (project) {
                router.push(`/settings?project=${project.id}`);
              } else {
                router.push('/settings');
              }
            }}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
              project?.color ? "hover:bg-white/20 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            )}
            title="Cài đặt"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile Menu - Likely needs style adjustment or wrapper */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}

```

### src\components\layout\HeaderButton.tsx

```tsx
'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface HeaderButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'search';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  // Search specific props
  isSearchButton?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  // Tooltip
  tooltip?: string;
}

export default function HeaderButton({
  children,
  icon,
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  isSearchButton = false,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Tìm kiếm...',
  tooltip
}: HeaderButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchExpanded]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  const baseStyles = 'relative rounded-lg font-medium transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg';
  
  const sizeStyles = {
    sm: 'px-2 py-1.5 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-sm'
  };

  const gapStyles = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2'
  };
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-gray-500/25',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/25',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-yellow-500/25',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/25',
    search: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 shadow-gray-500/25',
  };

  const handleSearchClick = () => {
    if (isSearchButton) {
      setIsSearchExpanded(!isSearchExpanded);
    } else {
      onClick?.();
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClick?.();
  };

  // Search button specific rendering
  if (isSearchButton) {
    return (
      <div className="relative flex items-center">
        <button
          ref={buttonRef}
          type={type}
          onClick={handleSearchClick}
          disabled={disabled || isLoading}
          className={cn(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            (isExpanded || isSearchExpanded) && gapStyles[size],
            isSearchExpanded ? 'rounded-r-none' : '',
            className
          )}
          title={tooltip}
          onMouseEnter={() => !isSearchExpanded && setIsExpanded(true)}
          onMouseLeave={() => !isSearchExpanded && setIsExpanded(false)}
        >
          {isLoading && (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          )}
          {!isLoading && icon}
          
          {/* Text appears on hover or when search is expanded */}
          <span className={cn(
            'overflow-hidden transition-all duration-300 whitespace-nowrap',
            (isExpanded || isSearchExpanded) ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0'
          )}>
            {children}
          </span>
        </button>

        {/* Search input */}
        <div
          ref={searchContainerRef}
          className={cn(
            'overflow-hidden transition-all duration-300',
            isSearchExpanded ? 'max-w-64 w-64' : 'max-w-0 w-0'
          )}
        >
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder={searchPlaceholder}
              className={cn(
                'px-3 py-2 border-l border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'rounded-r-lg text-sm placeholder-gray-400 dark:placeholder-gray-500',
                'transition-all duration-200',
                variantStyles[variant].includes('bg-gray') 
                  ? 'border-gray-300 dark:border-gray-600' 
                  : 'border-blue-600'
              )}
            />
            {/* Search submit button - hidden but functional */}
            <button type="submit" className="sr-only">Search</button>
          </form>
        </div>
      </div>
    );
  }

  // Regular button rendering
  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        isExpanded && gapStyles[size],
        className
      )}
      title={tooltip}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {isLoading && (
        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      )}
      {!isLoading && icon}
      
      {/* Text appears on hover */}
      <span className={cn(
        'overflow-hidden transition-all duration-300 whitespace-nowrap',
        isExpanded ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0'
      )}>
        {children}
      </span>
    </button>
  );
}
```

### src\components\layout\index.ts

```ts
export { default as Breadcrumb } from './Breadcrumb';
export { default as MainLayout } from './MainLayout';
export { default as Sidebar } from './Sidebar';


```

### src\components\layout\MainLayout.tsx

```tsx
'use client';

import { HeaderBadge } from '@/components/ui';
import useBreadcrumbNavigation from '@/hooks/useBreadcrumb';
import { useProject } from '@/hooks/useProject';
import { FileText, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import PageHeader from './PageHeader';

interface MainLayoutProps {
  children: ReactNode;
  // Optional header props - if provided, will render consistent header
  headerTitle?: string;
  headerSubtitle?: string;
  headerActions?: ReactNode;
  showHeaderBorder?: boolean;
  // Additional content between header and main content (like search bars)
  headerExtras?: ReactNode;
  // Project statistics in header
  showProjectStats?: boolean;
}

export default function MainLayout({ 
  children, 
  headerTitle,
  headerSubtitle,
  headerActions,
  showHeaderBorder = true,
  headerExtras,
  showProjectStats = false
}: MainLayoutProps) {
  const pathname = usePathname();
  const { project } = useProject();
  
  // Initialize breadcrumb navigation
  useBreadcrumbNavigation();
  
  // Create project stats component
  const projectStats = showProjectStats && project ? (
    <div className="flex items-center gap-3">
      <HeaderBadge
        label="tài liệu"
        value={project.documentsCount || 0}
        icon={<FileText className="w-4 h-4" />}
        variant="info"
        size="md"
        tooltip="Số lượng tài liệu trong project"
        onClick={() => {
          window.location.href = `/documents?project=${project.id}`;
        }}
      />
      <HeaderBadge
        label="cuộc trò chuyện"
        value={project.chatsCount || 0}
        icon={<MessageSquare className="w-4 h-4" />}
        variant="success"
        size="md"
        tooltip="Số lượng cuộc trò chuyện trong project"
        onClick={() => {
          window.location.href = `/history?project=${project.id}`;
        }}
      />
    </div>
  ) : null;
  
  // Combine header actions with project stats
  const combinedHeaderActions = (
    <div className="flex items-center gap-3">
      {projectStats}
      {headerActions}
    </div>
  );
  
  // Chat pages use custom full-height layout without padding
  const isChatPage = pathname?.startsWith('/chat');
  const isDocumentsPage = pathname?.startsWith('/documents');
  const isDashboardPage = pathname?.startsWith('/dashboard');
  const isSettingsPage = pathname?.startsWith('/settings');
  const isNotebookPage = pathname?.startsWith('/notebook');
  const useFullHeight = isChatPage || isDocumentsPage || isDashboardPage || isSettingsPage || isNotebookPage;

  return (
    <>
      {useFullHeight ? (
        <div className="h-full flex flex-col">
          {/* Render header if title provided */}
          {headerTitle && (
            <PageHeader
              title={headerTitle}
              subtitle={headerSubtitle}
              actions={combinedHeaderActions}
              showBorder={showHeaderBorder}
            />
          )}
          
          {/* Header extras like search bars */}
          {headerExtras}
          
          {/* Main content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      ) : (
        <div>
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </div>
      )}
    </>
  );
}


```

### src\components\layout\PageHeader.tsx

```tsx
'use client';

import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  showBorder?: boolean;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  actions,
  showBorder = true 
}: PageHeaderProps) {
  return (
    <div className={`h-16 px-6 py-3 flex items-center ${showBorder ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
```

### src\components\layout\ProfileMenu.tsx

```tsx
'use client';

import { useProject } from '@/hooks/useProject';
import { LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ProfileMenu() {
  const router = useRouter();
  const { project } = useProject();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Mock user data - replace with actual user context
  const user = {
    name: 'Người dùng',
    email: 'user@example.com',
    avatar: null, // URL to avatar image or null
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    // TODO: Add actual logout logic (clear tokens, etc.)
    router.push('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold hover:ring-2 ring-blue-400 transition-all duration-200"
        title={user.name}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-xs">{getInitials(user.name)}</span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>{getInitials(user.name)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <button className="w-full px-4 py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium">
              Quản lý tài khoản
            </button>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                if (project) {
                  router.push(`/settings?project=${project.id}`);
                } else {
                  router.push('/settings');
                }
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Tùy chỉnh tài khoản
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Quản lý cài đặt & quota
                </p>
              </div>
            </button>

            <button
              onClick={() => {
                // Future: Switch account functionality
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Đổi tài khoản
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Chuyển sang tài khoản khác
                </p>
              </div>
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
            >
              <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400">
                Đăng xuất
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

```

### src\components\layout\ProjectContextProvider.tsx

```tsx

```

### src\components\layout\Sidebar.tsx

```tsx
"use client";

import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import { BarChart3, Bookmark, BookOpen, BrainCircuit, MessageSquare, NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  isDivider?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

// Function to generate navigation items with project context
const getNavSections = (projectId?: string): NavSection[] => [
  {
    title: "",
    items: [
      {
        name: 'Dashboard',
        href: projectId ? `/dashboard?project=${projectId}` : '/dashboard',
        icon: <BarChart3 className="w-5 h-5" />,
      },
      {
        name: 'Chat với AI',
        href: projectId ? `/chat?project=${projectId}` : '/chat',
        icon: <MessageSquare className="w-5 h-5" />,
      },
      {
        name: '[Thư viện]',
        href: '#',
        icon: null,
        isDivider: true,
      },
      {
        name: 'Tài liệu',
        href: projectId ? `/documents?project=${projectId}` : '/documents',
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        name: 'Sổ tay',
        href: projectId ? `/notebook?project=${projectId}` : '/notebook',
        icon: <NotebookPen className="w-5 h-5" />,
      },
      {
        name: 'Bookmark',
        href: projectId ? `/bookmark?project=${projectId}` : '/bookmark',
        icon: <Bookmark className="w-5 h-5" />,
      },
      {
        name: 'Quiz',
        href: projectId ? `/quiz?project=${projectId}` : '/quiz',
        icon: <BrainCircuit className="w-5 h-5" />,
      },
    ],
  },
];

// Loading skeleton for Sidebar when Suspense is triggered
function SidebarSkeleton() {
  return (
    <aside className="flex flex-col fixed inset-y-0 left-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-64">
      {/* Logo skeleton */}
      <div className="h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="ml-2 w-24 h-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
      {/* Nav skeleton */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2">
              <div className="w-5 h-5 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="w-20 h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}

// Wrapper component with Suspense boundary for useSearchParams
export default function Sidebar() {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarContent />
    </Suspense>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const { sidebarWidth, setSidebarWidth, isCollapsed } =
    useSidebar();
  const [isResizing, setIsResizing] = useState(false);
  const searchParams = useSearchParams();
  const currentProjectId = searchParams.get("project");
  
  // Get project for color sync


  // Get navigation sections with current project context
  const navSections = getNavSections(currentProjectId || undefined);

  useEffect(() => {
    if (isResizing) {
      // Disable text selection globally while resizing
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";

      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= 400) {
          setSidebarWidth(newWidth);
        }
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        // Re-enable text selection
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        // Cleanup in case component unmounts during resize
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      };
    }
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <aside
        className={cn(
          "flex flex-col fixed top-12 bottom-0 left-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900",
          !isResizing && "transition-[width] duration-200"
        )}
        style={{ width: isCollapsed ? "64px" : `${sidebarWidth}px` }}
      >
        {/* Navigation Sections - Custom Scrollbar */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
          {!isCollapsed ? (
            <>
              {/* Main Navigation */}
              {navSections.map((section) => (
                <div key={section.title || "main"}>
                  {section.title && (
                    <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item, index) => {
                      // Handle divider
                      if (item.isDivider) {
                        return (
                          <div
                            key={`divider-${index}`}
                            className="px-3 py-2 my-2"
                          >
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {item.name}
                            </div>
                          </div>
                        );
                      }

                      // Extract path from href (remove query string)
                      const itemPath = item.href.split('?')[0];
                      // Check if current pathname matches the item path
                      const isActive = pathname === itemPath || pathname?.startsWith(itemPath + '/');
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm relative",
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-r" />
                          )}
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Collapsed Navigation - Icons Only */}
              <div className="space-y-2">
                {navSections.flatMap(section => section.items).map((item, index) => {
                  // Skip dividers in collapsed mode
                  if (item.isDivider) {
                    return (
                      <div
                        key={`divider-${index}`}
                        className="my-1 border-t border-gray-200 dark:border-gray-700"
                      />
                    );
                  }

                  // Extract path from href (remove query string)
                  const itemPath = item.href.split('?')[0];
                  // Check if current pathname matches the item path
                  const isActive = pathname === itemPath || pathname?.startsWith(itemPath + '/');
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-center p-2.5 rounded-lg transition-colors relative',
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      )}
                      title={item.name}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-r" />
                      )}
                      {item.icon}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </nav>

        {/* Resize Handle - Hidden when collapsed */}
        {!isCollapsed && (
          <div
            className={cn(
              "absolute right-0 top-0 bottom-0 cursor-col-resize transition-all select-none",
              isResizing
                ? "w-1.5 bg-blue-500"
                : "w-1 hover:bg-blue-500 hover:w-1.5"
            )}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsResizing(true);
            }}
            style={{ userSelect: "none" }}
          />
        )}
      </aside>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(209 213 219 / 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(156 163 175 / 0.7);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(75 85 99 / 0.5);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(107 114 128 / 0.7);
        }
      `}</style>
    </>
  );
}

```

### src\components\layout\ThemeToggle.tsx

```tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}

```

### src\components\ui\Button.tsx

```tsx
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:hover:bg-blue-950',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && 'cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;


```

### src\components\ui\Card.tsx

```tsx
import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-gray-800',
      bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
      elevated: 'bg-white dark:bg-gray-800 shadow-lg',
    };
    
    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-semibold text-gray-900 dark:text-gray-100', className)} {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props}>
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;


```

### src\components\ui\ColorPicker.tsx

```tsx
'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  colors?: string[];
  showCustomInput?: boolean;
}

const DEFAULT_COLORS = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#a855f7', // Purple
];

export default function ColorPicker({
  value,
  onChange,
  label,
  disabled = false,
  className,
  colors = DEFAULT_COLORS,
  showCustomInput = true,
}: ColorPickerProps) {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="space-y-3">
        {/* Preset Colors */}
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              disabled={disabled}
              className={cn(
                'relative w-8 h-8 rounded-full border-2 transition-all duration-200',
                'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                value === color
                  ? 'border-gray-900 dark:border-gray-100 shadow-lg'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              )}
              style={{ backgroundColor: color }}
              title={`Chọn màu ${color}`}
            >
              {value === color && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-sm" />
              )}
            </button>
          ))}
        </div>

        {/* Custom Color Input */}
        {showCustomInput && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowCustom(!showCustom)}
              disabled={disabled}
              className={cn(
                'text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {showCustom ? 'Ẩn màu tùy chỉnh' : 'Chọn màu tùy chỉnh'}
            </button>
            
            {showCustom && (
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={disabled}
                  className={cn(
                    'w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600',
                    'bg-white dark:bg-gray-800 cursor-pointer',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                  aria-label="Chọn màu tùy chỉnh"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    placeholder="#000000"
                    className={cn(
                      'w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg',
                      'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-700'
                    )}
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

```

### src\components\ui\EmptyState.tsx

```tsx
'use client';

import Button from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionButton?: {
    text: string;
    onClick: () => void;
  };
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export default function EmptyState({
  title = "Chưa có tin nhắn nào",
  description = "Hãy bắt đầu cuộc trò chuyện bằng cách gửi tin nhắn đầu tiên!",
  icon,
  actionButton,
  suggestions = [],
  onSuggestionClick
}: EmptyStateProps) {
  const defaultIcon = (
    <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6">
          {icon || defaultIcon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Action Button */}
        {actionButton && (
          <div className="mb-8">
            <Button onClick={actionButton.onClick} variant="primary">
              {actionButton.text}
            </Button>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && onSuggestionClick && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              💡 Gợi ý câu hỏi:
            </p>
            <div className="grid gap-3">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="p-3 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-gray-100 text-sm">
                      {suggestion}
                    </span>
                    <svg 
                      className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center space-x-2">
              <span>🤖</span>
              <span>AI thông minh</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>📚</span>
              <span>Trích dẫn tài liệu</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>⚡</span>
              <span>Phản hồi nhanh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### src\components\ui\ErrorPage.tsx

```tsx
'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';

interface ErrorPageProps {
  title?: string;
  message?: string;
  statusCode?: number;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  actionButton?: {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  };
}

export default function ErrorPage({
  title = "Có lỗi xảy ra",
  message = "Không thể tìm thấy nội dung bạn đang tìm kiếm.",
  statusCode,
  showBackButton = true,
  showHomeButton = true,
  actionButton
}: ErrorPageProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mx-auto w-24 h-24 mb-8">
          <div className="w-full h-full rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-red-500 dark:text-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
              />
            </svg>
          </div>
        </div>

        {/* Error Code */}
        {statusCode && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-full">
              HTTP {statusCode}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {actionButton && (
            <Button
              onClick={actionButton.onClick}
              variant={actionButton.variant || 'primary'}
              className="w-full"
            >
              {actionButton.text}
            </Button>
          )}
          
          <div className="flex gap-3">
            {showBackButton && (
              <Button
                onClick={handleBack}
                variant="secondary"
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Quay lại
              </Button>
            )}
            
            {showHomeButton && (
              <Button
                onClick={handleHome}
                variant="primary"
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Về trang chủ
              </Button>
            )}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Cần trợ giúp?
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <button 
              onClick={() => router.push('/docs')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              📚 Tài liệu
            </button>
            <button 
              onClick={() => router.push('/support')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              💬 Hỗ trợ
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              🔄 Tải lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### src\components\ui\FileIcon.tsx

```tsx
import { cn, getFileIcon } from '@/lib/utils';

interface FileIconProps {
  fileType: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

export default function FileIcon({ 
  fileType, 
  size = 'md', 
  className,
  alt 
}: FileIconProps) {
  return (
    <img 
      src={getFileIcon(fileType)}
      alt={alt || `${fileType} file`}
      className={cn(
        'file-icon',
        `file-icon-${size}`,
        className
      )}
    />
  );
}
```

### src\components\ui\HeaderBadge.tsx

```tsx
'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';

interface HeaderBadgeProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tooltip?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function HeaderBadge({
  label,
  value,
  icon,
  variant = 'primary',
  size = 'md',
  className,
  tooltip,
  isLoading = false,
  onClick
}: HeaderBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const baseStyles = 'relative rounded-lg font-medium transition-all duration-300 flex items-center shadow-sm';
  
  const sizeStyles = {
    sm: 'px-2 py-1.5 text-xs h-8',
    md: 'px-3 py-2 text-sm h-9',
    lg: 'px-4 py-2.5 text-sm h-10'
  };

  const gapStyles = {
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2'
  };
  
  const variantStyles = {
    primary: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    secondary: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/70 dark:text-gray-300 dark:border-gray-600',
    success: 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    warning: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    danger: 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    info: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 dark:bg-cyan-900/20 dark:hover:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
  };

  const Element = onClick ? 'button' : 'div';

  return (
    <Element
      onClick={onClick}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        isExpanded && gapStyles[size],
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
      title={tooltip}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Icon */}
      {isLoading ? (
        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      
      {/* Value badge */}
      <span className="flex-shrink-0 font-bold">
        {isLoading ? '...' : value}
      </span>
      
      {/* Label appears on hover */}
      <span className={cn(
        'overflow-hidden transition-all duration-300 whitespace-nowrap',
        isExpanded ? 'max-w-32 opacity-100 ml-1' : 'max-w-0 opacity-0'
      )}>
        {label}
      </span>
    </Element>
  );
}
```

### src\components\ui\IconPicker.tsx

```tsx
'use client';

import { cn } from '@/lib/utils';
import {
    BarChart3,
    Book,
    Briefcase,
    Building,
    Camera,
    Code,
    Coffee,
    Cpu,
    Database,
    FileText,
    Folder,
    Globe,
    Heart,
    Home,
    Layers,
    LucideIcon,
    Mail,
    Monitor,
    Music,
    Palette,
    PenTool,
    Rocket,
    Settings,
    Shield,
    Star,
    Target,
    Users,
    Zap
} from 'lucide-react';

interface IconOption {
  icon: LucideIcon;
  name: string;
  label: string;
}

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  icons?: IconOption[];
  size?: 'sm' | 'md' | 'lg';
}

const DEFAULT_ICONS: IconOption[] = [
  { icon: Folder, name: 'folder', label: 'Thư mục' },
  { icon: FileText, name: 'file-text', label: 'Tài liệu' },
  { icon: Code, name: 'code', label: 'Lập trình' },
  { icon: Database, name: 'database', label: 'Cơ sở dữ liệu' },
  { icon: Globe, name: 'globe', label: 'Web' },
  { icon: Rocket, name: 'rocket', label: 'Khởi nghiệp' },
  { icon: Briefcase, name: 'briefcase', label: 'Công việc' },
  { icon: Building, name: 'building', label: 'Công ty' },
  { icon: Users, name: 'users', label: 'Nhóm' },
  { icon: BarChart3, name: 'bar-chart-3', label: 'Phân tích' },
  { icon: Target, name: 'target', label: 'Mục tiêu' },
  { icon: Star, name: 'star', label: 'Yêu thích' },
  { icon: Heart, name: 'heart', label: 'Sở thích' },
  { icon: Camera, name: 'camera', label: 'Ảnh' },
  { icon: Music, name: 'music', label: 'Âm nhạc' },
  { icon: Book, name: 'book', label: 'Học tập' },
  { icon: Coffee, name: 'coffee', label: 'Cà phê' },
  { icon: Home, name: 'home', label: 'Nhà' },
  { icon: Mail, name: 'mail', label: 'Email' },
  { icon: Monitor, name: 'monitor', label: 'Màn hình' },
  { icon: Cpu, name: 'cpu', label: 'Xử lý' },
  { icon: Layers, name: 'layers', label: 'Lớp' },
  { icon: Palette, name: 'palette', label: 'Thiết kế' },
  { icon: PenTool, name: 'pen-tool', label: 'Vẽ' },
  { icon: Settings, name: 'settings', label: 'Cài đặt' },
  { icon: Shield, name: 'shield', label: 'Bảo mật' },
  { icon: Zap, name: 'zap', label: 'Năng lượng' },
];

const ICON_SIZES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const BUTTON_SIZES = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export default function IconPicker({
  value,
  onChange,
  label,
  disabled = false,
  className,
  icons = DEFAULT_ICONS,
  size = 'md',
}: IconPickerProps) {
  const selectedIcon = icons.find(icon => icon.name === value);

  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      {/* Selected Icon Display */}
      {selectedIcon && (
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
          <selectedIcon.icon className={cn(ICON_SIZES[size], 'text-gray-600 dark:text-gray-400')} />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {selectedIcon.label}
          </span>
        </div>
      )}

      {/* Icon Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
        {icons.map((iconOption) => {
          const isSelected = value === iconOption.name;
          
          return (
            <button
              key={iconOption.name}
              type="button"
              onClick={() => onChange(iconOption.name)}
              disabled={disabled}
              className={cn(
                BUTTON_SIZES[size],
                'flex items-center justify-center rounded-lg border-2 transition-all duration-200',
                'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              )}
              title={iconOption.label}
            >
              <iconOption.icon className={ICON_SIZES[size]} />
            </button>
          );
        })}
      </div>
      
      {!selectedIcon && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Chọn một biểu tượng cho project của bạn
        </p>
      )}
    </div>
  );
}

export { DEFAULT_ICONS, type IconOption };

```

### src\components\ui\index.ts

```ts
export { default as Button } from './Button';
export { default as Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
export { default as ColorPicker } from './ColorPicker';
export { default as EmptyState } from './EmptyState';
export { default as ErrorPage } from './ErrorPage';
export { default as FileIcon } from './FileIcon';
export { default as HeaderBadge } from './HeaderBadge';
export { DEFAULT_ICONS, default as IconPicker, type IconOption } from './IconPicker';
export { default as Input } from './Input';
export { default as Loading, Skeleton } from './Loading';
export { default as LoadingState } from './LoadingState';
export { default as Modal, ModalFooter } from './Modal';
export { default as Pagination } from './Pagination';
export { default as Toast } from './Toast';


```

### src\components\ui\Input.tsx

```tsx
import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'w-full px-3 py-2 border rounded-lg text-gray-900 dark:text-gray-100',
            'bg-white dark:bg-gray-800',
            'border-gray-300 dark:border-gray-600',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;


```

### src\components\ui\Loading.tsx

```tsx
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function Loading({ size = 'md', text, className, ...props }: LoadingProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)} {...props}>
      <div className={cn('animate-spin rounded-full border-4 border-gray-200 border-t-blue-600', sizes[size])} />
      {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
}

// Skeleton loader
export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('animate-pulse bg-gray-200 dark:bg-gray-700 rounded', className)}
    {...props}
  />
);


```

### src\components\ui\LoadingState.tsx

```tsx
'use client';

interface LoadingStateProps {
  title?: string;
  message?: string;
  showSpinner?: boolean;
}

export default function LoadingState({
  title = "Đang tải...",
  message = "Vui lòng đợi trong giây lát",
  showSpinner = true
}: LoadingStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Loading Animation */}
        {showSpinner && (
          <div className="mx-auto w-16 h-16 mb-6">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-16 h-16 rounded-full border-4 border-blue-100 dark:border-gray-700"></div>
              {/* Spinning ring */}
              <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
            </div>
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>

        {/* Loading dots animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
      </div>
    </div>
  );
}
```

### src\components\ui\Modal.tsx

```tsx
'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  className,
  children,
  ...props
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={cn(
            'relative w-full rounded-lg bg-white dark:bg-gray-800 shadow-xl',
            'transform transition-all',
            sizes[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Đóng"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal subcomponents
export const ModalFooter = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-4',
      className
    )}
    {...props}
  >
    {children}
  </div>
);


```

### src\components\ui\Pagination.tsx

```tsx
'use client';

import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  totalItems: number;
  className?: string;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  className
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn(
      'flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700',
      className
    )}>
      {/* Count info */}
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>Hiển thị {startItem}-{endItem} của {totalItems.toLocaleString()} tài liệu</span>
        
        {/* Items per page selector */}
        <div className="flex items-center gap-2">
          <span>Hiển thị</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            aria-label="Số tài liệu mỗi trang"
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span>mỗi trang</span>
        </div>
      </div>

      {/* Simple pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              'px-2 py-1 text-sm rounded transition-colors',
              currentPage === 1
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            ←
          </button>

          {/* Current page info */}
          <div className="flex items-center gap-1 px-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Trang</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {currentPage}
            </span>
            <span>của</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {totalPages}
            </span>
          </div>

          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              'px-2 py-1 text-sm rounded transition-colors',
              currentPage === totalPages
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
```

### src\components\ui\ThemeToggle.tsx

```tsx
'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    // Toggle between light and dark only
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  
  const getIcon = () => {
    if (theme === 'light') {
      return (
        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    }
  };
  
  const getTitle = () => {
    return theme === 'light' ? 'Sáng' : 'Tối';
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      title={getTitle()}
    >
      {getIcon()}
    </button>
  );
}


```

### src\components\ui\Toast.tsx

```tsx
'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
}

const toastIcons = {
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
};

const toastStyles = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
};

export default function Toast({
  message,
  type = 'info',
  duration = 4000,
  onClose,
  visible = true
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // Wait for animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-sm w-full
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className={`
        p-4 rounded-lg border shadow-lg
        ${toastStyles[type]}
      `}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {toastIcons[type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 opacity-60 hover:opacity-100 transition-opacity"
            title="Đóng thông báo"
            aria-label="Đóng thông báo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
```

### src\contexts\AuthContext.tsx

```tsx
"use client";

import {
    login as authLogin,
    logout as authLogout,
    register as authRegister,
    LoginRequest,
    RegisterRequest,
    silentRefresh,
    startSilentRefresh,
    stopSilentRefresh,
    User
} from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    credentials: LoginRequest
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    credentials: RegisterRequest
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // ========================================
  // 🔓 BYPASS LOGIN - TẠM THỜI FAKE USER
  // ========================================
  const [user, setUser] = useState<User | null>({
    id: "test-user-id",
    email: "test@example.com",
    name: "Test User",
    role: "USER"
  });
  const [isLoading, setIsLoading] = useState(false); // Set to false to skip loading
  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    // ========================================
    // 🔓 BYPASS LOGIN - DISABLE AUTH CHECK
    // TODO: Uncomment code bên dưới để bật lại authentication
    // ========================================
    setIsLoading(false);
    
    // const initAuth = async () => {
    //   setIsLoading(true);

    //   // Check if we have stored user and try to get valid access token
    //   const storedUser = getStoredUser();

    //   if (storedUser && checkIsAuthenticated()) {
    //     // Try to get a valid access token (will refresh if needed)
    //     const accessToken = await getValidAccessToken();

    //     if (accessToken) {
    //       setUser(storedUser);
    //       startSilentRefresh();
    //     } else {
    //       // Token refresh failed, clear everything
    //       clearTokens();
    //       setUser(null);
    //     }
    //   } else {
    //     setUser(null);
    //   }

    //   setIsLoading(false);
    // };

    // initAuth();

    // Cleanup on unmount
    return () => {
      stopSilentRefresh();
    };
  }, []);

  const login = useCallback(
    async (
      credentials: LoginRequest
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);

      const result = await authLogin(credentials);

      if (result.success && result.data) {
        setUser(result.data.user);
        startSilentRefresh();
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: result.error };
    },
    []
  );

  const register = useCallback(
    async (
      credentials: RegisterRequest
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);

      const result = await authRegister(credentials);

      setIsLoading(false);

      if (result.success) {
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    stopSilentRefresh();

    await authLogout();

    setUser(null);
    setIsLoading(false);

    router.push("/login");
  }, [router]);

  const refreshAuth = useCallback(async (): Promise<boolean> => {
    const result = await silentRefresh();

    if (!result.success) {
      setUser(null);
      return false;
    }

    return true;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook for protected routes
export function useRequireAuth(redirectTo: string = "/login") {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
}

```

### src\contexts\BreadcrumbContext.tsx

```tsx
'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  isActive?: boolean;
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[] | ((prev: BreadcrumbItem[]) => BreadcrumbItem[])) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  updateBreadcrumb: (index: number, item: Partial<BreadcrumbItem>) => void;
  clearBreadcrumbs: () => void;
  projectName?: string;
  projectColor?: string;
  setProjectName: (name: string) => void;
  setProjectColor: (color: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

interface BreadcrumbProviderProps {
  children: ReactNode;
}

export function BreadcrumbProvider({ children }: BreadcrumbProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [projectName, setProjectName] = useState<string>();
  const [projectColor, setProjectColor] = useState<string>('#3b82f6'); // default blue

  const addBreadcrumb = (item: BreadcrumbItem) => {
    setBreadcrumbs(prev => [...prev, item]);
  };

  const updateBreadcrumb = (index: number, item: Partial<BreadcrumbItem>) => {
    setBreadcrumbs(prev => prev.map((breadcrumb, i) => 
      i === index ? { ...breadcrumb, ...item } : breadcrumb
    ));
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([]);
  };

  return (
    <BreadcrumbContext.Provider value={{
      breadcrumbs,
      setBreadcrumbs,
      addBreadcrumb,
      updateBreadcrumb,
      clearBreadcrumbs,
      projectName,
      projectColor,
      setProjectName,
      setProjectColor,
    }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}
```

### src\contexts\ChatContext.tsx

```tsx
"use client";

import { chatsApi } from '@/lib/api';
import { ChatSession } from '@/lib/types';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface ChatContextType {
  chats: ChatSession[];
  loading: boolean;
  addChat: (chat: ChatSession) => void;
  updateChat: (updatedChat: ChatSession) => void;
  removeChat: (chatId: string) => void;
  refreshChats: (projectId?: string) => Promise<void>;
  getChatsByProject: (projectId: string) => Promise<ChatSession[]>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);

  // Removed global fetchChats on mount as it depends on project context which is not available here
  // and the API requires projectId.

  const refreshChats = useCallback(async (projectId?: string) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const response = await chatsApi.getProjectChats(projectId);
      if (response.success && response.data) {
        setChats(response.data);
      }
    } catch (error) {
      console.error("Failed to refresh chats:", error);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - function is stable

  const getChatsByProject = useCallback(async (
    projectId: string
  ): Promise<ChatSession[]> => {
    try {
      const response = await chatsApi.getProjectChats(projectId);
      if (response.success && response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Failed to get chats by project:", error);
      return [];
    }
  }, []);

  const addChat = useCallback((chat: ChatSession) => {
    setChats(prev => [chat, ...prev]);
  }, []);

  const updateChat = useCallback((updatedChat: ChatSession) => {
    setChats(prev => prev.map(chat => 
      chat.id === updatedChat.id ? updatedChat : chat
    ));
  }, []);

  const removeChat = useCallback((chatId: string) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        loading,
        addChat,
        updateChat,
        removeChat,
        refreshChats,
        getChatsByProject,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChats must be used within ChatProvider");
  }
  return context;
}

```

### src\contexts\SidebarContext.tsx

```tsx
'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface SidebarContextType {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarWidth, setSidebarWidth, isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
}


```

### src\contexts\ThemeContext.tsx

```tsx
'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (newTheme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setEffectiveTheme(newTheme);
    };
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(systemTheme);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme);
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}


```

### src\contexts\ToastContext.tsx

```tsx

```

### src\hooks\useBreadcrumb.tsx

```tsx
import { BreadcrumbItem, useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { BarChart3, FileText, Home, LucideIcon, MessageSquare, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Mapping của routes tới breadcrumb labels và icons
const routeConfig: Record<string, { label: string; icon?: LucideIcon }> = {
  '/': { label: 'Trang chủ', icon: Home },
  '/dashboard': { label: 'Dashboard', icon: BarChart3 },
  '/documents': { label: 'Tài liệu', icon: FileText },
  '/chat': { label: 'Trò chuyện', icon: MessageSquare },
  '/settings': { label: 'Cài đặt', icon: Settings },
};

// Dynamic route patterns
const dynamicRoutes = [
  {
    pattern: /^\/chat\/(.+)$/,
    getLabel: (matches: RegExpMatchArray) => `Chat #${matches[1].substring(0, 8)}`,
    icon: MessageSquare
  },
  {
    pattern: /^\/documents\/(.+)$/,
    getLabel: (matches: RegExpMatchArray) => `Tài liệu #${matches[1].substring(0, 8)}`,
    icon: FileText
  }
];

export function useBreadcrumbNavigation() {
  const pathname = usePathname();
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    const generateBreadcrumbs = (): BreadcrumbItem[] => {
      const breadcrumbs: BreadcrumbItem[] = [];

      // Skip adding Home breadcrumb - we'll only show project name and current page
      // (Removed automatic Home breadcrumb addition)

      // Split pathname thành segments
      const segments = pathname.split('/').filter(Boolean);
      let currentPath = '';

      segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLast = index === segments.length - 1;

        // Kiểm tra exact match trước
        if (routeConfig[currentPath]) {
          const config = routeConfig[currentPath];
          const Icon = config.icon;
          
          breadcrumbs.push({
            label: config.label,
            href: isLast ? undefined : currentPath,
            icon: Icon ? <Icon className="w-4 h-4" /> : undefined,
            isActive: isLast,
          });
          return;
        }

        // Kiểm tra dynamic routes
        for (const dynamicRoute of dynamicRoutes) {
          const matches = currentPath.match(dynamicRoute.pattern);
          if (matches) {
            const Icon = dynamicRoute.icon;
            
            breadcrumbs.push({
              label: dynamicRoute.getLabel(matches),
              href: isLast ? undefined : currentPath,
              icon: Icon ? <Icon className="w-4 h-4" /> : undefined,
              isActive: isLast,
            });
            return;
          }
        }

        // Fallback: capitalize segment
        const fallbackLabel = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        breadcrumbs.push({
          label: fallbackLabel,
          href: isLast ? undefined : currentPath,
          isActive: isLast,
        });
      });

      return breadcrumbs;
    };

    const newBreadcrumbs = generateBreadcrumbs();
    setBreadcrumbs(newBreadcrumbs);
  }, [pathname, setBreadcrumbs]);

  // Helper function để manually set breadcrumbs
  const setCustomBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
    setBreadcrumbs(breadcrumbs);
  };

  // Helper function để add project context
  const addProjectContext = (projectName: string) => {
    setBreadcrumbs((prev: BreadcrumbItem[]) => {
      // Insert project context after Home but before other items
      const newBreadcrumbs = [...prev];
      if (newBreadcrumbs.length > 0 && newBreadcrumbs[0].href === '/') {
        newBreadcrumbs.splice(1, 0, {
          label: projectName,
          icon: <FileText className="w-4 h-4" />,
        });
      }
      return newBreadcrumbs;
    });
  };

  return {
    setCustomBreadcrumbs,
    addProjectContext,
  };
}

export default useBreadcrumbNavigation;
```

### src\hooks\useChat.ts

```ts
'use client';

import { chatsApi, messagesApi } from '@/lib/api';
import { USE_MOCK_DATA, getMockChat, getMockMessagesByChat, simulateDelay } from '@/lib/mockData';
import { ChatSession, Message } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';

interface UseChatOptions {
  chatId?: string;
  projectId?: string;
  autoFetch?: boolean;
}

interface UseChatReturn {
  chat: ChatSession | null;
  messages: Message[];
  loading: boolean;
  sending: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  updateChatLocal: (updatedChat: ChatSession) => void;
  refreshChat: () => Promise<void>;
  refreshMessages: () => Promise<void>;
}

export function useChat({ chatId, projectId: initialProjectId, autoFetch = true }: UseChatOptions = {}): UseChatReturn {
  const [chat, setChat] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derived ProjectId: either passed explicitly or found in loaded chat
  const projectId = initialProjectId || chat?.projectId;

  const fetchChat = useCallback(async () => {
    if (!chatId) return;

    try {
      setLoading(true);
      setError(null);

      console.log('Fetching chat data for:', chatId);
      
      // ========================================
      // 🔄 MOCK MODE - Get mock chat
      // ========================================
      if (USE_MOCK_DATA) {
        await simulateDelay(300);
        const mockChat = getMockChat(chatId);
        setChat(mockChat || null);
        console.log('Mock chat data loaded:', mockChat);
      } else {
        // Original API call
        const response = await chatsApi.getChat(chatId);

        if (response.error) {
          setError(response.error);
          return;
        }

        setChat(response.data || null);
        console.log('Chat data loaded:', response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải chat');
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  const fetchMessages = useCallback(async () => {
    if (!chatId || !projectId) return;
    
    try {
      setError(null);
      
      console.log('Fetching messages for chat:', chatId, 'Project:', projectId);
      
      // ========================================
      // 🔄 MOCK MODE - Get mock messages
      // ========================================
      if (USE_MOCK_DATA) {
        await simulateDelay(300);
        const mockMsgs = getMockMessagesByChat(chatId);
        setMessages(mockMsgs);
        console.log('Mock messages loaded:', mockMsgs.length);
      } else {
        // Original API call
        const response = await messagesApi.getMessages(projectId, chatId);
        
        if (response.error) {
          setError(response.error);
          return;
        }

        setMessages(response.data || []);
        console.log('Messages loaded:', response.data?.length || 0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải tin nhắn');
    }
  }, [chatId, projectId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!chatId || !content.trim()) {
      throw new Error('Missing chatId or content');
    }
    
    if (!projectId) {
       throw new Error('Missing projectId');
    }

    if (!projectId) {
      throw new Error('Missing projectId for sending messages');
    }

    try {
      setSending(true);
      setError(null);
      
      console.log('Sending message to chat:', chatId, 'Project:', projectId, 'Content:', content);
      
      // ========================================
      // 🔄 MOCK MODE - Simulate send message
      // ========================================
      if (USE_MOCK_DATA) {
        await simulateDelay(800);
        
        // Add user message
        const userMessage: Message = {
          id: `msg-${Date.now()}-user`,
          chatId: chatId,
          role: 'user',
          content: content,
          createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMessage]);
        
        // Simulate AI response after 1.5 seconds
        setTimeout(() => {
          const assistantMessage: Message = {
            id: `msg-${Date.now()}-assistant`,
            chatId: chatId,
            role: 'assistant',
            content: 'Đây là phản hồi mẫu từ mock data. Trong môi trường thật, đây sẽ là câu trả lời từ AI dựa trên tài liệu của bạn.',
            sources: [],
            createdAt: new Date().toISOString(),
          };
          setMessages(prev => [...prev, assistantMessage]);
        }, 1500);
        
        console.log('Mock message sent successfully');
      } else {
        // Original API call
        const response = await messagesApi.sendMessage(projectId, { content, chatId });
        
        console.log('Send message response:', response);
        
        if (response.error) {
          setError(response.error);
          throw new Error(response.error);
        }

        if (!response.success) {
          throw new Error('Gửi tin nhắn thất bại');
        }

        // Refresh messages after sending
        await fetchMessages();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi tin nhắn';
      setError(errorMessage);
      throw err;
    } finally {
      setSending(false);
    }
  }, [chatId, projectId, fetchMessages]);

  const refreshChat = useCallback(() => fetchChat(), [fetchChat]);
  const refreshMessages = useCallback(() => fetchMessages(), [fetchMessages]);

  const updateChatLocal = useCallback((updatedChat: ChatSession) => {
    setChat(updatedChat);
  }, []);

  // Reset state when chatId changes
  useEffect(() => {
    if (chatId) {
      setLoading(true);
      setChat(null);
      setMessages([]);
      setError(null);
    }
  }, [chatId]);

  // Initial Fetch logic
  useEffect(() => {
    if (autoFetch && chatId) {
      // Always fetch chat to ensure we have metadata (like projectId if missing)
      fetchChat();
    }
  }, [autoFetch, chatId, fetchChat]);

  // Fetch messages once we have projectId (either from prop or fetched chat)
  useEffect(() => {
    if (autoFetch && chatId && projectId) {
      fetchMessages();
    }
  }, [autoFetch, chatId, projectId, fetchMessages]);

  return {
    chat,
    messages,
    loading,
    sending,
    error,
    sendMessage,
    updateChatLocal,
    refreshChat,
    refreshMessages,
  };
}
```

### src\hooks\useDocumentFilters.ts

```ts
import { Document } from '@/lib/types';
import { paginateArray } from '@/lib/utils';
import { useMemo, useState } from 'react';

export interface FilterState {
  fileType: string;
  dateRange: string;
  status: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export function useDocumentFilters(documents: Document[], initialSearchTerm: string = '') {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterState>({
    fileType: '',
    dateRange: '',
    status: '',
    sortBy: 'uploadedAt',
    sortOrder: 'desc'
  });

  // Calculate paginated result
  const paginatedResult = useMemo(() => {
    // Start with all documents
    let filteredDocuments = [...documents];
    
    // Apply search filter (passed from outside)
    if (initialSearchTerm.trim()) {
      filteredDocuments = filteredDocuments.filter(doc => 
        (doc.name || '').toLowerCase().includes(initialSearchTerm.toLowerCase())
      );
    }
    
    // Filter by file type
    if (filters.fileType) {
      filteredDocuments = filteredDocuments.filter(doc => 
        (doc.mimeType?.toLowerCase() || '').includes(filters.fileType.toLowerCase())
      );
    }
    
    // Filter by status
    if (filters.status) {
      filteredDocuments = filteredDocuments.filter(doc => 
        doc.status === filters.status
      );
    }
    
    // Filter by date range
    if (filters.dateRange) {
      const now = new Date();
      const uploadDate = (doc: Document) => new Date(doc.createdAt);
      
      filteredDocuments = filteredDocuments.filter(doc => {
        const docDate = uploadDate(doc);
        const diffTime = now.getTime() - docDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (filters.dateRange) {
          case 'today': return diffDays <= 1;
          case 'week': return diffDays <= 7;
          case 'month': return diffDays <= 30;
          case 'year': return docDate.getFullYear() === now.getFullYear();
          default: return true;
        }
      });
    }
    
    // Apply sorting
    if (filters.sortBy) {
      filteredDocuments.sort((a, b) => {
        let aVal = a[filters.sortBy as keyof Document];
        let bVal = b[filters.sortBy as keyof Document];
        
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return filters.sortOrder === 'asc' ? -1 : 1;
        if (bVal == null) return filters.sortOrder === 'asc' ? 1 : -1;
        
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return filters.sortOrder === 'asc' ? comparison : -comparison;
      });
    }
    
    return paginateArray(filteredDocuments, {
      page: currentPage,
      limit: itemsPerPage,
      total: filteredDocuments.length
    });
  }, [documents, currentPage, itemsPerPage, filters, initialSearchTerm]);

  // Actions
  const handlePageChange = (page: number) => setCurrentPage(page);
  
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const clearFilters = () => {
    setFilters({
      fileType: '',
      dateRange: '',
      status: '',
      sortBy: 'uploadedAt',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    Boolean(filters.fileType || filters.dateRange || filters.status || filters.sortBy !== 'uploadedAt' || filters.sortOrder !== 'desc');

  return {
    setCurrentPage,
    setItemsPerPage,
    paginatedResult,
    filters,
    handlePageChange,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    itemsPerPage, 
    currentPage
  };
}

```

### src\hooks\useDocuments.ts

```ts
'use client';

import apiClient from '@/lib/api';
import { USE_MOCK_DATA, getMockDocument, getMockDocumentsByProject, simulateDelay } from '@/lib/mockData';
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

      // ========================================
      // 🔄 MOCK MODE - Sử dụng mock data
      // ========================================
      if (USE_MOCK_DATA) {
        await simulateDelay(300); // Simulate network delay
        const mockDocs = getMockDocumentsByProject(projectId);
        setDocuments(mockDocs);
      } else {
        // Original API call
        const response = await apiClient.getProjectDocuments(projectId);

        if (response.error) {
          setError(response.error);
          return;
        }

        setDocuments(response.data || []);
      }
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

      // ========================================
      // 🔄 MOCK MODE - Simulate upload
      // ========================================
      if (USE_MOCK_DATA) {
        await simulateDelay(800); // Simulate upload time
        const newDocument: Document = {
          id: `doc-${Date.now()}`,
          name: file.name,
          originalFilename: file.name,
          projectId: projectId,
          fileSize: file.size,
          mimeType: file.type,
          status: 'processing',
          uploadedBy: 'test-user-id',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          hasContent: false,
        };
        console.log('Mock upload successful:', newDocument);
        setDocuments(prev => [newDocument, ...prev]);
        
        // Simulate processing completion after 2 seconds
        setTimeout(() => {
          setDocuments(prev => 
            prev.map(doc => 
              doc.id === newDocument.id 
                ? { ...doc, status: 'processed' as const, hasContent: true }
                : doc
            )
          );
        }, 2000);
      } else {
        // Original API call
        console.log('Calling API uploadDocument...');
        const response = await apiClient.uploadDocument(projectId, file);
        console.log('API response:', response);

        if (response.error) {
          console.error('API error:', response.error);
          setError(response.error);
          throw new Error(response.error);
        }

        // Add new document to list
        if (response.data) {
          console.log('Upload successful, updating documents list');
          setDocuments(prev => [response.data!, ...prev]);
        }

        // Refresh to get updated list
        console.log('Refreshing documents list...');
        await fetchDocuments();
        console.log('Upload process completed successfully');
      }
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

      // ========================================
      // 🔄 MOCK MODE - Simulate delete
      // ========================================
      if (USE_MOCK_DATA) {
        await simulateDelay(200);
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      } else {
        // Original API call
        const response = await apiClient.deleteDocument(documentId);

        if (response.error) {
          setError(response.error);
          return;
        }

        // Remove document from list
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa document');
    }
  }, []);

  const getDocument = useCallback(async (documentId: string): Promise<Document | null> => {
    try {
      setError(null);

      // ========================================
      // 🔄 MOCK MODE - Get mock document
      // ========================================
      if (USE_MOCK_DATA) {
        await simulateDelay(200);
        return getMockDocument(documentId) || null;
      } else {
        // Original API call
        const response = await apiClient.getDocument(documentId);

        if (response.error) {
          setError(response.error);
          return null;
        }

        return response.data || null;
      }
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
```

### src\hooks\useProject.ts

```ts
import apiClient from '@/lib/api';
import { USE_MOCK_DATA, getMockProject, simulateDelay } from '@/lib/mockData';
import { Project } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useProject() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset state immediately when projectId changes
  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      setProject(null);
      setError(null);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) {
      setError('Không tìm thấy ID dự án');
      setIsLoading(false);
      return;
    }

    const fetchProject = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // ========================================
        // 🔄 MOCK MODE - Sử dụng mock data
        // ========================================
        if (USE_MOCK_DATA) {
          await simulateDelay(300); // Simulate network delay
          const foundProject = getMockProject(projectId);
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError('Không tìm thấy dự án');
          }
        } else {
          // Original API call
          const response = await apiClient.getProjects();
          if (response.data) {
            const foundProject = response.data.find((p: Project) => p.id === projectId);
            if (foundProject) {
              setProject(foundProject);
            } else {
              setError('Không tìm thấy dự án');
            }
          } else {
            setError('Lỗi khi tải dữ liệu dự án');
          }
        }
      } catch (err) {
        setError('Lỗi kết nối đến server');
        console.error('Error fetching project:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return {
    projectId,
    project,
    isLoading,
    error,
    refetch: () => {
      if (projectId) {
        // Re-trigger fetch
        setIsLoading(true);
        setError(null);
      }
    }
  };
}
```

### src\lib\api.ts

```ts
// API client for Chatnary Backend matching https://chatnary.up.railway.app/docs
import {
    USE_MOCK_DATA,
    createMockChat,
    deleteMockChat,
    getMockChatsByProject,
    simulateDelay,
    updateMockChat
} from "@/lib/mockData";
import {
    AuthResponse,
    ChatSession,
    CreateChatRequest,
    CreateProjectRequest,
    Document,
    LoginRequest,
    Message,
    Project,
    RegisterRequest,
    UpdateChatRequest,
    UpdateProjectRequest,
} from "@/lib/types";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || "CHATNARY_COOKIE";

// Generic API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Internal Backend Response wrapper
interface BackendErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

// Extended Request types if needed
export interface SendMessageDto {
  content: string;
  chatId?: string;
}

// Backend chat response structure
interface BackendChat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  projectId: string | null;
  userId?: string;
  messages?: BackendMessage[];
}

interface BackendMessage {
  role: 'user' | 'assistant';
  content: string;
  citation?: any[];
}

interface ChatMessageResponse {
  answer: string;
  citations: any[];
  chatId: string;
}

// ==================== API CLIENT ====================

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    // ========================================
    // 🔓 BYPASS LOGIN - SET FAKE TOKEN
    // TODO: Uncomment dòng bên dưới và comment dòng fake token để bật lại authentication
    // ========================================
    // this.token = Cookies.get(COOKIE_NAME) || null;
    this.token = "fake-token-for-testing"; // Fake token for testing
    console.log('ApiClient: Initialized. Token from cookie:', this.token ? 'Found' : 'Missing');
  }

  // Auth Management
  setToken(token: string) {
    this.token = token;
    // Important: Set path to '/' so cookie is accessible everywhere
    Cookies.set(COOKIE_NAME, token, { expires: 7, path: '/' }); 
    console.log('ApiClient: Token set manually');
  }

  clearToken() {
    this.token = null;
    Cookies.remove(COOKIE_NAME, { path: '/' });
    console.log('ApiClient: Token cleared');
  }

  getToken(): string | null {
    if (!this.token) {
        this.token = Cookies.get(COOKIE_NAME) || null;
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    // ========================================
    // 🔓 BYPASS LOGIN - ALWAYS RETURN TRUE
    // TODO: Uncomment dòng bên dưới để bật lại authentication
    // ========================================
    return true;
    // return !!this.getToken();
  }

  private createSuccessResponse<T>(data: T): ApiResponse<T> {
    return { success: true, data };
  }

  private createErrorResponse<T>(error: string): ApiResponse<T> {
    return { success: false, error };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (this.token) {
        (headers as any)["Authorization"] = `Bearer ${this.token}`;
      }

      const config: RequestInit = {
        ...options,
        headers,
      };

      console.log(`API Request: ${options.method || "GET"} ${url}`);

      const response = await fetch(url, config);

      console.log(`API Response Status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText) as BackendErrorResponse;
          errorMessage = Array.isArray(errorJson.message)
            ? errorJson.message.join(", ")
            : errorJson.message || errorJson.error || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        console.error("API Error:", errorMessage);
        return this.createErrorResponse(errorMessage);
      }

      if (response.status === 204) {
        return this.createSuccessResponse({} as T);
      }

      const responseData = await response.json();
      return this.createSuccessResponse(responseData);
    } catch (error) {
      console.error("Network Error:", error);
      return this.createErrorResponse(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  // ==================== AUTH ====================

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      const token = response.data.accessToken || response.data.token;
      if (token) {
        this.setToken(token);
        return this.createSuccessResponse({
          token,
          user: response.data.user || {
            id: "me",
            email: credentials.email,
            name: "User",
          },
        });
      }
    }
    return response;
  }

  async register(data: RegisterRequest): Promise<ApiResponse<void>> {
    return this.request<void>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    const res = await this.request<void>("/auth/logout", {
      method: "POST",
    });
    this.clearToken();
    return res;
  }

  // ==================== PROJECTS ====================

  async getProjects(): Promise<ApiResponse<Project[]>> {
    // ========================================
    // 🔄 MOCK MODE - Return mock projects
    // ========================================
    if (USE_MOCK_DATA) {
      const { getMockProjects } = await import("@/lib/mockData");
      await simulateDelay(300);
      return this.createSuccessResponse(getMockProjects());
    }
    
    return this.request<Project[]>("/project");
  }

  async createProject(
    project: CreateProjectRequest
  ): Promise<ApiResponse<Project>> {
    // ========================================
    // 🔄 MOCK MODE - Create mock project
    // ========================================
    if (USE_MOCK_DATA) {
      const { createMockProject } = await import("@/lib/mockData");
      await simulateDelay(400);
      const newProject = createMockProject(project);
      return this.createSuccessResponse(newProject);
    }
    
    return this.request<Project>("/project", {
      method: "POST",
      body: JSON.stringify(project),
    });
  }

  async updateProject(
    id: string,
    project: Partial<UpdateProjectRequest>
  ): Promise<ApiResponse<Project>> {
    // ========================================
    // 🔄 MOCK MODE - Update mock project
    // ========================================
    if (USE_MOCK_DATA) {
      const { updateMockProject } = await import("@/lib/mockData");
      await simulateDelay(300);
      const updatedProject = updateMockProject(id, project);
      if (updatedProject) {
        return this.createSuccessResponse(updatedProject);
      }
      return this.createErrorResponse('Project not found');
    }
    
    return this.request<Project>(`/project/${id}`, {
      method: "PATCH",
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    // ========================================
    // 🔄 MOCK MODE - Delete mock project
    // ========================================
    if (USE_MOCK_DATA) {
      const { deleteMockProject } = await import("@/lib/mockData");
      await simulateDelay(200);
      const success = deleteMockProject(id);
      if (success) {
        return this.createSuccessResponse(undefined as any);
      }
      return this.createErrorResponse('Project not found');
    }
    
    return this.request<void>(`/project/${id}`, {
      method: "DELETE",
    });
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/project/${id}`);
  }

  // ==================== DOCUMENTS ====================

  async uploadDocument(
    projectId: string,
    file: File
  ): Promise<ApiResponse<Document>> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Ensure projectId is handled if strictly required by backend, though path suggests separating details
      // But usually uploads need linkage. We will send it.
      formData.append("projectId", projectId);

      const url = `${this.baseUrl}/document/upload/files`;
      const response = await fetch(url, {
        method: "POST",
        headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return this.createErrorResponse(
          `HTTP ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      return this.createSuccessResponse(data);
    } catch (error) {
      return this.createErrorResponse(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  async getProjectDocuments(
    projectId: string
  ): Promise<ApiResponse<Document[]>> {
    return this.request<Document[]>(`/project/${projectId}/documents`);
  }

  // GET /document/:documentId - Get document detail
  async getDocument(documentId: string): Promise<ApiResponse<Document>> {
    return this.request<Document>(`/document/${documentId}`);
  }

  getDocumentDownloadUrl(documentId: string): string {
    return `${this.baseUrl}/document/${documentId}/download`;
  }

  getDocumentPreviewUrl(documentId: string): string {
    return `${this.baseUrl}/document/${documentId}/preview`;
  }

  // DELETE /document/:documentId - Delete document
  async deleteDocument(documentId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/document/${documentId}`, {
      method: "DELETE",
    });
  }

  async searchDocuments(
    query: string,
    projectId?: string
  ): Promise<ApiResponse<Document[]>> {
    const params = new URLSearchParams();
    params.append("query", query);
    if (projectId) params.append("projectId", projectId);

    // Fallback search, verify if backend handles it
    return this.request<Document[]>(
      `/document/search?${params.toString()}`
    );
  }

  // ==================== CHATS ====================

  async createChat(
    request: CreateChatRequest
  ): Promise<ApiResponse<ChatSession>> {
    // ========================================
    // 🔄 MOCK MODE - Create mock chat
    // ========================================
    if (USE_MOCK_DATA) {
      await simulateDelay(400);
      const newChat = createMockChat({
        projectId: request.project_id,
        title: request.title,
      });
      return this.createSuccessResponse(newChat);
    }
    
    // Original API call
    return this.request<ChatSession>("/chat", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async getProjectChats(
    projectId: string
  ): Promise<ApiResponse<ChatSession[]>> {
    // ========================================
    // 🔄 MOCK MODE - Get mock chats by project
    // ========================================
    if (USE_MOCK_DATA) {
      await simulateDelay(300);
      const mockChats = getMockChatsByProject(projectId);
      return this.createSuccessResponse(mockChats);
    }
    
    // Original API call
    return this.request<ChatSession[]>(`/project/${projectId}/chats`);
  }

  async getChat(chatId: string): Promise<ApiResponse<ChatSession>> {
    // Already mocked in useChat hook
    return this.request<ChatSession>(`/chat/${chatId}`);
  }

  async updateChat(
    chatId: string,
    request: UpdateChatRequest
  ): Promise<ApiResponse<ChatSession>> {
    // ========================================
    // 🔄 MOCK MODE - Update mock chat
    // ========================================
    if (USE_MOCK_DATA) {
      await simulateDelay(300);
      const updatedChat = updateMockChat(chatId, request);
      if (updatedChat) {
        return this.createSuccessResponse(updatedChat);
      }
      return this.createErrorResponse('Chat not found');
    }
    
    // Original API call
    return this.request<ChatSession>(`/chat/user/${chatId}`, {
      method: "PATCH",
      body: JSON.stringify(request),
    });
  }

  async deleteChat(chatId: string): Promise<ApiResponse<void>> {
    // ========================================
    // 🔄 MOCK MODE - Delete mock chat
    // ========================================
    if (USE_MOCK_DATA) {
      await simulateDelay(200);
      const success = deleteMockChat(chatId);
      if (success) {
        return this.createSuccessResponse(undefined as any);
      }
      return this.createErrorResponse('Chat not found');
    }
    
    // Original API call
    return this.request<void>(`/chat/user/${chatId}`, {
      method: "DELETE",
    });
  }

  // ==================== MESSAGES ====================

  async getMessages(
    projectId: string,
    chatId: string
  ): Promise<ApiResponse<Message[]>> {
    return this.request<Message[]>(
      `/project/${projectId}/chats/${chatId}/messages`
    );
  }

  async sendMessage(
    projectId: string,
    request: SendMessageDto
  ): Promise<ApiResponse<Message>> {
    return this.request<Message>(
      `/project/${projectId}/chats/messages`,
      {
        method: "POST",
        body: JSON.stringify(request),
      }
    );
  }
}

const apiClient = new ApiClient();

export const authApi = {
  login: (data: LoginRequest) => apiClient.login(data),
  register: (data: RegisterRequest) => apiClient.register(data),
  logout: () => apiClient.logout(),
  getToken: () => apiClient.getToken(),
  isAuthenticated: () => apiClient.isAuthenticated(),
  setToken: (token: string) => apiClient.setToken(token),
};

export const projectsApi = {
  getProjects: () => apiClient.getProjects(),
  createProject: (data: CreateProjectRequest) => apiClient.createProject(data),
  updateProject: (id: string, data: Partial<UpdateProjectRequest>) =>
    apiClient.updateProject(id, data),
  deleteProject: (id: string) => apiClient.deleteProject(id),
  getProject: (id: string) => apiClient.getProject(id),
};

export const documentsApi = {
  uploadDocument: (projectId: string, file: File) =>
    apiClient.uploadDocument(projectId, file),
  getProjectDocuments: (projectId: string) =>
    apiClient.getProjectDocuments(projectId),
  getDocument: (id: string) => apiClient.getDocument(id),
  deleteDocument: (id: string) => apiClient.deleteDocument(id),
  searchDocuments: (query: string, projectId?: string) =>
    apiClient.searchDocuments(query, projectId),
};

export const chatsApi = {
  createChat: (request: CreateChatRequest) => apiClient.createChat(request),
  getProjectChats: (projectId: string) => apiClient.getProjectChats(projectId),
  getChat: (id: string) => apiClient.getChat(id),
  updateChat: (id: string, request: UpdateChatRequest) =>
    apiClient.updateChat(id, request),
  deleteChat: (id: string) => apiClient.deleteChat(id),
};

export const messagesApi = {
  getMessages: (projectId: string, chatId: string) =>
    apiClient.getMessages(projectId, chatId),
  sendMessage: (projectId: string, request: SendMessageDto) =>
    apiClient.sendMessage(projectId, request),
};

export const suggestionsApi = {
  getSuggestions: async (chatId: string) => {
    // Placeholder implementation as per original file
    return { success: true, data: [] as string[] };
  },
};

export default apiClient;

```

### src\lib\auth.ts

```ts
// Authentication service - Token management and auth API calls
// Best Practice: Access Token in memory, Refresh Token in localStorage (fallback until backend supports HttpOnly cookies)

const TOKEN_KEY = 'chatnary_refresh_token';
const USER_KEY = 'chatnary_user';

// ==================== TYPES ====================

export interface User {
    id: string;
    email: string;
    username?: string;
    name?: string;
    role: 'ADMIN' | 'USER';
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

// ==================== IN-MEMORY TOKEN STORAGE ====================

// Access token stored in memory only (more secure against XSS)
let inMemoryAccessToken: string | null = null;

export function getAccessToken(): string | null {
    return inMemoryAccessToken;
}

export function setAccessToken(token: string | null): void {
    inMemoryAccessToken = token;
}

// ==================== REFRESH TOKEN STORAGE ====================
// Using localStorage as fallback (ideally should be HttpOnly cookie from backend)

export function getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setRefreshToken(token: string | null): void {
    if (typeof window === 'undefined') return;
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
}

// ==================== USER STORAGE ====================

export function getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

export function setStoredUser(user: User | null): void {
    if (typeof window === 'undefined') return;
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(USER_KEY);
    }
}

// ==================== TOKEN UTILITIES ====================

export function setTokens(tokens: AuthTokens): void {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
}

export function clearTokens(): void {
    setAccessToken(null);
    setRefreshToken(null);
    setStoredUser(null);
}

export function isAuthenticated(): boolean {
    // Check if we have a refresh token (access token might be expired/cleared on refresh)
    return !!getRefreshToken();
}

// Decode JWT payload without verification (client-side only)
function decodeJwtPayload(token: string): any | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    const payload = decodeJwtPayload(token);
    if (!payload || !payload.exp) return true;

    // Add 30 second buffer before actual expiry
    const expiryTime = payload.exp * 1000;
    const bufferTime = 30 * 1000;
    return Date.now() >= expiryTime - bufferTime;
}

export function getTokenExpiryTime(token: string): number | null {
    const payload = decodeJwtPayload(token);
    if (!payload || !payload.exp) return null;
    return payload.exp * 1000;
}

// ==================== AUTH API CALLS ====================

// Remove trailing slash from base URL to prevent double slashes
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');

interface BackendResponse<T> {
    statusCode: number;
    success: boolean;
    data?: T;
    message?: string | { message: string; error: string; statusCode: number };
}

// Helper to extract error message from response
function getErrorMessage(message: string | { message: string } | undefined, fallback: string): string {
    if (!message) return fallback;
    if (typeof message === 'string') return message;
    if (typeof message === 'object' && 'message' in message) return message.message;
    return fallback;
}

export async function login(credentials: LoginRequest): Promise<{ success: boolean; data?: LoginResponse; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const result: BackendResponse<LoginResponse> = await response.json();

        if (!result.success || !result.data) {
            return { success: false, error: getErrorMessage(result.message, 'Login failed') };
        }

        // Store tokens
        setTokens({
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
        });
        setStoredUser(result.data.user);

        return { success: true, data: result.data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Network error' };
    }
}

export async function register(credentials: RegisterRequest): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const result: BackendResponse<{ message: string }> = await response.json();

        if (!result.success) {
            return { success: false, error: getErrorMessage(result.message, 'Registration failed') };
        }

        return { success: true, message: result.data?.message };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Network error' };
    }
}

export async function refreshAccessToken(): Promise<{ success: boolean; accessToken?: string; error?: string }> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        return { success: false, error: 'No refresh token available' };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
            },
        });

        const result: BackendResponse<AuthTokens> = await response.json();

        if (!result.success || !result.data) {
            // Refresh failed - clear all tokens and redirect to login
            clearTokens();
            return { success: false, error: getErrorMessage(result.message, 'Token refresh failed') };
        }

        // Update tokens
        setTokens(result.data);

        return { success: true, accessToken: result.data.accessToken };
    } catch (error) {
        clearTokens();
        return { success: false, error: error instanceof Error ? error.message : 'Network error' };
    }
}

export async function logout(): Promise<{ success: boolean }> {
    const accessToken = getAccessToken();

    try {
        if (accessToken) {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
        }
    } catch {
        // Ignore logout API errors
    } finally {
        clearTokens();
    }

    return { success: true };
}

// ==================== SILENT REFRESH ====================

let refreshPromise: Promise<{ success: boolean; accessToken?: string; error?: string }> | null = null;
let refreshInterval: NodeJS.Timeout | null = null;

// Ensure only one refresh request at a time
export async function silentRefresh(): Promise<{ success: boolean; accessToken?: string; error?: string }> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = refreshAccessToken();
    const result = await refreshPromise;
    refreshPromise = null;

    return result;
}

// Get valid access token (refresh if expired)
export async function getValidAccessToken(): Promise<string | null> {
    const accessToken = getAccessToken();

    // If no access token or expired, try to refresh
    if (!accessToken || isTokenExpired(accessToken)) {
        const result = await silentRefresh();
        if (result.success && result.accessToken) {
            return result.accessToken;
        }
        return null;
    }

    return accessToken;
}

// Start automatic token refresh interval
export function startSilentRefresh(): void {
    if (refreshInterval) return;

    // Check and refresh every 5 minutes
    refreshInterval = setInterval(async () => {
        const accessToken = getAccessToken();
        if (accessToken && isTokenExpired(accessToken)) {
            await silentRefresh();
        }
    }, 5 * 60 * 1000);
}

export function stopSilentRefresh(): void {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

```

### src\lib\mockData.ts

```ts
// Mock data for testing without backend
import { Project, Document, ChatSession, Message } from './types';

// ==================== FLAG TO ENABLE/DISABLE MOCK MODE ====================
export const USE_MOCK_DATA = true; // Set to false to use real API

// ==================== MOCK PROJECTS ====================
export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Dự án AI & Machine Learning',
    description: 'Nghiên cứu và phát triển các mô hình AI',
    color: '#3b82f6',
    icon: 'rocket',
    documentsCount: 15,
    chatsCount: 8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
  },
  {
    id: 'project-2',
    name: 'Tài liệu Marketing',
    description: 'Chiến lược và kế hoạch marketing Q1 2024',
    color: '#ec4899',
    icon: 'target',
    documentsCount: 23,
    chatsCount: 12,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-22T11:20:00Z',
  },
  {
    id: 'project-3',
    name: 'Phát triển Web',
    description: 'Dự án xây dựng website và ứng dụng web',
    color: '#10b981',
    icon: 'code',
    documentsCount: 31,
    chatsCount: 19,
    createdAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-23T09:45:00Z',
  },
  {
    id: 'project-4',
    name: 'Thư Viện Số',
    description: 'Project số hóa tài liệu PDF',
    color: '#f59e0b',
    icon: 'book',
    documentsCount: 47,
    chatsCount: 25,
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-24T16:10:00Z',
  },
  {
    id: 'project-5',
    name: 'Nghiên cứu Khoa học',
    description: 'Tài liệu và bài báo khoa học',
    color: '#8b5cf6',
    icon: 'database',
    documentsCount: 62,
    chatsCount: 34,
    createdAt: '2023-12-20T10:30:00Z',
    updatedAt: '2024-01-25T13:25:00Z',
  },
];

// ==================== MOCK DOCUMENTS ====================
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Báo cáo phân tích dữ liệu Q3.pdf',
    originalFilename: 'Báo cáo phân tích dữ liệu Q3.pdf',
    projectId: 'project-1',
    projectName: 'Dự án AI & Machine Learning',
    fileSize: 2450000,
    mimeType: 'application/pdf',
    status: 'processed',
    uploadedBy: 'test-user-id',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:35:00Z',
    hasContent: true,
  },
  {
    id: 'doc-2',
    name: 'Machine Learning Model Documentation.pdf',
    originalFilename: 'ML_Model_Docs.pdf',
    projectId: 'project-1',
    projectName: 'Dự án AI & Machine Learning',
    fileSize: 3200000,
    mimeType: 'application/pdf',
    status: 'processed',
    uploadedBy: 'test-user-id',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:25:00Z',
    hasContent: true,
  },
  {
    id: 'doc-3',
    name: 'Chiến lược Marketing 2024.docx',
    originalFilename: 'Marketing_Strategy_2024.docx',
    projectId: 'project-2',
    projectName: 'Tài liệu Marketing',
    fileSize: 1890000,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    status: 'processing',
    uploadedBy: 'test-user-id',
    createdAt: '2024-01-17T09:00:00Z',
    updatedAt: '2024-01-17T09:01:00Z',
    hasContent: false,
  },
  {
    id: 'doc-4',
    name: 'Web Development Guide.pdf',
    originalFilename: 'Web_Dev_Guide.pdf',
    projectId: 'project-3',
    projectName: 'Phát triển Web',
    fileSize: 4500000,
    mimeType: 'application/pdf',
    status: 'processed',
    uploadedBy: 'test-user-id',
    createdAt: '2024-01-18T11:15:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
    hasContent: true,
  },
  {
    id: 'doc-5',
    name: 'React Best Practices.pdf',
    originalFilename: 'React_Best_Practices.pdf',
    projectId: 'project-3',
    projectName: 'Phát triển Web',
    fileSize: 2100000,
    mimeType: 'application/pdf',
    status: 'processed',
    uploadedBy: 'test-user-id',
    createdAt: '2024-01-19T08:30:00Z',
    updatedAt: '2024-01-19T08:35:00Z',
    hasContent: true,
  },
  {
    id: 'doc-6',
    name: 'Nghiên cứu về LLM và ChatGPT.pdf',
    originalFilename: 'LLM_Research.pdf',
    projectId: 'project-4',
    projectName: 'Thư Viện Số',
    fileSize: 5600000,
    mimeType: 'application/pdf',
    status: 'processed',
    uploadedBy: 'test-user-id',
    createdAt: '2024-01-20T13:45:00Z',
    updatedAt: '2024-01-20T13:50:00Z',
    hasContent: true,
  },
  {
    id: 'doc-7',
    name: 'Luận văn tốt nghiệp.pdf',
    originalFilename: 'Thesis_2024.pdf',
    projectId: 'project-5',
    projectName: 'Nghiên cứu Khoa học',
    fileSize: 8900000,
    mimeType: 'application/pdf',
    status: 'processed',
    uploadedBy: 'test-user-id',
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:10:00Z',
    hasContent: true,
  },
  {
    id: 'doc-8',
    name: 'Bài báo khoa học AI.pdf',
    originalFilename: 'AI_Paper.pdf',
    projectId: 'project-5',
    projectName: 'Nghiên cứu Khoa học',
    fileSize: 3400000,
    mimeType: 'application/pdf',
    status: 'error',
    uploadedBy: 'test-user-id',
    createdAt: '2024-01-22T15:20:00Z',
    updatedAt: '2024-01-22T15:21:00Z',
    hasContent: false,
    processingError: 'Không thể xử lý file - định dạng không hợp lệ',
  },
];

// ==================== MOCK CHAT SESSIONS ====================
export const mockChatSessions: ChatSession[] = [
  {
    id: 'chat-1',
    title: 'Hỏi về Machine Learning',
    projectId: 'project-1',
    projectName: 'Dự án AI & Machine Learning',
    createdBy: 'test-user-id',
    messagesCount: 12,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
  },
  {
    id: 'chat-2',
    title: 'Phân tích dữ liệu marketing',
    projectId: 'project-2',
    projectName: 'Tài liệu Marketing',
    createdBy: 'test-user-id',
    messagesCount: 8,
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-16T10:45:00Z',
  },
  {
    id: 'chat-3',
    title: 'React và Next.js best practices',
    projectId: 'project-3',
    projectName: 'Phát triển Web',
    createdBy: 'test-user-id',
    messagesCount: 15,
    createdAt: '2024-01-17T14:20:00Z',
    updatedAt: '2024-01-17T16:00:00Z',
  },
  {
    id: 'chat-4',
    title: 'Tìm hiểu về LLM',
    projectId: 'project-4',
    projectName: 'Thư Viện Số',
    createdBy: 'test-user-id',
    messagesCount: 20,
    createdAt: '2024-01-18T10:30:00Z',
    updatedAt: '2024-01-18T13:15:00Z',
  },
  {
    id: 'chat-5',
    title: 'Chat mới',
    projectId: 'project-1',
    projectName: 'Dự án AI & Machine Learning',
    createdBy: 'test-user-id',
    messagesCount: 0,
    createdAt: '2024-01-25T14:00:00Z',
    updatedAt: '2024-01-25T14:00:00Z',
  },
];

// ==================== MOCK MESSAGES ====================
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    chatId: 'chat-1',
    role: 'user',
    content: 'Machine Learning là gì?',
    createdAt: '2024-01-15T11:01:00Z',
  },
  {
    id: 'msg-2',
    chatId: 'chat-1',
    role: 'assistant',
    content: 'Machine Learning (Học máy) là một nhánh của trí tuệ nhân tạo (AI) tập trung vào việc xây dựng các hệ thống có khả năng học hỏi và cải thiện từ kinh nghiệm mà không cần được lập trình một cách tường minh. Các thuật toán Machine Learning sử dụng dữ liệu để tìm ra các mẫu và đưa ra dự đoán hoặc quyết định.',
    sources: [
      {
        documentId: 'doc-1',
        documentName: 'Báo cáo phân tích dữ liệu Q3.pdf',
        pageNumber: 5,
        chunkId: 'chunk-1',
        content: 'Machine Learning là một phương pháp phân tích dữ liệu tự động hóa...',
        score: 0.95,
      },
    ],
    createdAt: '2024-01-15T11:01:15Z',
  },
  {
    id: 'msg-3',
    chatId: 'chat-1',
    role: 'user',
    content: 'Có những loại Machine Learning nào?',
    createdAt: '2024-01-15T11:02:00Z',
  },
  {
    id: 'msg-4',
    chatId: 'chat-1',
    role: 'assistant',
    content: 'Có 3 loại Machine Learning chính:\n\n1. **Supervised Learning (Học có giám sát)**: Thuật toán học từ dữ liệu được gán nhãn, ví dụ: phân loại email spam.\n\n2. **Unsupervised Learning (Học không giám sát)**: Thuật toán tìm kiếm các mẫu trong dữ liệu không được gán nhãn, ví dụ: phân nhóm khách hàng.\n\n3. **Reinforcement Learning (Học tăng cường)**: Thuật toán học thông qua phần thưởng và hình phạt, ví dụ: chơi game, robot tự động.',
    sources: [
      {
        documentId: 'doc-2',
        documentName: 'Machine Learning Model Documentation.pdf',
        pageNumber: 12,
        chunkId: 'chunk-2',
        content: 'Ba loại Machine Learning cơ bản: Supervised, Unsupervised, và Reinforcement Learning...',
        score: 0.92,
      },
    ],
    createdAt: '2024-01-15T11:02:20Z',
  },
];

// ==================== HELPER FUNCTIONS ====================

// Get projects
export function getMockProjects(): Project[] {
  return [...mockProjects];
}

// Get project by ID
export function getMockProject(id: string): Project | undefined {
  return mockProjects.find(p => p.id === id);
}

// Get documents by project ID
export function getMockDocumentsByProject(projectId: string): Document[] {
  return mockDocuments.filter(d => d.projectId === projectId);
}

// Get document by ID
export function getMockDocument(id: string): Document | undefined {
  return mockDocuments.find(d => d.id === id);
}

// Get chat sessions by project ID
export function getMockChatsByProject(projectId: string): ChatSession[] {
  return mockChatSessions.filter(c => c.projectId === projectId);
}

// Get chat session by ID
export function getMockChat(id: string): ChatSession | undefined {
  return mockChatSessions.find(c => c.id === id);
}

// Get messages by chat ID
export function getMockMessagesByChat(chatId: string): Message[] {
  return mockMessages.filter(m => m.chatId === chatId);
}

// Create new chat session
export function createMockChat(data: {
  projectId: string;
  title?: string;
}): ChatSession {
  const project = getMockProject(data.projectId);
  const newChat: ChatSession = {
    id: `chat-${Date.now()}`,
    title: data.title || 'Chat mới',
    projectId: data.projectId,
    projectName: project?.name,
    createdBy: 'test-user-id',
    messagesCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockChatSessions.push(newChat);
  
  // Update project chat count
  if (project) {
    project.chatsCount++;
  }
  
  return newChat;
}

// Update chat session
export function updateMockChat(chatId: string, updates: { title: string }): ChatSession | undefined {
  const chat = mockChatSessions.find(c => c.id === chatId);
  if (chat) {
    chat.title = updates.title;
    chat.updatedAt = new Date().toISOString();
    return chat;
  }
  return undefined;
}

// Delete chat session
export function deleteMockChat(chatId: string): boolean {
  const index = mockChatSessions.findIndex(c => c.id === chatId);
  if (index !== -1) {
    const chat = mockChatSessions[index];
    
    // Update project chat count
    const project = getMockProject(chat.projectId);
    if (project && project.chatsCount > 0) {
      project.chatsCount--;
    }
    
    // Remove chat and its messages
    mockChatSessions.splice(index, 1);
    const messageIndices = mockMessages
      .map((m, idx) => m.chatId === chatId ? idx : -1)
      .filter(idx => idx !== -1)
      .reverse();
    messageIndices.forEach(idx => mockMessages.splice(idx, 1));
    
    return true;
  }
  return false;
}

// Create new project
export function createMockProject(data: {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}): Project {
  const newProject: Project = {
    id: `project-${Date.now()}`,
    name: data.name,
    description: data.description,
    color: data.color || '#3b82f6',
    icon: data.icon || 'folder',
    documentsCount: 0,
    chatsCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProjects.push(newProject);
  return newProject;
}

// Delete project
export function deleteMockProject(id: string): boolean {
  const index = mockProjects.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProjects.splice(index, 1);
    return true;
  }
  return false;
}

// Update project
export function updateMockProject(id: string, updates: Partial<Project>): Project | undefined {
  const project = mockProjects.find(p => p.id === id);
  if (project) {
    Object.assign(project, updates, { updatedAt: new Date().toISOString() });
    return project;
  }
  return undefined;
}

// Simulate delay for async operations
export function simulateDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

```

### src\lib\types.ts

```ts
// ==================== USER & AUTH ====================
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// ==================== PROJECT ====================
export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  documentsCount: number;
  chatsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface ProjectStats {
  projectId: string;
  documents: {
    total: number;
    processed: number;
    processing: number;
    errors: number;
  };
  chats: {
    total: number;
    totalMessages: number;
  };
  lastActivity: string;
}

// ==================== DOCUMENT ====================
export type DocumentStatus = 'uploading' | 'processing' | 'processed' | 'error';

export interface DocumentMetadata {
  title?: string;
  author?: string;
  createdDate?: string;
}

export interface Document {
  id: string;
  name: string;
  originalFilename: string;
  projectId: string;
  projectName?: string;
  fileSize?: number;
  mimeType?: string;
  status: DocumentStatus;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  processingError?: string;
  hasContent?: boolean;
}

export interface DocumentContent {
  documentId: string;
  content: string;
  pages: Array<{
    pageNumber: number;
    content: string;
  }>;
}

// ==================== CHAT ====================
export type MessageRole = 'user' | 'assistant';

export interface SourceCitation {
  documentId: string;
  documentName: string;
  pageNumber: number;
  chunkId: string;
  content: string;
  score: number;
  startIndex?: number;
  endIndex?: number;
}

export interface Message {
  id: string;
  chatId: string;
  role: MessageRole;
  content: string;
  sources?: SourceCitation[];
  model?: string;
  tokensUsed?: {
    prompt: number;
    completion: number;
    total: number;
  };
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  projectId: string;
  projectName?: string;
  createdBy: string;
  messagesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  content: string;
}

export interface CreateChatRequest {
  project_id: string;
  title?: string;
}

export interface UpdateChatRequest {
  title: string;
}

// ==================== STATS ====================
export interface ActivityItem {
  type: 'document_upload' | 'chat_created' | 'message_sent';
  documentId?: string;
  documentName?: string;
  chatId?: string;
  chatTitle?: string;
  timestamp: string;
}

export interface OverviewStats {
  totalDocuments: number;
  totalChats: number;
  totalMessages: number;
  storageUsed: number;
  storageLimit: number;
  documentsThisMonth: number;
  chatsThisMonth: number;
  messagesThisMonth: number;
  recentActivity: ActivityItem[];
}

export interface UsageDataPoint {
  date: string;
  documents: number;
  chats: number;
  messages: number;
}

export interface UsageStats {
  period: 'day' | 'week' | 'month';
  dataPoints: UsageDataPoint[];
}

// ==================== SEARCH ====================
export interface SearchHighlight {
  text: string;
  startIndex: number;
  endIndex: number;
}

export interface SearchResult {
  documentId: string;
  documentName: string;
  pageNumber: number;
  chunkId: string;
  content: string;
  score: number;
  highlights?: SearchHighlight[];
}

export interface SearchRequest {
  query: string;
  documentIds?: string[];
  limit?: number;
  threshold?: number;
}

// ==================== SETTINGS ====================
export interface UserSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

// ==================== API RESPONSES ====================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ==================== EXPORT ====================
export type ExportFormat = 'json' | 'pdf' | 'markdown';

// ==================== SUGGESTIONS ====================
export interface Suggestions {
  suggestions: string[];
}


```

### src\lib\utils.ts

```ts
/**
 * Utility functions
 */

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInMinutes < 1) return 'Vừa xong';
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  if (diffInDays < 7) return `${diffInDays} ngày trước`;
  
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format full date with time
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Get file icon URL for colorful CDN icons
export function getFileIcon(fileType: string): string {
  const getIconUrl = (iconName: string) => 
    `https://cdn.jsdelivr.net/gh/vscode-icons/vscode-icons@master/icons/file_type_${iconName}.svg`;
  
  let iconName = 'default';
  
  // Normalize fileType to lowercase for better matching
  const type = fileType.toLowerCase();
  
  // Documents
  if (type.includes('pdf')) iconName = 'pdf2';
  else if (type.includes('word') || type.includes('document') || type.includes('docx')) iconName = 'word';
  else if (type.includes('text') || type.includes('txt')) iconName = 'text';
  else if (type.includes('markdown') || type.includes('md')) iconName = 'markdown';
  
  // Spreadsheets
  else if (type.includes('excel') || type.includes('xlsx') || type.includes('xls')) iconName = 'excel';
  else if (type.includes('csv')) iconName = 'csv';
  
  // Presentations
  else if (type.includes('powerpoint') || type.includes('pptx') || type.includes('ppt')) iconName = 'powerpoint';
  
  // Images
  else if (type.includes('png')) iconName = 'png';
  else if (type.includes('jpg') || type.includes('jpeg')) iconName = 'jpg';
  else if (type.includes('gif')) iconName = 'gif';
  else if (type.includes('svg')) iconName = 'svg';
  else if (type.includes('image')) iconName = 'image';
  
  // Web files
  else if (type.includes('html') || type.includes('htm')) iconName = 'html';
  else if (type.includes('css')) iconName = 'css';
  else if (type.includes('javascript') || type.includes('js')) iconName = 'js';
  else if (type.includes('typescript') || type.includes('ts')) iconName = 'typescript';
  
  // Programming languages
  else if (type.includes('python') || type.includes('py')) iconName = 'python';
  else if (type.includes('java')) iconName = 'java';
  else if (type.includes('cpp') || type.includes('c++')) iconName = 'cpp';
  else if (type.includes('php')) iconName = 'php';
  else if (type.includes('ruby') || type.includes('rb')) iconName = 'ruby';
  else if (type.includes('go')) iconName = 'go';
  else if (type.includes('rust') || type.includes('rs')) iconName = 'rust';
  else if (type.includes('swift')) iconName = 'swift';
  else if (type.includes('kotlin') || type.includes('kt')) iconName = 'kotlin';
  
  // Data files
  else if (type.includes('json')) iconName = 'json';
  else if (type.includes('xml')) iconName = 'xml';
  else if (type.includes('yaml') || type.includes('yml')) iconName = 'yaml';
  else if (type.includes('toml')) iconName = 'toml';
  
  // Archives
  else if (type.includes('zip')) iconName = 'zip';
  else if (type.includes('rar')) iconName = 'rar';
  else if (type.includes('7z')) iconName = '7zip';
  else if (type.includes('tar')) iconName = 'tar';
  
  // Media
  else if (type.includes('video') || type.includes('mp4') || type.includes('avi') || type.includes('mov')) iconName = 'video';
  else if (type.includes('audio') || type.includes('mp3') || type.includes('wav') || type.includes('flac')) iconName = 'audio';
  
  // Design files
  else if (type.includes('sketch')) iconName = 'sketch';
  else if (type.includes('figma') || type.includes('fig')) iconName = 'figma';
  else if (type.includes('psd')) iconName = 'photoshop';
  else if (type.includes('ai')) iconName = 'illustrator';
  
  return getIconUrl(iconName);
}

// Helper function to get file icon component props
export function getFileIconProps(fileType: string) {
  return {
    src: getFileIcon(fileType),
    alt: `${fileType} file`,
    className: "w-8 h-8",
    style: { minWidth: '32px', minHeight: '32px' }
  };
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Calculate storage percentage
export function getStoragePercentage(used: number, limit: number): number {
  return Math.round((used / limit) * 100);
}

// Class name helper (similar to clsx)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Generate random ID
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Validate file type
export function isValidFileType(fileType: string): boolean {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/markdown',
  ];
  return allowedTypes.includes(fileType);
}

// Validate file size (max 50MB)
export function isValidFileSize(fileSize: number, maxSize: number = 50 * 1024 * 1024): boolean {
  return fileSize <= maxSize;
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

// Download text as file
export function downloadAsFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Mock data for diverse file types with icons
export const mockFileTypes = [
  // Documents
  { type: 'pdf', name: 'Báo cáo phân tích dữ liệu Q3.pdf', size: 2450000, pageCount: 35 },
  { type: 'docx', name: 'Hợp đồng thuê văn phòng.docx', size: 1890000, pageCount: 12 },
  { type: 'txt', name: 'Ghi chú cuộc họp.txt', size: 45000, pageCount: 3 },
  { type: 'md', name: 'README - Hướng dẫn sử dụng.md', size: 28000, pageCount: 8 },
  
  // Spreadsheets
  { type: 'xlsx', name: 'Bảng tính doanh số.xlsx', size: 890000, pageCount: 25 },
  { type: 'csv', name: 'Danh sách khách hàng.csv', size: 156000, pageCount: 1 },
  
  // Presentations
  { type: 'pptx', name: 'Thuyết trình sản phẩm mới.pptx', size: 5600000, pageCount: 28 },
  
  // Images
  { type: 'png', name: 'Logo công ty.png', size: 234000, pageCount: 1 },
  { type: 'jpg', name: 'Ảnh sự kiện ra mắt.jpg', size: 1200000, pageCount: 1 },
  { type: 'svg', name: 'Biểu đồ tổ chức.svg', size: 89000, pageCount: 1 },
  
  // Web files
  { type: 'html', name: 'Trang chủ website.html', size: 67000, pageCount: 1 },
  { type: 'css', name: 'Stylesheet chính.css', size: 45000, pageCount: 1 },
  { type: 'js', name: 'Script xử lý form.js', size: 78000, pageCount: 1 },
  { type: 'ts', name: 'API utilities.ts', size: 92000, pageCount: 1 },
  
  // Programming
  { type: 'py', name: 'Machine learning model.py', size: 156000, pageCount: 1 },
  { type: 'java', name: 'Main application.java', size: 134000, pageCount: 1 },
  { type: 'cpp', name: 'Performance optimizer.cpp', size: 189000, pageCount: 1 },
  
  // Data files
  { type: 'json', name: 'Cấu hình hệ thống.json', size: 23000, pageCount: 1 },
  { type: 'xml', name: 'Metadata sản phẩm.xml', size: 67000, pageCount: 1 },
  
  // Archives
  { type: 'zip', name: 'Backup dữ liệu.zip', size: 45000000, pageCount: null },
  { type: 'rar', name: 'Tài liệu kỹ thuật.rar', size: 23000000, pageCount: null },
  
  // Media
  { type: 'mp4', name: 'Video hướng dẫn.mp4', size: 89000000, pageCount: null },
  { type: 'mp3', name: 'Podcast phỏng vấn.mp3', size: 12000000, pageCount: null },
  
  // Other
  { type: 'sketch', name: 'UI Design mockup.sketch', size: 4500000, pageCount: 15 },
  { type: 'figma', name: 'Prototype ứng dụng.fig', size: 2300000, pageCount: 8 },
];

// Pagination helper
export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function paginateArray<T>(
  array: T[], 
  options: PaginationOptions
): PaginationResult<T> {
  const { page, limit, total } = options;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = array.slice(startIndex, endIndex);
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}


```

### package.json

```json
{
  "name": "chatnary-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "dev:clean": "rm -rf .next && next dev",
    "dev:turbo": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.7",
    "@hookform/resolvers": "^5.2.1",
    "@tanstack/react-query": "^5.84.2",
    "@types/js-cookie": "^3.0.6",
    "axios": "^1.11.0",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.12",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.539.0",
    "next": "16.1.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-dropzone": "^14.3.8",
    "react-hook-form": "^7.62.0",
    "react-markdown": "^10.1.0",
    "remark-gfm": "^4.0.1",
    "tailwind-merge": "^3.3.1",
    "zod": "^4.0.17"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.17",
    "eslint": "^9",
    "eslint-config-next": "16.1.3",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```
