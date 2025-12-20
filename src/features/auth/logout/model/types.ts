export interface LogoutRequest {
  sessionId?: string;
}

export interface LogoutAllRequest {
  userId: string;
}

export interface LogoutOthersRequest {
  userId: string;
  currentSessionId?: string;
}
