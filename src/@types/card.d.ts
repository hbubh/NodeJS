export type ICard = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  address: IAddress;
  image: Image;
};

export type ICardS = ICard & {
  bizNumber?: number;
  userId?: string;

  _id?: string;
  likes: string[];
  createdAt: Date;
};
