import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Crypto {
  id: string;
  name: string;
  price: number | null;
}

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-cryptorates',
  templateUrl: './cryptorates.component.html',
  styleUrls: ['./cryptorates.component.scss'],
})
export class CryptoRatesComponent implements OnInit {

  cryptocurrencies: Crypto[] = [

    { id: 'bitcoin', name: 'Bitcoin', price: null },

    { id: 'ethereum', name: 'Ethereum', price: null },

    { id: 'ripple', name: 'Ripple (XRP)', price: null },

    { id: 'litecoin', name: 'Litecoin', price: null },

    { id: 'cardano', name: 'Cardano', price: null },

    { id: 'polkadot', name: 'Polkadot', price: null },

    { id: 'chainlink', name: 'Chainlink', price: null },

    { id: 'stellar', name: 'Stellar', price: null },

    { id: 'dogecoin', name: 'Dogecoin', price: null },

    { id: 'bitcoin-cash', name: 'Bitcoin Cash', price: null },

    { id: 'uniswap', name: 'Uniswap', price: null },

  ];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCryptoPrices();
  }

  getCryptoPrices() {
    const ids = this.cryptocurrencies.map(crypto => crypto.id).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

    this.http.get<any>(url).subscribe(data => {
      this.cryptocurrencies.forEach(crypto => {
        crypto.price = data[crypto.id]?.usd || null;
      });
    });
  }
}
