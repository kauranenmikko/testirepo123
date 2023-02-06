Testaukset tehtiin Windows 10 pöytäkoneelta VirtualBoxissa olevaan Debian 11.6 versioon.

Tehtävät lähde: https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h6-based

Lähteet: https://httpd.apache.org/docs/2.4/getting-started.html https://httpd.apache.org/docs/current/vhosts/name-based.html

## Tehtävät

x) Lue ja tiivistä. Tiivistelmäksi riittää muutama ranskalainen viiva per artikkeli. (Tässä alakohdassa ei tarvitse tehdä testejä tietokoneella)

    Apache Software Foundation 2023: Getting Started
    Apache Software Foundation 2023: Name-based Virtual Host Support

a) Vaihda Apachelle uusi etusivu. Varmista, että voit muokata sivua normaalilla käyttäjällä (ilman sudoa).
b) Tee Apachen asetustiedostoon kirjoitusvirhe. Etsi se työkalujen avulla. Vertaa 'apache2ctl configtest' ja virhelokin /var/log/apache2/error.log virheilmoituksia.

## Tiivitys

### Apache Software Foundation 2023: Getting Started

  - DNS on tarpeellinen
  - Verkkosivujen sisältö voidaan jakaa staattiseen ja dynaamiseen
  - Error login sijainnin voi muuttaa ErrorLog direktiivillä (konfiguraatio tiedostossa)

### Apache Software Foundation 2023: Name-based Virtual Host Support

  - Name-based Virtual Host antaa yhden IPn palvella monta eri URL osoitetta
  - VirtualHost > ServerName/ServerAlias
  - Jos sopivaa ServerName tai ServerAlias tietuetta ei löydy, käytetään listan ensimmäistä
  - Minimi vaatimukset: VirtualHost-osion sisällä pitää olla ServerName ja DocumentRoot


## Apachen etusivun vaihtaminen, taas

Luodaan uusi kansio sisältämään tuo, niin päästään muokkaamaan konfiguraatiotiedostoa kerran.

      mkdir publicer_frontpage
      cd publicer_frontpage
      micro index.html

![image](https://user-images.githubusercontent.com/122888695/216944468-523d4178-3252-410f-a31b-7c5c0bb045d8.png)

      
Laitetaan tiedostoon vähän tekstiä.

![image](https://user-images.githubusercontent.com/122888695/216944237-68ffc288-c714-4985-9896-2c72ce1b1e87.png)

Mennään muokkaamaan frontpage.conf tiedoston asetukset osoittamaan uuteen kansioon

![image](https://user-images.githubusercontent.com/122888695/216945017-badce724-6108-4232-a301-ae1d9ef23bb1.png)

![image](https://user-images.githubusercontent.com/122888695/216945146-502325b7-b593-4866-9aaf-eff18bc8bdf3.png)

Mennään katsomaan selaimesta tulos.

![image](https://user-images.githubusercontent.com/122888695/216945412-4c598b59-27b1-4629-936f-528120ecfbdb.png)

Toimii, testataan muokkausta ilman sudoa.

![image](https://user-images.githubusercontent.com/122888695/216947746-1232cff7-d826-46c6-859c-1675951407c5.png)

Ja tämän jälkeen tajusin, että eihän tuo ikkunan avaaminen periaatteessa todista, että voin muokata tuota ilman sudoa, vaikka oikeudet poistinkin ennen sitä...

Olisiko sille toisen tiedoston sisällön syöttäminen tarpeeksi?

![image](https://user-images.githubusercontent.com/122888695/216951748-eed4666d-c738-4726-9cf2-7ba5bc73d9a9.png)


## Rikotaan Apache

Menin /etc/apache2/ ja muokkasin apache2.conf tiedostoa, lisäsin ylimääräsen merkin merkkijonoon.

![image](https://user-images.githubusercontent.com/122888695/216965966-f505fdb2-3261-43bc-92fb-2c899a8feb0b.png)

Logitiedosto /var/log/apache2/error.log 

        [Mon Feb 06 13:57:31.693472 2023] [mpm_event:notice] [pid 2223:tid 139735677697344] AH00491: caught SIGTERM, shutting down
        
Apachectl configtest

        sudo apachectl configtest
        
Output

        AH00526: Syntax error on line 162 of /etc/apache2/apache2.conf:
        Argument for 'Require all' must be 'granted' or 'denied'
        Action 'configtest' failed.
        The Apache error log may have more information.
        
Lyhyt analyysi, tuo configtest virheilmoitus on paljon luettavampi ihmiselle ja viittaa jo virheeseen vaikka ei asiasta mitään oikeastaan tietäisi, ainakin tässä tapauksessa.
Vastaavasti tuo error.log login virheilmoitus vaatii vähintään Googletusta, ja parhaillaan sekään ei kerro mitään.
