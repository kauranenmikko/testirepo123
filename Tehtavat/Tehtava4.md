test123

## Tukki

Logien läpikäyntiä.

### /var/log/syslog

    Jan 30 11:54:00 titanic ifup[768]: Cannot find device "eth0"
    
Yllättävän tylsiä logirivejä koko tiedosto täynnä. Prosessi ifup ei löytänyt laitetta "eth0". (Taitaa olla jonkin ethernet moduuli, joka varmaankin on eri nimellä tai ei käytössä tässä virtualisoidussa ympäristössä.)

Date/time näyttäisi olevan järjestelmän kellon mukaan? Eli suomen aikaa.

### /var/log/auth.log

    Jan 30 11:59:42 titanic sudo:    mikko : TTY=pts/0 ; PWD=/var/log ; USER=root ; COMMAND=/usr/bin/micro syslog
    Jan 30 11:59:42 titanic sudo: pam_unix(sudo:session): session opened for user root(uid=0) by (uid=1000)
    
Otin kaksi riviä yhden sijasta koska kummatkin liittyvät samaan tapahtumaan. Tästä selviää, että sudoa käytti käyttäjä mikko, kansiossa /var/log, antoi komennon 'micro syslog'. Toisella rivillä sitten näkyy, että pam_unix (ilmeisesti Linuxin perus authentikaatio moduuli) avasi sudo root sessionin käyttäjälle.

Tässäkin date/time näyttäisi käyttävän järjestelmän aikaa.

### /var/log/apache2/access.log

     [30/Jan/2023:11:58:51 +0200] "GET /test HTTP/1.1" 404 488 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0"
     
Rivi näyttää, että GET komento ei onnistunut osoitteeseen /test (eli tässä tapauksessa localhost/test), HTTP virhekoodi 404 (Not Found), en ole ihan varma mikä tuo 488 on sen jälkeen. Välissä viiva, viivan toisella puolella näyttäisi olevan pyynnön luonut taho, eli Mozilla Firefox versio 102.0, Linux käyttöjärjestelmältä. Gecko/20100101 on Firefoxin käyttämä User Agent.

Näyttäisi taas käyttävän järjestelmän aikaa.

### /var/log/apache2/error.log

Näyttäisi harvinaisen tyhjältä, tietenkin osin sen takia, että en ole oikeastaan tehnyt muuta kuin käynnistänyt apache2-palvelun.

      [Mon Jan 30 11:58:24.480595 2023] [mpm_event:notice] [pid 4468:tid 139917674184000] AH00489: Apache/2.4.54 (Debian) configured -- resuming normal operations

Huvittavasti kyllä, en ole täysin varma mitä tämä rivi tarkalleen tekee nimellisessä virhe logissa, koska sen edellä ei ole mitään ja tuon "mpm_event: notice" voisi olettaa, että kyseessä on vain ilmoitus eikä suoraan virhe. 

Rivi selitettynä: Kellonaika (sekin näyttäisi taas käyttävän järjestelmän aikaa), virheen muoto (tässä tapauksessa ilmoitus), prosessin ID ja threadin ID, AH00489 taitaa olla vaan joku apachen oma virhekoodi asialle, virheen teksti itsessään (tässä tapauksessa vaan apachen käynnistyksestä)

### Aiheutetaan logiin tapahtumia

Käytetään sudoa, annetaan tahallaan väärä salasana kolmesti, tarkistetaan /var/log/syslog .

    Jan 30 13:17:37 titanic sudo: pam_unix(sudo:auth): authentication failure; logname= uid=1000 euid=0 tty=/dev/pts/1 ruser=mikko rhost=  user=mikko
    Jan 30 13:17:44 titanic sudo:    mikko : 3 incorrect password attempts ; TTY=pts/1 ; PWD=/home/mikko ; USER=root ; COMMAND=/usr/bin/apt-get update

Ensimmäinen rivi: 

Jan 30 13:17:37, Päivä ja kellonaika

titanic, koneen nimi

sudo: pam_unix(sudo:auth), virheen antaneen palikan nimi (sudo), sen moduuli pam_unix

authentication failure;, ilmoitus mitä tapahtui (authentikaatio epäonnistui)

logname=, tässä varmaankin näkyisi erikseen logitiedoston nimi jos olisi määritelty mihin nämä kirjoitetaan.


uid=1000, käyttäjä ID (1000)

euid=0, euid on ilmeisesti käyttäjän "effektiivinen" ID (eli varmaankin 0 koska ensimmäinen käyttäjä laitteella)

tty=/dev/pts/1, tty taitaa olla vaan nimi terminaalille, eli varmaankin viittaa ohjelmaan joka on "lähde" tälle tapahtumalle?

ruser=mikko, ruser ilmeisesti uudelleen ilmoittaa koneella olevan käyttäjän

rhost=, rhost varmaankin sama kuin ylempi mutta oletettavasti siinä olisi koneen/palvelimen nimi esim, jos koittaisi suorittaa komentoa SSHn yli

user=mikko, käyttäjän nimi


Toinen rivi:

Jan 30 13:17:44 - Päivä ja kellonaika

titanic - koneen nimi

sudo: - virheen antaneen palikan nimi (sudo)

Sen jälkeen rivi eroaa ensimmäisestä ja onkin vain käyttäjän nimi yksinään.

3 incorrect password attempts - aika selkokielinen virheilmoitus seuraa, salasana annettu väärin kolmesti.

TTY=pts/1 - uorittaneen ohjelman nimi (terminaali)

PWD=/home/mikko - missä työkansiossa/polussa oltiin

USER=root - mitä käyttäjää koitettiin käyttää

COMMAND=/usr/bin/apt-get update - mikä komento annettiin.
