export interface Menu {
  name: string;
  route: string;
  icon: string;
  children?: Menu[];
}
