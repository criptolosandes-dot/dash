import React from 'react';
import { Flame, Snowflake, Shield, Zap, Lock, Smartphone } from 'lucide-react';

export const WalletsSection = () => {
    // Fallback icon component for when images don't load
    const WalletIcon = ({ letter, bgColor }) => (
        <div style={{
            width: 40,
            height: 40,
            background: bgColor,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>{letter}</span>
        </div>
    );

    return (
        <div className="grid grid-2 gap-8">
            {/* Wallet Caliente (Hot Wallet) */}
            <div className="glass-panel relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300">

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-500 border border-orange-500/20">
                            <Flame size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">WALLETS CALIENTES</h3>
                            <p className="text-xs text-muted uppercase tracking-wider font-bold">Uso Diario / Conexión Continua</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 mb-8">
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Ideales para <strong>transacciones rápidas y uso frecuente</strong>. Funcionan como tu billetera de bolsillo: mantén solo lo que necesitas para gastar a corto plazo.
                        </p>

                        <div className="grid grid-2 gap-3 mt-4">
                            <div className="flex items-center gap-2 text-xs text-orange-200 bg-orange-500/10 p-2 rounded-lg border border-orange-500/10">
                                <Zap size={14} />
                                <span>Alta Velocidad</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-orange-200 bg-orange-500/10 p-2 rounded-lg border border-orange-500/10">
                                <Smartphone size={14} />
                                <span>Acceso Móvil</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <span className="text-xs font-bold text-muted uppercase block mb-3">Recomendadas</span>
                        <div className="grid grid-2 gap-4">
                            <a href="https://electrum.org/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500/10 transition-colors">
                                <WalletIcon letter="E" bgColor="#1E5F74" />
                                <span className="text-sm text-white font-bold">Electrum</span>
                            </a>
                            <a href="https://bluewallet.io/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500/10 transition-colors">
                                <WalletIcon letter="B" bgColor="#0066FF" />
                                <span className="text-sm text-white font-bold">BlueWallet</span>
                            </a>
                            <a href="https://blockstream.com/green/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500/10 transition-colors">
                                <WalletIcon letter="G" bgColor="#00B45A" />
                                <span className="text-sm text-white font-bold">Blockstream Green</span>
                            </a>
                            <a href="https://nunchuk.io/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500/10 transition-colors">
                                <WalletIcon letter="N" bgColor="#F7931A" />
                                <span className="text-sm text-white font-bold">Nunchuk</span>
                            </a>
                            <a href="https://sparrowwallet.com/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500/10 transition-colors" style={{ gridColumn: 'span 2' }}>
                                <WalletIcon letter="S" bgColor="#2D4263" />
                                <span className="text-sm text-white font-bold">Sparrow Wallet</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wallet Fría (Cold Wallet) */}
            <div className="glass-panel relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/20">
                            <Snowflake size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">WALLETS FRÍAS</h3>
                            <p className="text-xs text-muted uppercase tracking-wider font-bold">Seguridad Máxima / HODL</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 mb-8">
                        <p className="text-gray-300 leading-relaxed text-sm">
                            La bóveda de seguridad para tus ahorros. Mantienen tus claves privadas <strong>fuera de internet</strong> (offline), protegiéndote contra hackeos remotos.
                        </p>

                        <div className="grid grid-2 gap-3 mt-4">
                            <div className="flex items-center gap-2 text-xs text-cyan-200 bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/10">
                                <Shield size={14} />
                                <span>Máxima Seguridad</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-cyan-200 bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/10">
                                <Lock size={14} />
                                <span>100% Offline</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <span className="text-xs font-bold text-muted uppercase block mb-3">Recomendadas (Hardware)</span>
                        <div className="grid grid-2 gap-4">
                            <a href="https://trezor.io/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/10 transition-colors">
                                <WalletIcon letter="T" bgColor="#00854D" />
                                <span className="text-sm text-white font-bold">Trezor Safe 3</span>
                            </a>
                            <a href="https://bitbox.swiss/bitbox02/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/10 transition-colors">
                                <WalletIcon letter="B" bgColor="#F7931A" />
                                <span className="text-sm text-white font-bold">BitBox02</span>
                            </a>
                            <a href="https://blockstream.com/jade/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/10 transition-colors">
                                <WalletIcon letter="J" bgColor="#00B45A" />
                                <span className="text-sm text-white font-bold">Jade Blockstream</span>
                            </a>
                            <a href="https://keyst.one/" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/10 transition-colors">
                                <WalletIcon letter="K" bgColor="#1E3A5F" />
                                <span className="text-sm text-white font-bold">Keystone</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
