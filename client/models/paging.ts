export type Paging<T> = {
  items: T[];
  totalItems: number;
  hasMore: boolean;
  currentPage: number;
};
