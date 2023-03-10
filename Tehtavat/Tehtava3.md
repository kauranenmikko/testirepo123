## h3 Vapaus!

Testaukset tehtiin Windows 10 pöytäkoneelta VirtualBoxissa olevaan Debian 11.6 versioon.

## Tiivistykset
### FSF

- Ei ilmainen, vapaa (no suomenkielessä ei ole kauhean epäselvä, toisin kun "Free, not _Free_")
- Saat tehdä ohjelmalla mitä haluat
- Annat muille samat oikeudet kun mitkä sinulla on jos muokkaat ja/tai myyt ohjelmaa eteenpäin joka on julkaistu vapaan lisenssin alla.

### Välimäki (2005), Rise of Open Source

- Idea avoimen lähteen takana on kääntää kaikki normaalit tekijänoikeuden "yksinoikudet" ympäri kaikkien oikeuksiksi.
- Ei aseta vaatimuksia tavaramerkeille, takuulle, yhteensopivuudelle tai lainmukaisuudelle maailmanlaajuisesti(as in: ei ole välttämättä laillisesti pitävä kaikissa maissa)
- Lisenssit voi kategorioida kahteen eri ryhmään
    - Standard reciprocity obligation: Lisenssiä ei voi muuttaa ellei koodia yhdistetä toiseen ja näitten yhdistelmästä tule täysin uusi ohjelma, silloin uuden ohjelman ei ole pakollista seurata alkuperäisen lisenssöitiä.
    - Strong reciprocity obligation: Lisenssiä ei voi muuttaa.
- Historiallisesti eri lisenssityypit pystytään kategorioida neljään eri lisenssikategoriaa.
    - GNU lisenssit
    - Akademia/Tutkimus lisenssit
    - Yhteisö lisenssit
    - Yritysten lisenssit

## Lisenssit

Tarkistetaan kolmen viimeisessä tehtävässä asennetun ohjelman lisenssit. Cowsay, Git, Nethack. Kaivoin lisenssit pääasiassa debianin sivuilta https://packages.debian.org

### Cowsay

Lisenssejä löytyy muutama.

    Cowsay
    GPL
    GPL-2+
    WTFPL-2
    
Lähde: https://packages.debian.org/bullseye/cowsay / https://metadata.ftp-master.debian.org/changelogs//main/c/cowsay/cowsay_3.03+dfsg2-8_copyright

Lisenssit ovat vapaita lisenssejä, käytännössä rajoitteet ovat: mainitse tekijä jos muokkaat/lainaat koodia, kanna lisenssit mukana (GPL:t), ei takuita jne. Tuo WTFPL-2 lisenssi on kyllä omaa luokkaansa.


               DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
      TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

     0. You just DO WHAT THE FUCK YOU WANT TO. 
     
Harvinaisen selkokielinen. 

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
    
Ilmeisesti näin yleisesti, nuo kaikki mahtuvat tuon GPL-2 linsessin alle. 

Kyseessä siis on vapaa lisenssi. Lisenssien ainoat oikeat rajoitukset mitä nopeasti lukemalla huomasin, on että kyseiset lisenssit pitää kantaa mukana "niinkuin ne ovat" ilman muokkausta, sinun pitää julkaista lähdekoodi jos jaat sitä vaikka olisit muokannut osia... aika perus GPL lisenssin mallin mukana menee: Muilla pitää olla samat oikeudet, mitkä sinulla on kun otit sait koodin.

Lähde: https://packages.debian.org/bullseye/git / https://metadata.ftp-master.debian.org/changelogs//main/g/git/git_2.30.2-1_copyright

### Nethack

Nethack paketti pitää sisällään seuraavat lisenssit

    NGPL
    NGPL and BSD-3-clause
    NTP
    NTP-Winconsin-Madison
    
Nämä löytyivät usr/share/doc/nethack-common/copyright.txt tiedostosta, ja varmistin ne vielä debianin sivulta. 

Vapaa lisenssi. Käytännössä identtiset ylempien kanssa: saat tehdä käytännössä mitä haluat kunhan kannat linsessit mukana ja seuraat niitä, joka on käytännössä isoin etu ja rajoite. 

Debian sivuilta lähde: https://packages.debian.org/bullseye/nethack-common / https://metadata.ftp-master.debian.org/changelogs//main/n/nethack/nethack_3.6.6-2_copyright
    
## Grepperino v2

Poimitaan tietoa GPL-2 tiedostosta säännöllisillä lauseilla, siellä kun sattuu olemaan sopivan iso määrä tekstiä jo valmiiksi. Tiedosto löytyy Debian asennuksista /usr/share/common-licenses/.

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

Kai putkilla voi lisää putkeilla.

        grep -i "^\l" GPL-2 | grep -o "license"
        grep -i "^\l" GPL-2 | grep -o -i "license"
        grep -i "^\l" GPL-2 | grep -o -i -c "license"
        grep -i "^\l" GPL-2 | grep -o -i -c "license"  | cowsay
        grep -i "^\l" GPL-2 | grep -o -i -c "license"  | cowsay | cat > /home/mikko/Desktop/test.txt
        
![6](https://user-images.githubusercontent.com/122888695/214736463-c8149917-bf23-4391-8d8c-c5b3788bb75a.png)

Putket hyvin käytetty.

Bonus: Mitä käy jos syötät lehmälle lehmän?

![7](https://user-images.githubusercontent.com/122888695/214748645-65135e31-08a2-4319-99c1-eff412f084c3.png)



## Lähteet

https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/

http://lib.tkk.fi/Diss/2005/isbn9529187793/isbn9529187793.pdf

https://www.gnu.org/philosophy/free-sw.html

https://packages.debian.org/bullseye/cowsay

https://metadata.ftp-master.debian.org/changelogs//main/c/cowsay/cowsay_3.03+dfsg2-8_copyright

https://packages.debian.org/bullseye/git 

https://metadata.ftp-master.debian.org/changelogs//main/g/git/git_2.30.2-1_copyright

https://packages.debian.org/bullseye/nethack-common 

https://metadata.ftp-master.debian.org/changelogs//main/n/nethack/nethack_3.6.6-2_copyright

https://sources.debian.org/

https://sources.debian.org/copyright/license/cowsay/3.03%2Bdfsg2-8/
