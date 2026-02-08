import React, { useState } from 'react';
import { BookOpen, Coins, Blocks, Clock, TrendingDown, ChevronDown, ChevronUp, Bitcoin, Sparkles } from 'lucide-react';

const topics = [
    {
        id: 'bitcoin',
        icon: Bitcoin,
        title: '¿Qué es Bitcoin?',
        color: '#F7931A',
        emoji: '🪙',
        content: `
            <p><strong>Imagina que tienes un cofre mágico</strong> que nadie puede abrir excepto tú, y que funciona sin bancos ni adultos controlando tu dinero.</p>
            
            <p>Bitcoin es como <strong>dinero digital mágico</strong> que existe solo en internet. Pero no es como el dinero del videojuego que puede desaparecer ¡este es REAL!</p>
            
            <h4>🎮 Piénsalo así:</h4>
            <ul>
                <li>Es como tener <strong>monedas de oro en un videojuego</strong>, pero que puedes usar en el mundo real</li>
                <li>No existe en billetes ni monedas físicas, <strong>solo existe en computadoras</strong></li>
                <li>Nadie lo controla: ni gobiernos, ni bancos, <strong>ni siquiera tus papás pueden quitártelo</strong> si tú tienes la contraseña</li>
            </ul>

            <h4>✨ Lo más genial de Bitcoin:</h4>
            <ul>
                <li><strong>Solo habrá 21 millones</strong> - Es como tener cartas coleccionables súper raras que nunca se harán más</li>
                <li>Puedes enviar Bitcoin a cualquier persona en el mundo, ¡aunque esté en China o en la Luna! 🚀</li>
                <li>Funciona 24/7, los 365 días del año - ¡nunca cierra como los bancos!</li>
            </ul>

            <div class="highlight-box">
                <strong>🧠 Dato curioso:</strong> Nadie sabe quién inventó Bitcoin. Solo conocemos su apodo: <em>Satoshi Nakamoto</em>. ¡Es como un superhéroe anónimo del dinero!
            </div>
        `
    },
    {
        id: 'blockchain',
        icon: Blocks,
        title: '¿Qué es la Cadena de Bloques?',
        color: '#627EEA',
        emoji: '🧱',
        content: `
            <p>¿Recuerdas cuando jugabas con bloques LEGO y los conectabas uno tras otro? <strong>¡La blockchain funciona exactamente igual!</strong></p>

            <h4>📚 Imagina un cuaderno mágico:</h4>
            <ul>
                <li>Es como un <strong>cuaderno gigante</strong> donde se escriben todas las transacciones de Bitcoin</li>
                <li>Cada página del cuaderno es un <strong>"bloque"</strong></li>
                <li>Las páginas están <strong>encadenadas</strong> una con otra (por eso se llama "cadena de bloques")</li>
            </ul>

            <h4>🔐 ¿Por qué es tan seguro?</h4>
            <ul>
                <li><strong>Miles de copias:</strong> Este cuaderno existe en miles de computadoras al mismo tiempo</li>
                <li><strong>Imposible de borrar:</strong> Una vez que escribes algo, ¡nadie puede borrarlo jamás!</li>
                <li><strong>Todos pueden verlo:</strong> Cualquiera puede leer el cuaderno, pero nadie puede hacer trampa</li>
            </ul>

            <div class="highlight-box">
                <strong>🎯 En simple:</strong> Es como si toda tu clase tuviera una copia del mismo cuaderno de tareas. Si alguien intenta cambiar sus notas, ¡todos los demás sabrían que hizo trampa porque sus cuadernos dicen algo diferente!
            </div>
        `
    },
    {
        id: 'halving',
        icon: Clock,
        title: '¿Qué es el Halving?',
        color: '#FFD700',
        emoji: '⏰',
        content: `
            <p>El <strong>Halving</strong> es uno de los eventos más emocionantes de Bitcoin. <strong>¡Pasa solo cada 4 años!</strong></p>

            <h4>🍕 Imagina que horneas pizzas:</h4>
            <ul>
                <li>Al principio, cada vez que horneas, obtienes <strong>50 rebanadas</strong></li>
                <li>Después de 4 años, solo obtienes <strong>25 rebanadas</strong></li>
                <li>Otros 4 años después, solo <strong>12.5 rebanadas</strong></li>
                <li>¡Y así sucesivamente hasta que casi no queden rebanadas nuevas!</li>
            </ul>

            <h4>💎 ¿Por qué es importante?</h4>
            <ul>
                <li><strong>Escasez:</strong> Cada vez se crean menos Bitcoins nuevos</li>
                <li><strong>Valor:</strong> Lo que es más difícil de conseguir, usualmente vale más</li>
                <li>Es como las cartas Pokémon raras: <strong>entre menos hay, más valen</strong></li>
            </ul>

            <div class="highlight-box">
                <strong>📅 Dato importante:</strong> El último Bitcoin se creará aproximadamente en el año <strong>2140</strong>. ¡Tus tatara-tatara-nietos verán el último Bitcoin!
            </div>

            <h4>📊 Historia de los Halvings:</h4>
            <table class="halving-table">
                <thead>
                    <tr>
                        <th>Año</th>
                        <th>Recompensa</th>
                        <th>Precio aprox.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>2009</td><td>50 BTC</td><td>$0</td></tr>
                    <tr><td>2012</td><td>25 BTC</td><td>$12</td></tr>
                    <tr><td>2016</td><td>12.5 BTC</td><td>$650</td></tr>
                    <tr><td>2020</td><td>6.25 BTC</td><td>$8,500</td></tr>
                    <tr><td>2024</td><td>3.125 BTC</td><td>$63,000</td></tr>
                </tbody>
            </table>
        `
    },
    {
        id: 'altcoins',
        icon: Coins,
        title: '¿Qué son las Altcoins?',
        color: '#8B5CF6',
        emoji: '🎮',
        content: `
            <p><strong>"Altcoin"</strong> significa <strong>"moneda alternativa"</strong>. Son todas las criptomonedas que NO son Bitcoin.</p>

            <h4>🎪 Ejemplos famosos:</h4>
            <ul>
                <li><strong>Ethereum (ETH):</strong> Es como una computadora mundial</li>
                <li><strong>Solana (SOL):</strong> Presume ser muy rápida</li>
                <li><strong>Dogecoin (DOGE):</strong> Empezó como un chiste con un perro</li>
            </ul>

            <h4 style="color: #F7931A;">👑 ¿Por qué Bitcoin SIEMPRE será el Rey?</h4>
            
            <div class="warning-box">
                <p><strong>⚠️ Las altcoins NO son iguales a Bitcoin. Aquí está la verdad:</strong></p>
            </div>

            <ul class="king-list">
                <li>
                    <strong>🥇 Fue el PRIMERO:</strong> 
                    Bitcoin nació en 2009. Es el original, las demás son imitaciones.
                </li>
                <li>
                    <strong>🔒 Es el más SEGURO:</strong> 
                    Tiene la red de computadoras más grande del mundo protegiéndolo. Las altcoins pueden ser hackeadas más fácilmente.
                </li>
                <li>
                    <strong>👤 NO tiene dueño:</strong> 
                    La mayoría de altcoins tienen empresas o personas que las controlan. Bitcoin no tiene jefe.
                </li>
                <li>
                    <strong>📜 Reglas que NO cambian:</strong> 
                    Solo habrá 21 millones de Bitcoin. Siempre. Las altcoins pueden cambiar sus reglas cuando quieran.
                </li>
                <li>
                    <strong>⏳ Más de 15 años funcionando:</strong> 
                    Nunca ha fallado. Muchas altcoins han muerto o resultado ser estafas.
                </li>
            </ul>

            <div class="highlight-box bitcoin-special">
                <strong>💡 Conclusión:</strong> Las altcoins son como experimentos divertidos, pero Bitcoin es <strong>oro digital</strong>. ¡Las altcoins van y vienen, Bitcoin permanece!
            </div>

            <p class="final-note">
                <em>Recuerda: En el mundo cripto, Bitcoin es como el oro. Las altcoins son como los juguetes de moda: hoy todos los quieren, mañana nadie los recuerda.</em>
            </p>
        `
    },
    {
        id: 'when-to-buy',
        icon: TrendingDown,
        title: '¿Es buen momento para comprar Bitcoin?',
        color: '#10B981',
        emoji: '🛒',
        content: `
            <div class="highlight-box bitcoin-special">
                <strong>🎯 La respuesta corta:</strong> Bitcoin SIEMPRE será "barato" cuando mires hacia atrás en el futuro. No importa si compras en mínimos o máximos, lo importante es <strong>TENER Bitcoin</strong>.
            </div>

            <h4>📊 La historia nos enseña:</h4>
            <ul>
                <li>En 2015, la gente decía que $200 era "muy caro" para Bitcoin</li>
                <li>En 2017, decían que $5,000 era "muy caro"</li>
                <li>En 2020, decían que $10,000 era "muy caro"</li>
                <li>Hoy, esos mismos precios parecen <strong>REGALADOS</strong></li>
            </ul>

            <h4>⏳ La paciencia es la clave:</h4>
            <ul>
                <li><strong>No intentes "adivinar" el precio perfecto</strong> - Nadie puede predecir el mercado</li>
                <li><strong>Compra poco a poco</strong> - Así no importa si el precio sube o baja</li>
                <li><strong>Piensa a largo plazo</strong> - Mínimo 4 años (un ciclo de halving)</li>
            </ul>

            <div class="warning-box">
                <p><strong>⚠️ NUNCA inviertas dinero que necesitas</strong> para vivir, comer o pagar cuentas. Solo invierte lo que puedas olvidar por años.</p>
            </div>

            <h4>🧘 Mentalidad ganadora:</h4>
            <p>Los que se hicieron ricos con Bitcoin NO fueron los que compraron en el precio más bajo. Fueron los que <strong>compraron y NO vendieron</strong>. La paciencia siempre gana.</p>

            <div class="highlight-box">
                <strong>💡 Consejo de oro:</strong> "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es AHORA." Lo mismo aplica para Bitcoin.
            </div>
        `
    },
    {
        id: 'security',
        icon: Blocks,
        title: '¿Es Bitcoin seguro o me lo pueden hackear?',
        color: '#EF4444',
        emoji: '🔐',
        content: `
            <div class="highlight-box bitcoin-special">
                <strong>✅ Respuesta directa:</strong> La red de Bitcoin NUNCA ha sido hackeada en más de 15 años. Es el sistema informático más seguro que existe en el mundo.
            </div>

            <h4>🏰 ¿Por qué es tan seguro?</h4>
            <ul>
                <li><strong>Miles de computadoras lo protegen:</strong> Para hackear Bitcoin, necesitarías controlar más de la mitad de todas las computadoras del mundo que lo protegen. ¡Imposible!</li>
                <li><strong>Matemáticas irrompibles:</strong> Usa el mismo tipo de seguridad que protege los secretos militares</li>
                <li><strong>Funciona 24/7 desde 2009:</strong> Nunca ha dejado de funcionar, ni un solo segundo</li>
            </ul>

            <h4>⚠️ PERO... ¿Qué SÍ pueden hackear?</h4>
            <div class="warning-box">
                <p><strong>Lo que debes proteger es TU billetera, no Bitcoin en sí:</strong></p>
            </div>
            <ul class="king-list">
                <li><strong>🔑 Tu contraseña (clave privada):</strong> Si alguien la obtiene, puede robar tu Bitcoin</li>
                <li><strong>📱 Tu teléfono o computadora:</strong> Si tienen virus, pueden robar tus datos</li>
                <li><strong>🎣 Estafas (phishing):</strong> Sitios falsos que se hacen pasar por exchanges</li>
                <li><strong>👤 Ingeniería social:</strong> Personas que te engañan para que les des tu información</li>
            </ul>

            <h4>🛡️ Cómo protegerte:</h4>
            <ul>
                <li><strong>Usa una hardware wallet</strong> (Ledger, Trezor) para cantidades grandes</li>
                <li><strong>NUNCA compartas</strong> tu frase semilla de 12/24 palabras con NADIE</li>
                <li><strong>Activa 2FA</strong> en todos los exchanges</li>
                <li><strong>Desconfía</strong> de quien te prometa duplicar tu Bitcoin</li>
            </ul>

            <div class="highlight-box">
                <strong>🧠 Recuerda:</strong> "Not your keys, not your coins" (Si no tienes las llaves, no son tus monedas). Guarda tu Bitcoin en TU billetera, no en exchanges.
            </div>
        `
    },
    {
        id: 'price-determination',
        icon: TrendingDown,
        title: '¿Cómo se determina el precio de Bitcoin?',
        color: '#3B82F6',
        emoji: '📈',
        content: `
            <p>El precio de Bitcoin funciona igual que el precio de cualquier cosa: <strong>oferta y demanda</strong>. ¡Como las cartas coleccionables!</p>

            <h4>⚖️ La fórmula mágica:</h4>
            <ul>
                <li><strong>Mucha gente quiere comprar + Pocas monedas disponibles = Precio SUBE ⬆️</strong></li>
                <li><strong>Poca gente quiere comprar + Muchas monedas en venta = Precio BAJA ⬇️</strong></li>
            </ul>

            <h4>🎯 ¿Qué hace que la gente quiera comprar?</h4>
            <ul>
                <li><strong>Noticias positivas:</strong> Empresas grandes comprando, países adoptándolo</li>
                <li><strong>Halvings:</strong> Cuando se reduce la cantidad de nuevos Bitcoin</li>
                <li><strong>Inflación:</strong> Cuando el dinero "normal" pierde valor</li>
                <li><strong>Moda/FOMO:</strong> Cuando todos hablan de Bitcoin y no quieres quedarte fuera</li>
            </ul>

            <h4>📉 ¿Qué hace que la gente venda?</h4>
            <ul>
                <li><strong>Noticias negativas:</strong> Regulaciones, prohibiciones, hackeos de exchanges</li>
                <li><strong>Miedo:</strong> Cuando el precio cae mucho y la gente entra en pánico</li>
                <li><strong>Problemas económicos:</strong> Cuando la gente necesita dinero urgente</li>
            </ul>

            <div class="highlight-box">
                <strong>💡 Dato importante:</strong> NO hay un "jefe" que decide el precio. El precio es decidido por millones de personas comprando y vendiendo en miles de exchanges alrededor del mundo, ¡24 horas al día!
            </div>

            <h4>🏆 La escasez es el secreto:</h4>
            <p>Solo existirán <strong>21 millones de Bitcoin</strong>. Mientras más gente quiera tener Bitcoin y menos haya disponible, más subirá el precio. Es matemática simple.</p>
        `
    },
    {
        id: 'lightning-network',
        icon: Sparkles,
        title: '¿Qué es Lightning Network?',
        color: '#FBBF24',
        emoji: '⚡',
        content: `
            <p><strong>Lightning Network</strong> es como una "autopista express" construida encima de Bitcoin para hacer pagos <strong>súper rápidos y casi gratis</strong>.</p>

            <h4>🚗 Imagina las carreteras:</h4>
            <ul>
                <li><strong>Bitcoin normal:</strong> Es como la carretera principal. Segura pero a veces hay tráfico (tarda 10 minutos)</li>
                <li><strong>Lightning:</strong> Es como un túnel express. ¡Llegas en SEGUNDOS!</li>
            </ul>

            <h4>✨ ¿Por qué es genial?</h4>
            <ul>
                <li><strong>⚡ Velocidad:</strong> Transacciones en menos de 1 segundo</li>
                <li><strong>💸 Casi gratis:</strong> Las comisiones son fracciones de centavo</li>
                <li><strong>♾️ Escalable:</strong> Puede manejar millones de transacciones por segundo</li>
                <li><strong>☕ Micropagos:</strong> Puedes pagar hasta un café de $2 sin problemas</li>
            </ul>

            <h4>🌍 ¿Dónde se usa?</h4>
            <ul>
                <li><strong>El Salvador:</strong> Todo un país usando Lightning para pagos diarios</li>
                <li><strong>Twitter/X:</strong> Propinas instantáneas a creadores de contenido</li>
                <li><strong>Juegos:</strong> Ganar satoshis jugando videojuegos</li>
                <li><strong>Tiendas online:</strong> Comercios que aceptan Bitcoin sin esperar confirmaciones</li>
            </ul>

            <div class="highlight-box bitcoin-special">
                <strong>🎮 En simple:</strong> Si Bitcoin es el oro digital (para guardar valor), Lightning es el efectivo digital (para gastar rápido). ¡Lo mejor de ambos mundos!
            </div>
        `
    },
    {
        id: 'hodl',
        icon: Clock,
        title: '¿Qué es HODL?',
        color: '#F59E0B',
        emoji: '💎',
        content: `
            <p><strong>HODL</strong> es la palabra más famosa del mundo Bitcoin. Es un error de escritura que se volvió leyenda.</p>

            <h4>📜 El origen legendario:</h4>
            <p>En 2013, un usuario de un foro estaba muy nervioso porque el precio de Bitcoin estaba cayendo. Quiso escribir "I AM HOLDING" (estoy manteniendo), pero estaba tan ansioso que escribió <strong>"I AM HODLING"</strong>. ¡Y el término se volvió viral!</p>

            <div class="highlight-box bitcoin-special">
                <strong>💎 HODL significa:</strong> Comprar Bitcoin y <strong>NO vender pase lo que pase</strong>. Sin importar si el precio sube o baja. Mantener durante años.
            </div>

            <h4>🦾 La mentalidad HODL:</h4>
            <ul>
                <li><strong>"Manos de diamante" 💎🙌:</strong> No vender ni cuando el precio cae 50%</li>
                <li><strong>"Manos de papel" 📄🙌:</strong> Vender en pánico cuando hay miedo (¡no seas así!)</li>
            </ul>

            <h4>📊 ¿Por qué funciona?</h4>
            <ul>
                <li>Históricamente, TODOS los que han mantenido Bitcoin por <strong>4+ años</strong> han ganado dinero</li>
                <li>Los que intentan "comprar bajo y vender alto" casi siempre pierden</li>
                <li>La paciencia vence a la inteligencia en Bitcoin</li>
            </ul>

            <h4>🎯 Variantes divertidas:</h4>
            <ul>
                <li><strong>HODL:</strong> Hold On for Dear Life (Aguanta por tu vida)</li>
                <li><strong>BUIDL:</strong> Build (Construir) - Contribuir al ecosistema</li>
                <li><strong>WAGMI:</strong> We're All Gonna Make It (Todos lo lograremos)</li>
            </ul>

            <div class="highlight-box">
                <strong>🧘 Filosofía HODL:</strong> "El tiempo en el mercado es más importante que intentar cronometrar el mercado." Solo compra, guarda, y vive tu vida. Bitcoin trabajará por ti.
            </div>
        `
    },
    {
        id: 'explain-family',
        icon: BookOpen,
        title: '¿Cómo explicar Bitcoin a mis padres o abuelos?',
        color: '#EC4899',
        emoji: '👨‍👩‍👧',
        content: `
            <p>Explicar Bitcoin a la familia puede ser difícil. Aquí tienes <strong>explicaciones probadas</strong> que cualquiera puede entender:</p>

            <h4>🎯 Explicación en 30 segundos:</h4>
            <div class="highlight-box bitcoin-special">
                <p>"Bitcoin es como <strong>oro digital</strong>. Es dinero que existe en internet, pero nadie lo controla - ni bancos, ni gobiernos. Solo hay una cantidad limitada (como el oro), por eso es valioso. Y puedes enviarlo a cualquier persona en el mundo en minutos."</p>
            </div>

            <h4>💰 Para los que entienden de dinero:</h4>
            <p>"¿Recuerdas cuando el dólar valía más? Los gobiernos imprimen más dinero cada año, y por eso todo sube de precio. Bitcoin es lo opuesto: <strong>solo habrá 21 millones</strong>, nunca más. Es como tener una cuenta de ahorros que el gobierno no puede tocar ni devaluar."</p>

            <h4>📧 Para los que usan internet:</h4>
            <p>"Es como enviar un email con dinero. Antes, para mandar dinero a otro país, necesitabas bancos, días de espera y comisiones altas. Con Bitcoin, es como enviar un email: <strong>llega en minutos a cualquier parte del mundo</strong>."</p>

            <h4>🏠 Para los más tradicionales:</h4>
            <p>"Imagina que hay un edificio de apartamentos con solo 21 millones de departamentos. Nunca se construirán más. Cada vez más gente quiere vivir ahí, pero los departamentos no aumentan. <strong>¿Qué pasa con el precio?</strong> Exacto, sube."</p>

            <h4>⚠️ Respondiendo sus dudas comunes:</h4>
            <ul class="king-list">
                <li><strong>"¿No es dinero de criminales?"</strong> - El 99% del lavado de dinero se hace con dólares. Bitcoin es más rastreable que el efectivo.</li>
                <li><strong>"¿No puede desaparecer?"</strong> - Funciona en miles de computadoras en todo el mundo. Tendrías que apagar todo internet para detenerlo.</li>
                <li><strong>"¿No es muy tarde para entrar?"</strong> - Solo el 2% del mundo tiene Bitcoin. Estamos MUY temprano.</li>
                <li><strong>"¿Y si el gobierno lo prohíbe?"</strong> - China lo prohibió 10 veces y sigue funcionando. Es imposible de detener.</li>
            </ul>

            <div class="highlight-box">
                <strong>💡 Consejo final:</strong> No trates de convencer a nadie. Planta la semilla y déjalos investigar. Cuando el precio suba, te preguntarán cómo comprar. 😉
            </div>
        `
    },
    {
        id: 'fiat-history',
        icon: TrendingDown,
        title: '¿Por qué todas las monedas desaparecen?',
        color: '#DC2626',
        emoji: '💀',
        content: `
            <div class="warning-box">
                <p><strong>⚠️ Dato impactante:</strong> En la historia de la humanidad, <strong>TODAS las monedas "fiat" (hechas por gobiernos)</strong> han terminado valiendo CERO. El 100% ha fracasado.</p>
            </div>

            <h4>💀 El cementerio de monedas:</h4>
            <table class="halving-table">
                <thead>
                    <tr>
                        <th>Moneda</th>
                        <th>País</th>
                        <th>Duración</th>
                        <th>Destino</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Denario Romano</td><td>Roma</td><td>~300 años</td><td>💀 Devaluado 99%</td></tr>
                    <tr><td>Marco Alemán</td><td>Alemania</td><td>~50 años</td><td>💀 Hiperinflación 1923</td></tr>
                    <tr><td>Peso Argentino</td><td>Argentina</td><td>Varios</td><td>💀 +5 colapsos</td></tr>
                    <tr><td>Bolívar</td><td>Venezuela</td><td>~120 años</td><td>💀 -99.99% valor</td></tr>
                    <tr><td>Dólar Zimbabwe</td><td>Zimbabwe</td><td>~28 años</td><td>💀 Billones por pan</td></tr>
                </tbody>
            </table>

            <h4>🇺🇸 ¿Y el Dólar Americano?</h4>
            <div class="highlight-box bitcoin-special">
                <p>El dólar ha perdido <strong>más del 97% de su poder de compra</strong> desde 1913 (cuando se creó la Reserva Federal). Lo que costaba $1 en 1913, hoy cuesta más de $30.</p>
            </div>

            <h4>📉 ¿Por qué los gobiernos destruyen su propia moneda?</h4>
            <ul class="king-list">
                <li><strong>🖨️ Imprimen dinero sin control:</strong> Cuando necesitan pagar deudas o guerras, simplemente imprimen más billetes. Esto roba valor a tu dinero ahorrado.</li>
                <li><strong>🏦 Deuda infinita:</strong> Los gobiernos piden prestado más de lo que pueden pagar. La única "solución" es devaluar la moneda.</li>
                <li><strong>🗳️ Políticos de corto plazo:</strong> Prefieren imprimir hoy y dejar el problema para el siguiente gobierno.</li>
                <li><strong>🎭 Ilusión de prosperidad:</strong> Crean dinero falso para que la economía "parezca" buena mientras destruyen los ahorros de la gente.</li>
            </ul>

            <h4>⏳ El destino inevitable del dólar:</h4>
            <ul>
                <li>Estados Unidos tiene una <strong>deuda de +$34 TRILLONES</strong> (y subiendo)</li>
                <li>En 2020 imprimieron <strong>el 40% de todos los dólares</strong> que existen en la historia</li>
                <li>El dólar ha sido la moneda de reserva mundial por ~80 años (el promedio histórico es 90 años)</li>
                <li><strong>Ningún imperio ha mantenido su moneda fuerte por siempre</strong></li>
            </ul>

            <div class="highlight-box">
                <strong>🎯 La pregunta no es SI el dólar colapsará, es CUÁNDO.</strong>
            </div>

            <h4>👑 ¿Por qué Bitcoin es diferente?</h4>
            <ul class="king-list">
                <li><strong>🔒 Nadie puede imprimir más:</strong> Solo habrá 21 millones. NUNCA. Ni gobiernos, ni bancos, ni hackers pueden crear más.</li>
                <li><strong>📜 Reglas matemáticas, no políticas:</strong> Las reglas de Bitcoin están en código. No hay políticos que puedan cambiarlas.</li>
                <li><strong>🌍 No pertenece a ningún país:</strong> No puede ser destruido por las malas decisiones de un solo gobierno.</li>
                <li><strong>⏰ Probado +15 años:</strong> Ha sobrevivido crisis, prohibiciones, ataques y sigue funcionando perfectamente.</li>
            </ul>

            <div class="highlight-box bitcoin-special">
                <strong>💡 Conclusión:</strong> El dólar es un barco que se hunde lentamente. Bitcoin es el bote salvavidas. La pregunta es: ¿vas a quedarte en el barco hasta que se hunda, o vas a subirte al bote ahora?
            </div>

            <p class="final-note">
                <em>"El dinero fiat (peso, dólar, euro) es un experimento de 50 años. El oro fue dinero por 5,000 años. Bitcoin combina lo mejor del oro (escasez) con lo mejor de la tecnología (portabilidad). Es la evolución natural del dinero."</em>
            </p>
        `
    }
];

