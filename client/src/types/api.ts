export interface LoginRequest {
  username: string;
  password: string;
}
export interface SignUpRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string
}

export interface LoginResponse {
  Authorization: string;
  refreshToken: string;
}

// type ServerTypes = 'mikrotik_openvpn' | 'pritunl_udp';
// type BuyTypes = 'monthly' | 'hourly';

// export interface ConnectionModel {
//   buy_type: BuyTypes;
//   connection_type: ServerTypes;
//   created_date: string;
//   disable: boolean;
//   enable_expire_date: boolean;
//   expire_date: string;
//   id: string;
//   server_id: string;
//   user_id: string;
//   username: string;
// }
// export interface ServerModel {
//   server_type: ServerTypes;
//   username: string;
//   alias: string;
//   ip: string;
//   id: string;
//   wholesaler_hourly_price: number;
//   wholesaler_monthly_price: number;
//   customer_hourly_price: number;
//   customer_monthly_price: number;
// }
// export interface AddConnectionPayload {
//   username: string;
//   password: string;
//   buy_type: BuyTypes;
//   expire_date: string;
//   enable_expire_date: boolean;
//   connection_type: ServerTypes;
//   serverIp: string;
// }
// export interface UpdateConnectionPayload {
//   username: string;
//   buy_type: BuyTypes;
//   expire_date: string;
//   enable_expire_date: boolean;
// }

// export interface DeleteOrDownlaodConnectionPayload {
//   connection_id: string;
// }

// export interface AddServerPayload {
//   server_type: ServerTypes;
//   config_file: string;
//   password: string;
//   username: string;
//   alias: string;
//   ip: string;
//   wholesaler_hourly_price: number;
//   wholesaler_monthly_price: number;
//   customer_hourly_price: number;
//   customer_monthly_price: number;
// }
// export interface EditServerPayload {
//   ip: string;
//   alias: string;
//   config_file: string;
//   wholesaler_hourly_price: number;
//   wholesaler_monthly_price: number;
//   customer_hourly_price: number;
//   customer_monthly_price: number;
// }
// export interface DeleteServerPayload {
//   ip: string;
// }
