export type ValueOf<T extends object> = T[keyof T]

export interface IAnyObject {
  [k: string]: any
};