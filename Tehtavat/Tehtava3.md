
    x) Lue ja tiivistä (Muutama ranskalainen viiva riittää. Tässä alakohdassa ei tarvitse tehdä testejä tietokoneella)
        FSF: FSF Free Software Definition
        Välimäki 2005: Rise of Open Source: 5 Open Source Licenses as Alternative Governance Mechanisms: 5.1.1 - 5.1.4 (sivu 113 - 121)
    a) Kolmen ohjelman lisenssit. Tarkastele kolmen edellisessä harjoituksessa asentamasi ohjelman lisenssejä. Selvitä kustakin ohjelmasta:
        Mitä lisenssiä kyseinen ohjelma käyttää?
        Mistä päättelit lisenssin?
        Onko kyseessä vapaa lisenssi?
        Mitkä ovat tämän lisenssin tärkeimmät oikeusvaikutukset?
        Jääkö tämän ohjelman lisenssoinnista jotain avoimia kysymyksiä tai epäselvyyttä? (kirjaan tämän itselleni muistiin, jos selvitän jonkun ohjelman lisenssejä)
    b) Säännöllistä. Poimi tekstitiedostosta tietoa grep-komennolla käyttäen säännöllisiä lausekkeita (regexp, regular expressions).
    c) Pipe. Näytä esimerkki putkista (pipes).
    d) Vapaaehtoinen: Regex Crossword, tutorial.


## Lisenssit

Tarkistetaan kolmen viimeisessä tehtävässä asennetun ohjelman lisenssit. Cowsay, Git, Nethack.

### Cowsay

Lisenssejä löytyy muutama.

    Cowsay
    GPL
    GPL-2+
    WTFPL-2
    

Lisenssit ovat vapaita lisenssejä, käytännössä rajoitteet ovat: mainitse tekijä jos muokkaat/lainaat koodia, kanna lisenssit mukana (GPL:t), ei takuita jne. Tuo WTFPL-2 linsessi nyt osui silmään kun sitä sai kaivaa vanhemmasta versiosta: https://sources.debian.org/copyright/license/cowsay/3.03%2Bdfsg1-2/ 


               DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
      TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

     0. You just DO WHAT THE FUCK YOU WANT TO. 
     
Harvinaisen selkokielinen. (Ja varmaankin syy jonka takia se varmaankin on pudotettu osasta paketeista)

Lähde: https://sources.debian.org/copyright/license/cowsay/3.03%2Bdfsg2-8/

### Git

Noniin tästä saatiinkin oikeen hyvä lisenssisoppa aikaiseksi. Git pakettiin kuuluvat seuraavat erilaiset lisenssit:

    GPL-2
    GPL-2+
    LGPL-2+
    LGPL-2.1
    Apache 2.0
    ISC
    Expat
    EDL-1.0
    mingw-runtime
    Boost
    dlmalloc
    
Ilmeisesti näin yleisesti, nuo menevät kaikki mahtuvat tuon GPL-2 linsessin alle, mutta kaikki näistä pitää kuitenkin mukana pitää. 

Kyseessä siis on vapaa lisenssi. Lisenssien ainoat oikeat rajoitukset mitä nopeasti lukemalla huomasin, on että kyseiset lisenssit pitää kantaa mukana "niinkuin ne ovat" ilman muokkausta, sinun pitää julkaista lähdekoodi jos jaat sitä vaikka olisit muokannut osia... käytännössä pitää mennä tarkalleen noitten lisenssien rajoitteiden mukana jos/kun jaat ohjelmaa eteenpäin tai muokkaat sitä. Aika samanlaisiahan nuo kaikki ovat.

Lähde: https://sources.debian.org/copyright/license/git/1:2.30.2-1/

### Nethack

Nethack paketti pitää sisällään seuraavat lisenssit

    NGPL
    NGPL and BSD-3-clause
    NTP
    NTP-Winconsin-Madison
    
Nämä löytyivät usr/share/doc/nethack-common/copyright.txt tiedosta, ja varmistin ne vielä debianin sivulta. 

Vapaa lisenssi. Käytännössä identtiset ylempien kanssa: saat tehdä käytännössä mitä haluat kunhan kannat linsessit mukana ja seuraat niitä, joka on käytännössä isoin etu ja rajoite. 

Debian sivuilta lähde: https://sources.debian.org/copyright/license/nethack/3.6.6-2/
    
## Grepperino v2

Poimitaan tietoa GPL-2 tiedostosta säännöllisillä lauseilla, siellä kun sattuu olemaan sopivan iso määrä tekstiä jo valmiiksi (ja kaikki voivat toistaa teoriassa)

Haetaan kaikki rivit jotka alkavat sanalla "license"

        grep -i "^license" GPL-2
        
![3](https://user-images.githubusercontent.com/122888695/214734209-66e6187d-9fc7-414e-b86e-a82c08952329.png)

Kaksi hakua, rivit jotka alkavat merkillä 'l', rivit jotka loppuvat merkkiin 'l' (L)

        grep -i "^\l" GPL-2
        grep -i "l$" GPL-2
        
![4](https://user-images.githubusercontent.com/122888695/214735050-aae713f3-4af6-43a9-96f4-bd97dca9910d.png)

## Putki

Sama tiedosto vielä, kirjoitetaan löytyneet rivit tekstitiedostoon.

        grep -i "^\l" GPL-2 | cat > /home/mikko/Desktop/test.txt
        
![5](https://user-images.githubusercontent.com/122888695/214735873-dea47dd3-8ad4-4f98-bdf4-f8b9ad9d56d1.png)

Kai putkilla voi lisää pelleillä.

        grep -i "^\l" GPL-2 | grep -o "license"
        grep -i "^\l" GPL-2 | grep -o -i "license"
        grep -i "^\l" GPL-2 | grep -o -i -c "license"
        grep -i "^\l" GPL-2 | grep -o -i -c "license"  | cowsay
        grep -i "^\l" GPL-2 | grep -o -i -c "license"  | cowsay | cat > /home/mikko/Desktop/test.txt
        
![6](https://user-images.githubusercontent.com/122888695/214736463-c8149917-bf23-4391-8d8c-c5b3788bb75a.png)

Putket hyvin käytetty.
        
        
