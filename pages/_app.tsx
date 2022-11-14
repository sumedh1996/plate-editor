import '../styles/globals.css'
import 'antd/dist/antd.variable.min.css';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
