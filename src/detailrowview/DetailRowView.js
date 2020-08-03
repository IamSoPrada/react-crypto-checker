import React from 'react'

export default function DetailRowView({coin}) {
    return (
        <div className="container d-flex flex-column">
            <p>Выбрана монета : <b>{coin.name}</b></p>
            <p>Рыночная капитализация $ : <b>{coin.market_cap_usd}</b></p>
            <p>Изменения % за 1 час : <b>{coin.percent_change_1h}</b></p>
            <p>Изменения % за 24 часа : <b>{coin.percent_change_24h}</b></p>
            <p>Изменения % за 7 дней : <b>{coin.percent_change_7d}</b></p>
            <p>Цена в $ : <b>{coin.price_usd}</b></p>
            <p>Цена в BTC : <b>{coin.price_btc}</b></p>
        </div>
    )
}
