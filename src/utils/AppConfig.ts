const AppConfig = {
  site_name: 'NFTMagics',
  title: 'NFTMagics',
  description:
    '',
  locale: 'en',
  NETWORK: process.env.NEXT_PUBLIC_NETWORK,
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
  MULTICALL: process.env.NEXT_PUBLIC_MULTICALL,
  MULTICALL_DIVISOR: process.env.NEXT_PUBLIC_MULTICALL_DIVISOR,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
};
export default AppConfig;
