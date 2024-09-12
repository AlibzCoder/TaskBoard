export interface RegisterDto {
	email: string;
	username: string;
	firstName: string,
	lastName: string,
	password: string
}

export interface LoginDto {
	username: string;
	password: string;
}

export interface UserUpdateDto {
	email: string;
	firstName: string,
	lastName: string,
	password: string,
	prevPassword: string
}
