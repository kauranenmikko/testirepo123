## h2 Komentaja Pingviini

Asennukset tehtiin omalta Windows 10 pöytäkoneelta VirtualBoxissa olevaan Debian 11.6 versioon.

### Tehtävät
1. Asennettiin Micro tekstieditori
2. Asennettiin lshw ja printattiin virtuaalikoneen rauta(hardware)
3. Korjattiin kellon syncronointi koska jostakin syystä se puuttui?
4. Asennettiin kolme ohjelmaa, samalla komennolla
5. Käytiin kansioita läpi
6. Grep

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

Tulostuksessa näkyy (virtuaali)koneen käytössä olevat "fyysiset" resurssit. Siitä oletetusti puuttuu aika iso osa oikeata rautaa, esim. GPU, oikeat kiinto/kovalevyasemat, siinä näkyy virtuaalinen verkkokortti, se on tainnut väärin tulkita koneessa kiinni olevan kontrollerin, chipset ja sen piirit puuttuvat, kaikki aika oletettavaa koska kyseessä on virtuaalikone joka, yllättäen, on virtualisoinut lähes kaiken CPUn, muistin, hiiren, näppäimistön ja kovalevytilan ulkopuolella. 

En tiedä mitä tässä kauheasti enempää analysoida. Siinä on koneen osat. Ne ovat periaatteessa oikein, mutta väärin koska virtualisointi on hoitanut käytännössä kaiken /0/100 polun alla olevan.

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
    
Tämän jälkeen ntp-palvelu kyllä käynnistyi, mutta jotakin omituista tapahtui, koska kello ei siltikään synkronoitunut. (Se ei jostakin syystä osannut lukea tuota NTP palvelun antamaa tietoa? Tai ei ehkä saanut yhteyttä NTP palvelimiin?)

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

Ja tämän jälkeen kello lähti taas toimimaan. Oliko tämä turhaa? Varmaankin. Tulipahan tehtyä.


## Asennettiin kolme ohjelmaa

Git, Nethack, cowsay

    sudo apt-get -y install git cowsay nethack-console
    
