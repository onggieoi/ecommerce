export type Paging<T> = {
  items: T[];
  totalCount: number;
  hasMore: boolean;
};
