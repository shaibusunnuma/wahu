export interface RegisterUserDto {
  email: string;
  password: string;
}

export interface ProfileDto {
  firstName: string;
  lastName: string;
  address?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  //TODO: Add more fields as needed
}

export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
  phone?: string;
};
