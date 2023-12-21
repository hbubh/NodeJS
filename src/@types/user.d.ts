type IName = {
  first: string;
  middle?: string;
  last: string;
};

type IImage = {
  alt?: string;
  url?: string;
};

type IAddress = {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip?: number;
};

type IUser = {
  name: IName;
  phone: string;
  email: string;
  password: string;
  image?: IImage;
  address: IAddress;
  isBusiness: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
};
type ILogin = {
  email: string;
  password: string;
};
type IJWTPayload = {
  email: string;
  ait?: number;
};

export { IUser, IAddress, IImage, IName, ILogin, IJWTPayload };
