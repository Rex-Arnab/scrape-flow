export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE"
}

export type CreditsPack = {
  id: PackId;
  name: string;
  label: string;
  credits: number;
  price: number;
  priceId: string;
};

export const CreditsPack: CreditsPack[] = [
  {
    id: PackId.SMALL,
    name: "Small Pack",
    label: "1,000 credits",
    credits: 1000,
    price: 999,
    priceId: "price_1R2bCvGMUV7M4jb6bIjxbZep"
  },
  {
    id: PackId.MEDIUM,
    name: "Medium Pack",
    label: "5,000 credits",
    credits: 5000,
    price: 3999,
    priceId: "price_1R2bDdGMUV7M4jb6cQGIcNae"
  },
  {
    id: PackId.LARGE,
    name: "Large Pack",
    label: "10,000 credits",
    credits: 10000,
    price: 6999,
    priceId: "price_1R2bE1GMUV7M4jb6BJfHLN1X"
  }
];

export const getCreditsPack = (id: PackId) =>
  CreditsPack.find((p) => p.id === id);
