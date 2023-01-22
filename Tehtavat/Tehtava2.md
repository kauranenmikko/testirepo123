## h2 Komentaja Pingviini

### Tehtävät
1. Asennettiin Micro tekstieditori
2. Asennettiin lshw ja printattiin virtuaalikoneen rauta(hardware)
3. Korjattiin kellon syncronointi koska jostakin syystä se puuttui?
4. Käytiin kansioita läpi
5. Grep

## Micro editori
Etsittiin ja asennettiin Micro. Koska en ollut täysin varma kyseisen ohjelman nimestä, etsin ensin
  
    apt-cache search micro

Tässä komennossa on vaan yksi ongelma, se etsii jokaisen hitsin ohjelman nimestä ja kuvauksesta tuon termin "micro".

![Micro Search](https://user-images.githubusercontent.com/122888695/213937025-1ebd7b5b-fdf0-44d2-8c91-370945e41d09.png)

Vaikka tuo itse paketti löytyi viellä hakutuloksista (joita tuli liikaa näytettäväksi yhtäaikaa terminaalissa), piti mennä kaivamaan parempi tapa tehdä tämä haku. Löytyi argumentti --names-only joka hakee arvatusti vain ohjelmien nimistä tuota annettua sanaa. Sillä lista tuli paljon lyhyemmäki ja järkevämmäksi.

    apt-cache search --names-only micro

![Micro Search v2](https://user-images.githubusercontent.com/122888695/213937060-986bb1d6-5792-4c67-99b7-5afab9d305dc.png)

Mutta en tyytynyt tähän, kyllähän nyt parempi tapa vielä pitää olla olemassa? Wildcardit toimii aika monessa sovelluksessa, toimisiko ne tässäkin? Wildcard-lista esille ja katsomaan mitenkä tätä hakua voisi tehdä vielä vähän paremmin.

    apt-cache search ^micro$
    
![Micro Search true](https://user-images.githubusercontent.com/122888695/213937395-00c0af23-50d9-4a17-8de1-692c92916679.png)

Ja nyt ollaankin juuri siinä mitä haettiin, käyttäen '^' edessä ja '$' lopussa haetaan juuri ja vain tuon nimistä (tai kuvauksellista) pakettia. Teknisesti tämän voisi yhdistää tuon --names-only argumentin kanssa jotta se etsisi annettua sanaa vain ja ainoastaan pakettien nimistä, koska nyt se myös etsii pakettien kuvauksista tuota, mutta sille tuskin on tarve käytännössä.

Sen asennus onnistui paketin nimen tarkistuksen jälkeen helposti.

    sudo apt-get install micro
    
Kysymykseen vastattiin Y, kuvassa näkyvä S on vain ohipainallus kun nappailin kuvia kuitenkin Windows koneelta virtualboxista.

![Micro Install](https://user-images.githubusercontent.com/122888695/213937559-95d31e40-401c-4688-b9fa-78983960ea34.png)

## lshw koneen raudan tiedot

Sama juttu lshw:n kanssa, ensin tarkistin paketin nimen (onko se 'l', '1' vai 'I', fontit).

    apt-cache search lshw
    
Tällä kertaa tuloksia ei ollut paljoa

![lshw search](https://user-images.githubusercontent.com/122888695/213937672-f3e37da3-f750-4c54-8252-6f3d45621697.png)

    sudo apt-get -y install lshw 
    
Asensin lshw ohjelman, -y argumentti vastasi yes kysymykseen haluatko asentaa.

Testattiin lshw output

    sudo lshw -short -sanitize
    

![lshw output](https://user-images.githubusercontent.com/122888695/213937747-c05d8a46-047d-4b40-9da9-80aac94314b9.png)

Se näytti tulostavan ihan oikein asiat, aika oletetusti tuolla komennolla saatiin vain osien perus tiedot ja virtuaalikoneen takia ei edes näytä GPUta.

## Korjasin kellon synkronoinnin

(huom, tämä on vaan jotakin mitä itse huomasin ja lähdin korjaamaan, oletettavasti rikoin jotakin tuossa poistossa kun poistin ntp-paketin suoraan ilman palvelun sammuttamista, ja loppujenlopuksi asensin sitten toisen paketin joka hoitaa saman asian)

Huomasin tuossa aikaisemmin, että jostakin syystä virtuaalikoneen kellonaika raahaa 13 minuuttia, korjasin sen jo itsekseni asentamalla ntp-palvelun ja sen jälkeen tajusin, että hitsi, tämän olisi tietenkin voinut dokumentoida tähän jos jollakin on samanlaista ongelmaa.

No, poistin sen asennuksen ja sitten päästiinkin jännän äärelle uudellenasennuksessa kun se ei enää toiminutkaan ja ei suostunut ollenkaan laittamaan tuota NTP-palvelua päälle.

Tarkistin, että ntp palvelua ei enää löydy ja koneen kellon synkronointi on pois päältä. (aikalailla sama tulos, missä olin ennen kuin alunperin asensin tuon NTP-paketin)

![Time1](https://user-images.githubusercontent.com/122888695/213938076-d39e733e-3dc9-4182-ba61-c444d8a8df73.png)

Etsin NTP paketin

    apt-cache search ntp
    
![Time2S](https://user-images.githubusercontent.com/122888695/213938113-cf7b937f-10c9-4818-a62b-8be9a2efffb3.png)

Asensin NTP paketin

    sudo apt-get install ntp
    
![Time3](https://user-images.githubusercontent.com/122888695/213938134-e6595bdb-6bff-41a5-8464-76c78a586bd6.png)

Tarkistin asennetun palvelun tilan, koska sehän ei itsekseen käynnistynyt viimeksikään

    systemctl status ntp

![Time4](https://user-images.githubusercontent.com/122888695/213938167-756d330a-2e16-4a77-97e7-c8e792cb52d8.png)

Käynnistin palvelun

    sudo systemctl restart ntp
    
Tämän jälkeen ntp-palvelu kyllä käynnistyi, mutta jotakin omituista tapahtui, koska kello ei siltikään synkronoitunut.

![image](https://user-images.githubusercontent.com/122888695/213938411-289fac44-a9a9-4a43-a92e-9074ce604caa.png)

Kellonaika sinäänsä on oikeassa, koska ennenkuin poistin tuon NTP-palvelun ensimmäisen kerran se onnistui jo kerran synkronoimaan tuon kellon, no nyt se ei tosiaan toiminut syystä tai toisesta ja seuraavat 15 minuuttia koitin käynnistää palvelua, asentaa sen uudelleen ja kaivoin verkosta vastauksia.

Loppujenlopuksi päädyin helpoimpaan ratkaisuun; jos tämä paketti ei toimi niin koitetaan toista. Linuxilla voi olla vain yksi tälläinen NTP-paketti asennettuna kerralla, niin lähdin suoraan asentamaan uutta.

    sudo apt-get -y install systemd-timesyncd
    
Asennuksen jälkeen tarkistin taas asennetun palvelun statuksen ja käynnistin sen uudelleen, tarkistin että palvelu oikeasti käynnistyi, sen jälkeen katsoin vielä kellon synkronoinnin statuksen.

    systemctl status systemd-timesyncd
    
    sudo systemctl restart systemd-timesyncd
    
    systemctl status systemd-timesyncd
    
    timedatectl status
    
![Time5F](https://user-images.githubusercontent.com/122888695/213938698-b2446cb1-58c1-47f4-a9c5-1f467cff8e6f.png)