![three installs](https://user-images.githubusercontent.com/122888695/213939594-04aa15cb-c6ac-4fc3-ae22-8485e08c60ed.png)

### Git

Tehdään tyhjä git repo ja lisätään sinne tiedosto, määritetään sitä ennen kuitenkin ihan muutama global variable.

    git config --global user.name "Test User"
    
    git config --global user.emaik "Test.User@nodomain.org"
    
    git config --global user.email "Test.User@nodomain.org"
    
    git config --global user.emaik
    
![git1](https://user-images.githubusercontent.com/122888695/213940408-581e6201-1279-46ec-be26-4991c6d005d5.png)
  
Noniin ja mitä taas opittiin? Git ottaa kaikki uudet global variablet vastaan, kannattaa lukea mitä kirjoittaa ennen entterin painamista.

Luotiin tyhä repo oletussijaintiin (eli käyttäjän kansioon), lisättiin sinne tiedosto. Tarkistettiin, että tiedosto on seuraavassa commitissa, ja commitattiin muutos. 

Tarkistettiin viimeiseksi, että tuo oikeasti meni vielä läpi ja on nyt mukana repossa.


    git init
    
    git add /home/mikko/Desktop/test.txt
    
    git status
    
    git commit
    
    git show
    
![Git2](https://user-images.githubusercontent.com/122888695/213940485-40fb37c8-391e-4e15-a2cf-73e148700f32.png)

![git3](https://user-images.githubusercontent.com/122888695/213940508-557f1b2e-2e9f-49d8-9102-2022867fef03.png)

![git4](https://user-images.githubusercontent.com/122888695/213940766-701ce1c6-9da5-4c14-a0ad-9e5cc1055d5a.png)


### Lehmä sanoo "Mooo"

    cowsay "En sano Moooo"

![cowsays](https://user-images.githubusercontent.com/122888695/213940866-eb4564f2-362d-4bd0-93d2-b07e07ab5c08.png)


### Nethack-console

I have no clue what I'm doing.jpg (Minkälainen random generoitu Evoker saa 14 dex?)

![NethackC](https://user-images.githubusercontent.com/122888695/213941297-a8a7d0d4-9033-4a58-9d06-a1ff509d2a37.png)

## Käytiin kansioita läpi

### Linuxin rootti /

Tästä periaatteessa näkee ylimmän tason puusta, kaikki linuxin tiedostot ovat näitten kansioiden alla tai rootissa itse.

    cd /
    ls
    
![Troot](https://user-images.githubusercontent.com/122888695/213941560-d8860b7d-f5ba-4729-b9f0-c15adbe676a2.png)


### /home/

Käyttäjien "koti" kansio jonka alla on kansiot kaikille käyttäjille. 

    cd /home/
    ls
    
![home](https://user-images.githubusercontent.com/122888695/213941660-0d5c053d-a9c1-47ff-8acd-1196d3617d6c.png)


### /home/mikko (./käyttäjä)

Sisältää käyttäjän tiedostot, muistaakseni ainut paikka mihin käyttäjä voi kirjoittaa ilman sudo oikeuksia.

    cd ./mikko (koska oltiin ylemmässä vaiheessa jo /home/ kansiossa, voi käyttää tuota './' korjaamaan sen osion)
    ls
    
![kansio mikko](https://user-images.githubusercontent.com/122888695/213941781-a81aa9ed-aedf-4a8b-ac6d-2d08aed477aa.png)

### /etc

Täällä on linuxin asetukset. Kaikki sisälletyt tiedostot ovat luettavissa tekstimuodossa, esim. nano ohjelmalla. Kansiossa on myös muita kansioita (kuvassa sinisellä).

    cd /etc
    ls
    
![etc](https://user-images.githubusercontent.com/122888695/213941914-13f737b5-1c67-4a09-887f-8b28d3dc7162.png)

Avataan yksi tiedosto kansiosta ihan koska voidaan.
    
    nano rc5.d/S01bluetooth
    Vastaavasti
    cd rc5.d/
    ls
    nano S01bluetooth

![tekstitiedosto](https://user-images.githubusercontent.com/122888695/213942037-26ea4879-5790-4afb-b4a6-e5f3fedb1d68.png)


### /media/

Ilmeisesti kansio jossa on irroitettavat asemat/tikut/levyt jne.

Omassa tapauksessa tyhjä.

    cd /media
    ls
    pwd
    cd ./mikko
    pwd
    ls

![media](https://user-images.githubusercontent.com/122888695/213942257-c31f3e6f-4b71-4885-b797-0968c9d76eb5.png)

### /var/log

Systeemilogit. Monta logia. Paljon tekstiä.

    cd /var/log
    ls
    nano user.log (oikeudet ei riittänyt >:( )
    sudo nano user.log

![varlog](https://user-images.githubusercontent.com/122888695/213942404-a70f624f-ab60-40f4-8282-0f54aa38fda6.png)

![jep se on tekstia](https://user-images.githubusercontent.com/122888695/213942423-328933d8-3d39-4250-98b5-004781861307.png)

## Grep

Satuttiin olemaan kansiossa, missä on paaaaljon tiedostoja joissa on paljon tekstiä.

Kaivetaan user.log kaikki rivit missä on "denied".

    sudo grep -i "denied" user.log
    
![grepperino](https://user-images.githubusercontent.com/122888695/213942714-e84ea13f-2176-4971-8165-18ab8f9b1018.png)

Lasketaan user.log rivit käyttäen koneen nimeä titanic, tarkistin rivimäärän suunilleen avaamalla tiedoston vielä kerran nanolla ja selaamalla.

    sudo grep -c "titanic" user.log
    
![grepperino2](https://user-images.githubusercontent.com/122888695/213942819-51489ca6-fab9-4013-a36c-80dc92543a5b.png)

Etsitään boottitiedostoista epäonnistumisten määrää. En ole ihan varma miksi näitäkin tiedostoja on periaatteessa kolme, ja otin muistin käytetyn termin väärin, mutta ei anneta sen häiritä.

    sudo grep -c -i "failure" boot.log.1 boot.log.2
    sudo grep -c -i "failed" boot.log.1 boot.log.2
    
![grepperino3](https://user-images.githubusercontent.com/122888695/213942977-40b4b0f1-79f2-4676-a868-1a48126221a1.png)

Itse aikalailla käyttänyt Greppiä vaan näihin tarkoituksiin, laskemaan tai etsimään tiettyjen termien määrää tiedostoista (pääasiassa kun integraatiolta tulee lähes puoligigaa tekstiä ja pitää katsoa onko uusin muutos aiheuttanut tarvittavan muutoksen datassa, tai onko hakutermit muuttaneet lopputulosta paljonkin)

## Donezo
