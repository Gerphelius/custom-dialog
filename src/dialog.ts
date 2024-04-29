export interface ComponentType<T> {
  new (...args: any[]): T;
}

export interface DialogConfig {
  options?: any;
  data?: any;
}

export interface Dialog {
  component: ComponentType<any>;
  config?: DialogConfig;
}
