export interface IAlert {
  alertText: string;
  alertStatus: string;
}

export interface IAlertProps {
  props: IAlert;
}

export interface ISpinnerProps {
  top: number;
  left: number;
}

export interface ICostsHeaderProps {
  costs: ICosts[];
}

export interface ICosts {
  text: string;
  price: number;
  date: Date | string;
  _id?: number | string;
}

export interface IBaseEffectArgs {
  url: string;
  token: string;
}

export interface ICreateCost {
  url: string;
  cost: ICosts;
  token: string;
}

export interface IGetCost {
  url: string;
  token: string;
}

export interface IDeleteCost {
  url: string;
  token: string;
  id: number | string;
}

export interface IRefreshToken {
  url: string;
  token: string;
  username: string;
}

export interface IHandleAxiosPayload {
  type: string;
  createCost?: Partial<ICreateCost>;
  getCosts?: Partial<IBaseEffectArgs>;
  deleteCost?: Partial<IDeleteCost>;
  updateCost?: Partial<IUpdateCost>;
}

export interface ICostsItemProps {
  cost: ICosts;
  index: number;
}

export interface IUpdateCost {
  url: string;
  token: string;
  cost: ICosts;
  id: number | string;
}
