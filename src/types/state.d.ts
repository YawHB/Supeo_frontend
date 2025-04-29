declare type ReactState<T> = [
  value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>
];