export const LearnMore = () => {
    const [expandedTopic, setExpandedTopic] = useState('bitcoin');

    const toggleTopic = (id) => {
        setExpandedTopic(expandedTopic === id ? null : id);
    };

    return (
        <div className="learn-more-container">
            <div className="learn-header">
                <div className="learn-header-icon">
                    <Sparkles size={28} />
                </div>
                <div>
                    <h2 className="learn-title">Escuela Bitcoin</h2>
                    <p className="learn-subtitle">Aprende sobre Bitcoin de forma sencilla y divertida 🚀</p>
                </div>
                <a href="curso.html" className="learn-cta-btn">
                    🎓 Módulo Avanzado
                </a>
            </div>

            <div className="topics-grid">
                {topics.map((topic) => {
                    const Icon = topic.icon;
                    const isExpanded = expandedTopic === topic.id;

                    return (
                        <div
                            key={topic.id}
                            className={`topic-card ${isExpanded ? 'expanded' : ''}`}
                            style={{ '--topic-color': topic.color }}
                        >
                            <button
                                className="topic-header"
                                onClick={() => toggleTopic(topic.id)}
                            >
                                <div className="topic-header-left">
                                    <div className="topic-icon-wrapper" style={{ background: `${topic.color}20` }}>
                                        <Icon size={24} style={{ color: topic.color }} />
                                    </div>
                                    <span className="topic-emoji">{topic.emoji}</span>
                                    <h3 className="topic-title">{topic.title}</h3>
                                </div>
                                <div className="topic-chevron">
                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            {isExpanded && (
                                <div
                                    className="topic-content"
                                    dangerouslySetInnerHTML={{ __html: topic.content }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <style>{`
                .learn-more-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .learn-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.5rem;
                    background: linear-gradient(135deg, rgba(247, 147, 26, 0.1), rgba(139, 92, 246, 0.1));
                    border-radius: 1rem;
                    border: 1px solid rgba(247, 147, 26, 0.2);
                    flex-wrap: wrap;
                }

                .learn-cta-btn {
                    margin-left: auto;
                    background: var(--accent-neon, #bfff00);
                    color: black;
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.9rem;
                    transition: transform 0.2s, box-shadow 0.2s;
                    border: 2px solid transparent;
                }

                .learn-cta-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 15px rgba(191, 255, 0, 0.4);
                }

                .learn-header-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #F7931A, #FFD700);
                    border-radius: 12px;
                    color: #000;
                }

                .learn-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin: 0;
                }

                .learn-subtitle {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    margin: 0.25rem 0 0 0;
                }

                .topics-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .topic-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 1rem;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .topic-card:hover {
                    border-color: var(--topic-color);
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
                }

                .topic-card.expanded {
                    border-color: var(--topic-color);
                    background: rgba(255, 255, 255, 0.05);
                }

                .topic-header {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.25rem 1.5rem;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .topic-header:hover {
                    background: rgba(255, 255, 255, 0.03);
                }

                .topic-header-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .topic-icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    border-radius: 10px;
                }

                .topic-emoji {
                    font-size: 1.5rem;
                }

                .topic-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0;
                }

                .topic-chevron {
                    color: var(--text-muted);
                    transition: transform 0.3s ease;
                }

                .topic-content {
                    padding: 0 1.5rem 1.5rem 1.5rem;
                    color: rgba(255, 255, 255, 0.9); /* Brighter text */
                    line-height: 1.8;
                    font-size: 0.95rem;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .topic-content p {
                    margin: 0 0 1rem 0;
                }

                .topic-content strong {
                    color: #fff; /* Pure white for emphasis */
                    font-weight: 700;
                }

                .topic-content h4 {
                    color: #fff; /* Pure white headers */
                    font-size: 1.1rem; /* Slightly larger */
                    margin: 1.5rem 0 0.75rem 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3); /* Subtle shadow for clarity */
                }

                .topic-content ul {
                    margin: 0.5rem 0 1rem 0;
                    padding-left: 1.5rem;
                }

                .topic-content li {
                    margin-bottom: 0.5rem;
                    color: rgba(255, 255, 255, 0.85); /* Readable list items */
                }

                .highlight-box {
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
                    border-left: 3px solid #8B5CF6;
                    padding: 1rem 1.25rem;
                    border-radius: 0 8px 8px 0;
                    margin: 1rem 0;
                    color: rgba(255, 255, 255, 0.95); /* Bright text inside highlights */
                }

                .highlight-box.bitcoin-special {
                    background: linear-gradient(135deg, rgba(247, 147, 26, 0.15), rgba(255, 215, 0, 0.1));
                    border-left-color: #F7931A;
                }

                .warning-box {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    padding: 1rem;
                    border-radius: 8px;
                    margin: 1rem 0;
                }

                .warning-box p {
                    margin: 0;
                    color: #FCA5A5;
                }

                .king-list {
                    list-style: none;
                    padding: 0;
                }

                .king-list li {
                    padding: 0.75rem;
                    margin-bottom: 0.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 8px;
                    border-left: 3px solid #F7931A;
                }

                .halving-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1rem 0;
                    font-size: 0.9rem;
                }

                .halving-table th {
                    background: rgba(255, 215, 0, 0.1);
                    color: #FFD700;
                    padding: 0.75rem;
                    text-align: left;
                    font-weight: 600;
                }

                .halving-table td {
                    padding: 0.75rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .halving-table tr:hover td {
                    background: rgba(255, 255, 255, 0.03);
                }

                .final-note {
                    text-align: center;
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </div>
    );
};
