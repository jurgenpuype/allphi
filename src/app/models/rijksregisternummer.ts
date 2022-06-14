/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
  
export class Rijksregisternummer {

    rrnummer : string;
    cleaned : string;
 
    constructor(rrnum : string) {
        this.rrnummer = rrnum;
        this.cleaned = this.rrnummer.replace(/\D/g,'');
    }

    private checkPre2000() : string {
        let base = this.cleaned.substring(0,9);
        return base + this.controlegetal(+base);
    }

    private checkPost2000() : string {
        let base = '2' + this.cleaned.substring(0,9);
        return base.substring(1) + this.controlegetal(+base);
    }
    
    public gender() : string {
        let teller = this.cleaned.substring(6,9);
        return ((+teller % 2) === 0) ? 'V' : 'M';
    }
    
    public controlegetal(base: number) : number {
        return 97 - (base % 97);
    }    
    
    public print(format : string) : string {
        let _return = '';
        if (format.toLowerCase() === 'nummer') {
            _return = this.cleaned;
        } else if (format.toLowerCase() === 'str') {
            _return = this.cleaned.substring(0,2) + '.' +
                      this.cleaned.substring(2,4) + '.' +
                      this.cleaned.substring(4,6) + '-' +
                      this.cleaned.substring(6,9) + '.' +
                      this.cleaned.substring(9);
        }
        return _return;
    }
 
    public geboortedatum() : string {
        let _result = '';
        if (this.cleaned === this.checkPre2000()) {
            _result = this.cleaned.substring(4,6) + '/' +
                      this.cleaned.substring(2,4) + '/' +
                      '19' + this.cleaned.substring(0,2);                      
        } else if (this.cleaned === this.checkPost2000()) {
            _result = this.cleaned.substring(4,6) + '/' +
                      this.cleaned.substring(2,4) + '/' +
                      '20' + this.cleaned.substring(0,2);                      
        } else {
            _result = 'Rijksregisternummer is ongeldig!';
        }
        return _result;
    }
    public isCorrect() : boolean {
        return ((this.cleaned === this.checkPre2000()) ||  (this.cleaned === this.checkPost2000()));
    }
}

