import { Component, OnInit } from '@angular/core';
import { modPow } from 'bigint-crypto-utils';

@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html',
  styleUrls: ['./rsa.component.scss'],
})
export class RsaComponent  implements OnInit {

  pNum: number = 37;
  qNum: number = 41;
  pList: number[] = [];
  qList: number[] = [];
  nNum: number = 0;
  fiNum: number = 0;
  eNum: number = 0;
  eList: number[] = [];
  dNum: number = 0;
  dList: number[] = [];
  max: number = 0;
  toEncrypt: string = "";
  toDecrypt: string = "";

  constructor() { this.updateLists(), this.updateEncryption(), this.updateDecription();}

  ngOnInit() {}

  primeNumbers(value: number): number[] {
    const res: number[] = Array.from({ length: value + 1 }, (_, i) => i);
    res[0] = res[1] = 0;
    let i = 2;
    while (i <= value) {
      if (res[i] !== 0) {
        let j = i * i;
        while (j <= value) {
          res[j] = 0;
          j += i;
        }
      }
      i += 1;
    }
    return res.filter(num => num >= 34) as number[];
  }

  GCD(a: number, b: number): number {
    while (a !== 0 && b !== 0) {
        if (a > b) {
            a = a % b;
        } else {
            b = b % a;
        }
    }
    return a + b;
  }


  updateLists(): void {
    const primes = this.primeNumbers(100);
    this.pList = primes.filter(num => num !== this.qNum);
    this.qList = primes.filter(num => num !== this.pNum);
    this.nNum = this.pNum*this.qNum;
    this.fiNum = (this.pNum-1)*(this.qNum-1);

    if(this.eList.length !== 0) this.eList.splice(0, this.eList.length)

    for(let i=0; i !== this.fiNum; i++){
      if(this.GCD(i,this.fiNum)==1){
        this.eList.push(i);
      }
    }

    if(this.pNum>this.qNum){
      this.max = this.pNum;
    }else{
      this.max = this.qNum;
    }

    if(this.dList.length !== 0) this.dList.splice(0, this.dList.length)
    for(let i=0; i!== this.max**3; i++){
      if((i*this.eNum)%this.fiNum == 1){
        this.dList.push(i);
      }
    } 

  }

  updateEncryption(): void {
    this.toEncrypt = this.decryption(this.toDecrypt, [this.eNum, this.dNum, this.nNum])
  }
  updateDecription(): void {
    this.toDecrypt = this.encryption(this.toEncrypt, [this.eNum, this.dNum, this.nNum])
  }
  

  encryption(text: string, openKey: number[]): string { 
    const _key = openKey;
    const asciiText = text.split('').map(char => char.charCodeAt(0));

    const cipher: bigint[] = [];
    for (const i of asciiText) {
      console.log(i +'**'+ _key[0] +'%'+ _key[2]);
      cipher.push(modPow(i,_key[0],_key[2]));
    }
    let res = "";
    for (let i = 0; i < cipher.length; i++) {
        res += `${cipher[i]} `;
    }

    return res.trim();
  }

  decryption(cipher: string, closedKey: number[]): string {
    const _key = closedKey;
    
    const decipher: bigint[] = [];
    const cipherNumbers = cipher.split(' ').filter(Boolean).map(Number);
    for (const i of cipherNumbers) {
      console.log(i +'**'+ _key[1] +'%'+ _key[2]);
      decipher.push(modPow(i, _key[1],_key[2]));
    }
    
    console.log(decipher)
    const res = decipher.map(num => String.fromCharCode(Number(num))).join('');

    return res;
  }



}
