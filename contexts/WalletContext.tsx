import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Keypair, PublicKey } from '@solana/web3.js';
import { generateWallet, getSOLBalance, WalletInfo } from '../utils/solana';

interface WalletState {
  wallets: WalletInfo[];
  currentWallet: WalletInfo | null;
  isLoading: boolean;
  error: string | null;
}

type WalletAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_WALLET'; payload: WalletInfo }
  | { type: 'SET_CURRENT_WALLET'; payload: WalletInfo | null }
  | { type: 'UPDATE_WALLET_BALANCE'; payload: { address: string; balance: number } }
  | { type: 'LOAD_WALLETS'; payload: WalletInfo[] };

const initialState: WalletState = {
  wallets: [],
  currentWallet: null,
  isLoading: false,
  error: null,
};

function walletReducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'ADD_WALLET':
      return {
        ...state,
        wallets: [...state.wallets, action.payload],
        currentWallet: state.currentWallet || action.payload,
      };
    case 'SET_CURRENT_WALLET':
      return { ...state, currentWallet: action.payload };
    case 'UPDATE_WALLET_BALANCE':
      return {
        ...state,
        wallets: state.wallets.map(wallet =>
          wallet.address === action.payload.address
            ? { ...wallet, balance: action.payload.balance }
            : wallet
        ),
        currentWallet: state.currentWallet?.address === action.payload.address
          ? { ...state.currentWallet, balance: action.payload.balance }
          : state.currentWallet,
      };
    case 'LOAD_WALLETS':
      return {
        ...state,
        wallets: action.payload,
        currentWallet: action.payload[0] || null,
      };
    default:
      return state;
  }
}

const WalletContext = createContext<{
  state: WalletState;
  createWallet: (name: string) => Promise<void>;
  switchWallet: (wallet: WalletInfo) => void;
  refreshBalance: (address: string) => Promise<void>;
} | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const createWallet = async (name: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const keypair = generateWallet();
      const address = keypair.publicKey.toBase58();
      const balance = await getSOLBalance(address);
      
      const wallet: WalletInfo = {
        name,
        address,
        balance,
        keypair,
        createdAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_WALLET', payload: wallet });
      saveWalletToStorage(wallet);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create wallet' });
    }
  };

  const switchWallet = (wallet: WalletInfo) => {
    dispatch({ type: 'SET_CURRENT_WALLET', payload: wallet });
  };

  const refreshBalance = async (address: string) => {
    try {
      const balance = await getSOLBalance(address);
      dispatch({ type: 'UPDATE_WALLET_BALANCE', payload: { address, balance } });
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  };

  const saveWalletToStorage = (wallet: WalletInfo) => {
    const wallets = JSON.parse(localStorage.getItem('optik-wallets') || '[]');
    const walletData = {
      name: wallet.name,
      address: wallet.address,
      secretKey: Array.from(wallet.keypair.secretKey),
      createdAt: wallet.createdAt,
    };
    wallets.push(walletData);
    localStorage.setItem('optik-wallets', JSON.stringify(wallets));
  };

  const loadWalletsFromStorage = () => {
    try {
      const stored = localStorage.getItem('optik-wallets');
      if (stored) {
        const walletData = JSON.parse(stored);
        const wallets = walletData.map((data: any) => ({
          name: data.name,
          address: data.address,
          balance: 0,
          keypair: Keypair.fromSecretKey(new Uint8Array(data.secretKey)),
          createdAt: data.createdAt,
        }));
        dispatch({ type: 'LOAD_WALLETS', payload: wallets });
        
        // Refresh balances for all wallets
        wallets.forEach((wallet: WalletInfo) => {
          refreshBalance(wallet.address);
        });
      }
    } catch (error) {
      console.error('Failed to load wallets from storage:', error);
    }
  };

  useEffect(() => {
    loadWalletsFromStorage();
  }, []);

  return (
    <WalletContext.Provider value={{ state, createWallet, switchWallet, refreshBalance }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return {
    ...context.state,
    createWallet: context.createWallet,
    switchWallet: context.switchWallet,
    refreshBalance: context.refreshBalance,
  };
}

export { WalletContext }