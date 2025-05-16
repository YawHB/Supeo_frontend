declare type ToastOptions = {
  title: string
  wide?: boolean
  autoClose?: boolean
  type?: `success` | `error` | `info` | `warning`
  position?: `top-left` | `top-right` | `bottom-left` | `bottom-right`
}
