import React from 'react';
import { Globe, Flag } from 'lucide-react';

const COUNTRY_RESERVES = [
    { id: 'usa', country: 'Estados Unidos', btc: 208109, flagCode: 'us', type: 'Incautado' },
    { id: 'chn', country: 'China', btc: 194000, flagCode: 'cn', type: 'Incautado' },
    { id: 'gbr', country: 'Reino Unido', btc: 61000, flagCode: 'gb', type: 'Incautado' },
    { id: 'ukr', country: 'Ucrania', btc: 46351, flagCode: 'ua', type: 'Gobierno' },
    { id: 'btn', country: 'Bután', btc: 13014, flagCode: 'bt', type: 'Minería' },
    { id: 'slv', country: 'El Salvador', btc: 5929, flagCode: 'sv', type: 'Tesoro' },
];

export const CountryReserves = ({ currentPrice = 95800 }) => {
    const totalReserves = COUNTRY_RESERVES.reduce((acc, curr) => acc + curr.btc, 0);

    return (
        <div className="glass-panel h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Globe className="text-blue-400" size={20} />
                    <h2 className="font-bold text-lg text-blue-100">Reservas de Países</h2>
                </div>
                <div className="text-xs font-mono text-muted">
                    Total: <span className="text-blue-400 font-bold">{totalReserves.toLocaleString()} BTC</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-muted text-xs uppercase tracking-wider border-b border-white/5">
                            <th className="text-left pb-2 pl-2">País</th>
                            <th className="text-right pb-2">BTC</th>
                            <th className="text-right pb-2">Valor (USD)</th>
                            <th className="text-right pb-2 pr-2">Tipo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {COUNTRY_RESERVES.map((item) => (
                            <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                                <td className="py-3 pl-2">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://flagcdn.com/w40/${item.flagCode}.png`}
                                            srcSet={`https://flagcdn.com/w80/${item.flagCode}.png 2x`}
                                            alt={item.country}
                                            className="w-6 h-4 object-cover rounded shadow-sm"
                                        />
                                        <span className="font-medium text-gray-200">{item.country}</span>
                                    </div>
                                </td>
                                <td className="py-3 text-right font-mono font-bold text-blue-300">
                                    {item.btc.toLocaleString()}
                                </td>
                                <td className="py-3 text-right font-mono text-gray-400">
                                    ${((item.btc * currentPrice) / 1e9).toFixed(2)}B
                                </td>
                                <td className="py-3 text-right pr-2">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${item.type === 'Incautado' ? 'bg-red-500/10 text-red-400' :
                                        item.type === 'Minería' ? 'bg-yellow-500/10 text-yellow-400' :
                                            'bg-green-500/10 text-green-400'
                                        }`}>
                                        {item.type}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
