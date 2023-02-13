Testaukset tehtiin Windows 10 pöytäkoneelta VirtualBoxissa olevaan Debian 11.6 versioon, josta otettiin yhteys DigialOcean hostaamaan Debian 11/bullseye virtuaalikoneeseen.

Tehtävät lähde: https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h8-say-my-name

    a) Vuokraa domainnimi ja aseta se osoittamaan virtuaalipalvelimeesi.*
    b) Tutki oman nimesi tietoja 'host' ja 'dig' -komennoilla. Analysoi tulokset.
  
  
  
## Vuokrataan domaini

Harmi kyllä tein tästä osan jo aikaisemmin, niin ei ole rekisteröinnistä paljoa kuvia antaa.

Otin GitHub Education paketin mukana tulleen tarjouksen, namecheap .me loppuinen domain nimi ilmaiseksi vuodeksi. 

Rekisteröin kauranen.me domainin.

![image](https://user-images.githubusercontent.com/122888695/218347029-0d437c00-8065-40c1-bfc2-301f7dc9155b.png)

Tuo oli automaattisesti täyttänyt nuo Host Recordit roskalla, ilmeisesti osoittivat tuonne githubin pages ominaisuuteen, mutta poistelin niitä rankalla kädellä ja jätin niistä vain tuon CNAME recordin, tosin en välttämättä ole varma onko se tarpeellinen, jätin siihen kuitenkin.

Ilmeisesti toimii?

http://kauranen.me ja http://www.kauranen.me osoittavat samaan IP osoitteeseen, ja kummatkin toimivat.


## Tutkitaan domainin tietoja

### Host

    mikko@titanic:~$ host kauranen.me
    kauranen.me has address 165.232.126.162
    kauranen.me mail is handled by 20 eforward5.registrar-servers.com.
    kauranen.me mail is handled by 15 eforward4.registrar-servers.com.
    kauranen.me mail is handled by 10 eforward1.registrar-servers.com.
    kauranen.me mail is handled by 10 eforward2.registrar-servers.com.
    kauranen.me mail is handled by 10 eforward3.registrar-servers.com.

Se ei paljoa näytä. IP osoite, aika itsestään selvyys että se löytyy.

Nuo "kauranen.me mail is handled by" rivit näyttävät kirjaimellisesti viittaavan sähköpostiosoitteeseen, joka on vastuussa domainille kuuluvista maileista.


### dig

    mikko@titanic:~$ dig kauranen.me

    ; <<>> DiG 9.16.37-Debian <<>> kauranen.me
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 29877
    ;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

    ;; OPT PSEUDOSECTION:
    ; EDNS: version: 0, flags:; udp: 512
    ;; QUESTION SECTION:
    ;kauranen.me.			IN	A

    ;; ANSWER SECTION:
    kauranen.me.		300	IN	A	165.232.126.162

    ;; Query time: 63 msec
    ;; SERVER: 8.8.8.8#53(8.8.8.8)
    ;; WHEN: Mon Feb 12 13:15:21 EET 2023
    ;; MSG SIZE  rcvd: 56


Tässä näkyy jo vähän enemmän tietoja. 

    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 29877
    
Näyttäisi olevan DNS vastaus formaatti. Header viittaa vaan yleisesti tuohon vastauksen muotoon? opcode on operation code, käytännössä minkätapainen kysely oli kyseessä, Query viittaa normaaliin kyselyyn.
Status taas aika itsestään selittävä, DNS vastauksen/recordin status, NOERROR tarkoittaa, että se onnistui. ID on oman laitteen luoma tunnus tälle kyselylle, jonka DNS palvelin sitten palautti (jotta tiedetään, mikä kysely on kyseessä).

    ;; OPT PSEUDOSECTION:
    ; EDNS: version: 0, flags:; udp: 512
    ;; QUESTION SECTION:
    ;kauranen.me.			IN	A
    
Ilmeisesti "OPT PSEUDOSECTION" on jälkikäteen DNS:n lisätty ominaisuus, jolla lisättiin joitakin ominaisuuksia, "EDNS: version: 0" viittaa käytettyyn versioon. udp on käytetty verkkoprotokolla.

Question Section viittaa lähetettyyn kyselyyn, tällä kertaa kauranen.me jolta etsittiin A-tyypin tietuetta.

    ;; ANSWER SECTION:
    kauranen.me.		300	IN	A	165.232.126.162
    
Ylempään liittyen kyselyyn tullut vastaus, kauranen.me, koodi 300 josta en ole täysin varma(voiko se olla HTTP vastaus, eli monta vaihtoehtoa?), A-tyypin tietue, IP osoite.

    ;; Query time: 63 msec
    ;; SERVER: 8.8.8.8#53(8.8.8.8)
    ;; WHEN: Mon Feb 12 13:15:21 EET 2023
    ;; MSG SIZE  rcvd: 56
    
Kyselyn kesto, kyselyyn käytetty palvelin, milloin kysely suoritettiin, vastaanoteotun viestin koko, ilmeisesti 56 tavua?



## Lähteet:

    
https://en.wikipedia.org/wiki/MX_record

https://en.wikipedia.org/wiki/Extension_Mechanisms_for_DNS

https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/

https://www.namecheap.com/
