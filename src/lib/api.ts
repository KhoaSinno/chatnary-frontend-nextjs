// API client for Chatnary Backend matching https://chatnary.up.railway.app/docs
import {
  USE_MOCK_DATA,
  createMockChat,
  deleteMockChat,
  getMockChatsByProject,
  simulateDelay,
  updateMockChat,
} from '@/lib/mockData';
import { getAccessToken } from '@/lib/auth';
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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

// Generic API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Internal Backend Response wrapper
interface BackendErrorResponse {
  statusCode: number;
  message?: unknown;
  error?: string;
}

interface BackendSuccessResponse<T> {
  statusCode: number;
  success: true;
  data: T;
}

interface BackendProject {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    projectResources?: number;
  };
}

interface BackendDocument {
  id: string;
  title: string;
  originalName: string;
  mimeType?: string | null;
  size?: number | null;
  pageCount?: number | null;
  errorMessage?: string | null;
  status: 'PENDING' | 'PROCESSING' | 'DONE' | 'ERROR';
  createdAt: string;
  updatedAt: string;
}

interface BackendUploadResult {
  documents: BackendDocument[];
  jobIds: string[];
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isBackendSuccessResponse<T>(
  value: unknown
): value is BackendSuccessResponse<T> {
  return (
    isRecord(value) &&
    value.success === true &&
    'data' in value &&
    typeof value.statusCode === 'number'
  );
}

function getBackendErrorMessage(value: unknown, fallback: string): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string').join(', ') || fallback;
  if (isRecord(value) && typeof value.message === 'string') return value.message;
  return fallback;
}

function mapProject(project: BackendProject): Project {
  return {
    id: project.id,
    name: project.name,
    description: project.description ?? undefined,
    color: project.color ?? '#3b82f6',
    documentsCount: project._count?.projectResources ?? 0,
    chatsCount: 0,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

function mapDocument(document: BackendDocument, projectId: string): Document {
  const statusByBackend = {
    PENDING: 'processing',
    PROCESSING: 'processing',
    DONE: 'processed',
    ERROR: 'error',
  } as const;

  return {
    id: document.id,
    name: document.title,
    originalFilename: document.originalName,
    projectId,
    fileSize: document.size ?? undefined,
    pageCount: document.pageCount ?? undefined,
    mimeType: document.mimeType ?? undefined,
    status: statusByBackend[document.status],
    uploadedBy: '',
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    processingError: document.errorMessage ?? undefined,
    hasContent: document.status === 'DONE',
  };
}

// ==================== API CLIENT ====================

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  // Auth Management
  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  getToken(): string | null {
    return this.token ?? getAccessToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
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

      const token = this.getToken();
      if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }

      const config: RequestInit = {
        ...options,
        headers,
        // API data is user-specific and protected by a bearer token. Avoid a
        // conditional cached response being treated as fresh application data.
        cache: "no-store",
      };

      console.log(`API Request: ${options.method || "GET"} ${url}`);

      const response = await fetch(url, config);

      console.log(`API Response Status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText) as BackendErrorResponse;
          errorMessage = getBackendErrorMessage(
            errorJson.message,
            errorJson.error || errorMessage
          );
        } catch {
          errorMessage = errorText || errorMessage;
        }
        console.error("API Error:", errorMessage);
        return this.createErrorResponse(errorMessage);
      }

      if (response.status === 204) {
        return this.createSuccessResponse({} as T);
      }

      const responseData: unknown = await response.json();
      if (!isBackendSuccessResponse<T>(responseData)) {
        return this.createErrorResponse("Unexpected response format from API");
      }

      return this.createSuccessResponse(responseData.data);
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
    const response = await this.request<BackendProject[]>("/project");
    return response.success && response.data
      ? this.createSuccessResponse(response.data.map(mapProject))
      : this.createErrorResponse(response.error || 'Unable to load projects');
  }

  async createProject(
    project: CreateProjectRequest
  ): Promise<ApiResponse<Project>> {
    const response = await this.request<BackendProject>("/project", {
      method: "POST",
      body: JSON.stringify(project),
    });
    return response.success && response.data
      ? this.createSuccessResponse(mapProject(response.data))
      : this.createErrorResponse(response.error || 'Unable to create project');
  }

  async updateProject(
    id: string,
    project: Partial<UpdateProjectRequest>
  ): Promise<ApiResponse<Project>> {
    const response = await this.request<BackendProject>(`/project/${id}`, {
      method: "PATCH",
      body: JSON.stringify(project),
    });
    return response.success && response.data
      ? this.createSuccessResponse(mapProject(response.data))
      : this.createErrorResponse(response.error || 'Unable to update project');
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/project/${id}`, {
      method: "DELETE",
    });
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    const projects = await this.getProjects();
    if (!projects.success || !projects.data) {
      return this.createErrorResponse(projects.error || 'Unable to load projects');
    }

    const project = projects.data.find((item) => item.id === id);
    return project
      ? this.createSuccessResponse(project)
      : this.createErrorResponse('Project not found');
  }

  // ==================== DOCUMENTS ====================

  async uploadDocument(
    projectId: string,
    file: File
  ): Promise<ApiResponse<Document>> {
    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("data", JSON.stringify({ projectId }));

      const url = `${this.baseUrl}/document/upload/files`;
      const response = await fetch(url, {
        method: "POST",
        headers: this.getToken() ? { Authorization: `Bearer ${this.getToken()}` } : {},
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return this.createErrorResponse(
          `HTTP ${response.status}: ${errorText}`
        );
      }

      const payload: unknown = await response.json();
      if (!isBackendSuccessResponse<BackendUploadResult>(payload)) {
        return this.createErrorResponse("Unexpected upload response format from API");
      }

      const document = payload.data.documents[0];
      return document
        ? this.createSuccessResponse(mapDocument(document, projectId))
        : this.createErrorResponse("Upload completed without a document record");
    } catch (error) {
      return this.createErrorResponse(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  async getProjectDocuments(
    projectId: string
  ): Promise<ApiResponse<Document[]>> {
    const response = await this.request<BackendDocument[]>(`/project/${projectId}/documents`);
    return response.success && response.data
      ? this.createSuccessResponse(response.data.map((document) => mapDocument(document, projectId)))
      : this.createErrorResponse(response.error || 'Unable to load documents');
  }

  // GET /document/:documentId - Get document detail
  async getDocument(documentId: string): Promise<ApiResponse<Document>> {
    const response = await this.request<BackendDocument>(`/document/${documentId}`);
    return response.success && response.data
      ? this.createSuccessResponse(mapDocument(response.data, ''))
      : this.createErrorResponse(response.error || 'Unable to load document');
  }

  async getDocumentBlob(
    documentId: string,
    disposition: 'inline' | 'attachment' = 'inline',
  ): Promise<ApiResponse<Blob>> {
    try {
      const token = this.getToken();
      if (!token) return this.createErrorResponse('Chưa đăng nhập');

      const response = await fetch(
        `${this.baseUrl}/document/${documentId}/file?disposition=${disposition}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText) as BackendErrorResponse;
          return this.createErrorResponse(
            getBackendErrorMessage(errorJson.message, `HTTP ${response.status}`),
          );
        } catch {
          return this.createErrorResponse(errorText || `HTTP ${response.status}`);
        }
      }

      return this.createSuccessResponse(await response.blob());
    } catch (error) {
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Không thể tải tài liệu',
      );
    }
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
