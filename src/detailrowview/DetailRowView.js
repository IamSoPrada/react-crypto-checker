import React from 'react'

export default function DetailRowView({coin, onToggleCard}) {
    return (
        <div onClick={onToggleCard.bind(null)} class="card text-white bg-dark mb-3">
            <div class="card-header">Выбрана монета : <b>{coin.name}</b></div>
        <div class="card-body">
            <h5 class="card-title">Описание</h5>
            <p class="card-text">Рыночная капитализация $ : <b>{coin.market_cap_usd}</b></p>
            <p class="card-text">Изменения % за 1 час : <b>{coin.percent_change_1h}</b></p>
            <p class="card-text">Изменения % за 24 часа : <b>{coin.percent_change_24h}</b></p>
            <p class="card-text">Изменения % за 7 дней : <b>{coin.percent_change_7d}</b></p>
            <p class="card-text">Цена в $ : <b>{coin.price_usd}</b></p>
            <p class="card-text">Цена в BTC : <b>{coin.price_btc}</b></p>
        </div>
        </div>
    )
}
