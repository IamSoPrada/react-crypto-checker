import React from 'react'

export default function DetailRowView({ coin, onToggleCard }) {
    return (
        <div onClick={onToggleCard.bind(null)} className="card text-white bg-dark mb-3">
            <div className="card-header">Выбрана монета : <b>{coin.name}</b></div>
            <div className="card-body">
                <h5 className="card-title">Описание</h5>
                <p className="card-text">Рыночная капитализация $ : <b>{coin.market_cap_usd}</b></p>
                <p className="card-text">Изменения % за 1 час : <b>{coin.percent_change_1h}</b></p>
                <p className="card-text">Изменения % за 24 часа : <b>{coin.percent_change_24h}</b></p>
                <p className="card-text">Изменения % за 7 дней : <b>{coin.percent_change_7d}</b></p>
                <p className="card-text">Цена в $ : <b>{coin.price_usd}</b></p>
                <p className="card-text">Цена в BTC : <b>{coin.price_btc}</b></p>
            </div>
        </div>
    )
}
