export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  jobTitle: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export type UserFormData = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  avatar?: string;
};
