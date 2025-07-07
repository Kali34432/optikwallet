import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';

export interface WalletInfo {
  name: string;
  address: string;
  balance: number;
  keypair: Keypair;
  createdAt: string;
}

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export const generateWallet = (): Keypair => {
  return Keypair.generate();
};

export const getSOLBalance = async (address: string): Promise<number> => {
  try {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
};

export const getConnection = () => connection;