export interface ShnellUser {
  email: string;
  name: string;
  phone: string;
  role: string;
  fcmToken?: string;
  balance?: number;
  vehicleType?: string;
  vehicleId?: string;
  matVehicle?: string;
  isActive?: boolean;
  darkMode: boolean;
  drivers? : string[];
}

export class ShnellUserModel implements ShnellUser {
  constructor(
    public email: string,
    public name: string,
    public phone: string,
    public role: string,
    public darkMode: boolean,
    public fcmToken?: string,
    public balance: number = 100.000001,
    public vehicleType?: string,
    public vehicleId?: string,
    public matVehicle?: string,
    public isActive: boolean = false,
    public drivers : string[] = [],

  ) {}

  static fromJson(json: any): ShnellUserModel {
    return new ShnellUserModel(
      json.email,
      json.name,
      json.phone,
      json.role,
      json.darkMode ?? true,
      json.fcmToken,
      Number(json.balance) ?? 100.000001,
      json.vehicleType,
      json.vehicleId,
      json.matVehicle,
      json.isActive ?? false,
      json.drivers ?? []
    );
  }

  toJson(): any {
    return {
      email: this.email,
      name: this.name,
      phone: this.phone,
      role: this.role,
      fcmToken: this.fcmToken,
      balance: this.balance,
      vehicleType: this.vehicleType,
      vehicleId: this.vehicleId,
      matVehicle: this.matVehicle,
      isActive: this.isActive,
      darkMode: this.darkMode ,
      drivers : this.drivers
    }}}
