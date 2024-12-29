import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface Crypto {
  id: string;
  name: string;
  price: number | null;
  logo: string;
}

@Component({
  selector: 'app-cryptorates',
  templateUrl: './cryptorates.component.html',
  styleUrls: ['./cryptorates.component.scss'],
})

export class CryptoRatesComponent implements OnInit {
  loc: any = {}
  date: Date = new Date();
  formattedDate = this.date.toLocaleString();

  cryptocurrencies: Crypto[] = [
    { id: 'bitcoin', name: 'Bitcoin', price: null, logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg' },
    { id: 'ethereum', name: 'Ethereum', price: null, logo: 'https://static.tildacdn.com/tild3236-6133-4335-a366-316262313538/ethereum-eth.svg' },
    // { id: 'ripple', name: 'Ripple (XRP)', price: null, logo: 'https://storage.myseldon.com/yugo/5FCD2D2661A3F23907003E56971D9B6B.png' },
    { id: 'litecoin', name: 'Litecoin', price: null, logo: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg' },
    { id: 'cardano', name: 'Cardano', price: null, logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg' },
    { id: 'polkadot', name: 'Polkadot', price: null, logo: 'https://avatars.mds.yandex.net/i?id=6c7f76c9e769d03ffd16c32ea8f3bcb2_l-9140040-images-thumbs&n=13' },
    { id: 'chainlink', name: 'Chainlink', price: null, logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg' },
    { id: 'stellar', name: 'Stellar', price: null, logo: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg' },
    { id: 'dogecoin', name: 'Dogecoin', price: null, logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg' },
    { id: 'bitcoin-cash', name: 'Bitcoin Cash', price: null, logo: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg' },
    { id: 'uniswap', name: 'Uniswap', price: null, logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg' },
  ];

  constructor(private http: HttpClient, private translate: TranslateService) { }

  ngOnInit() {
    this.getCryptoPrices();
  }

  getCryptoPrices() {
    const ids = this.cryptocurrencies.map(crypto => crypto.id).join(',')
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`

    this.translate.get('CRYPTO_MODULE').subscribe((locale: any) => {
      this.loc = locale
      console.log(locale)
    });
    this.http.get<any>(url).subscribe(data => {
      this.cryptocurrencies.forEach(crypto => {
        crypto.price = data[crypto.id]?.usd || null
      });
    });
  }
}
