import { NodeType } from "./enums";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface CreateNodeRequest {
  name: string;
  type: NodeType;
  info: string;
}

export interface UpdateNodeRequest {
  parent_id?: number;
  depth?: number;
  name?: string;
  type?: NodeType;
  info?: string;
}

export interface Node {
  id: number;
  parent_id?: number;
  depth: number;
  name: string;
  type: NodeType;
  info?: string;
  children?: Node[];
  children_count: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
