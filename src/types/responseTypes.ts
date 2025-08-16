// Base response interface
export interface BaseResponse {
  type: string;
}

// Standard response types
export interface ErrorResponse extends BaseResponse {
  type: "ERROR";
  msg: string;
}

export interface InfoResponse extends BaseResponse {
  type: "INFO";
  msg: string;
}

export interface SuccessResponse extends BaseResponse {
  type: "SUCCESS";
  msg: string;
}

// Specific response types
export interface InitDataResponse extends BaseResponse {
  type: "INIT_DATA";
  chatIds: string[];
  groups: string[]; // Changed from number[] to string[] to match actual group IDs
  offlineMessages: Array<{
    partitionKey: string;
    count: number;
    messageType: string;
    from?: string; // For ONE_TO_ONE messages
    groupName?: string; // For GROUP messages
  }>;
}

export interface NewOneToOneChatApprovalResponse extends BaseResponse {
  type: "NEW_ONE_TO_ONE_CHAT_AP";
  from?: string;
  to?: string;
  msg?: string;
  chatId?: string;
}

export interface MessageResponse extends BaseResponse {
  type: "MESSAGE";
  from: string;
  content: string;
  chatId: string;
}

export interface OneToOneChatHistoryResponse extends BaseResponse {
  type: "ONE_TO_ONE_CHAT_HISTORY";
  messages: ChatMessage[];
  isOnline: boolean;
  lastSeenTime?: string | null; // Optional, for displaying last seen time
}

export interface GroupChatCreatedResponse extends BaseResponse {
  type: "GROUP_CHAT_CREATED";
  groupId: string;
}

export interface GroupMemberJoinedResponse extends BaseResponse {
  type: "GROUP_MEMBER_JOINED";
  groupId: string;
  username: string;
}

export interface GroupChatHistoryResponse extends BaseResponse {
  type: "GROUP_CHAT_HISTORY";
  messages: GroupMessage[];
}

export interface GroupChatResponse extends BaseResponse {
  type: "GROUP_CHAT";
  from: string;
  groupId: string;
  content: string;
}

export interface StatusChangeResponse extends BaseResponse {
  type: "STATUS_CHANGE";
  username: string;
  status: "ONLINE" | "OFFLINE";
}

// Union type for all outgoing responses
export type OutgoingResponse =
  | ErrorResponse
  | InfoResponse
  | SuccessResponse
  | InitDataResponse
  | NewOneToOneChatApprovalResponse
  | MessageResponse
  | OneToOneChatHistoryResponse
  | GroupChatCreatedResponse
  | GroupMemberJoinedResponse
  | GroupChatHistoryResponse
  | GroupChatResponse
  | StatusChangeResponse;

// Data model types
export interface ChatMessage {
  id?: string;
  from: string;
  to: string;
  content?: string;
  chatId?: string;
}

export interface GroupMessage {
  id?: string;
  from: string;
  text: string;
  timestamp: string;
  groupId?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Friendship {
  id: string;
  user: string;
  friend: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  groupId: string;
  groupName: string;
  createdBy: string;
  createdAt: Date;
  members?: GroupMembership[];
}

export interface GroupMembership {
  id: string;
  group: string;
  user: string;
  joinedAt: Date;
}
