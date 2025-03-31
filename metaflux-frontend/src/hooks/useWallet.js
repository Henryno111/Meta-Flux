import { useWalletContext } from "../components/providers/wallet-provider";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";

export function useWallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnecting, setIsConnecting } = useWalletContext();
  const { data: balance } = useBalance({
    address,
  });

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Handle connect
  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      connect({ connector: connectors[0] });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle disconnect
  const handleDisconnect = () => {
    disconnect();
  };

  return {
    address,
    isConnected,
    status,
    isPending: isPending || isConnecting,
    balance,
    formatAddress,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
}