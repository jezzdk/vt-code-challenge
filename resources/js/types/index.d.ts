export enum NodeType {
  Other = 0,
  Manager = 1,
  Developer = 2,
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
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
