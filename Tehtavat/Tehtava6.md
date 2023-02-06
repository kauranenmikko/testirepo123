x) Lue ja tiivistä. Tiivistelmäksi riittää muutama ranskalainen viiva per artikkeli. (Tässä alakohdassa ei tarvitse tehdä testejä tietokoneella)

    Apache Software Foundation 2023: Getting Started
    Apache Software Foundation 2023: Name-based Virtual Host Support

a) Vaihda Apachelle uusi etusivu. Varmista, että voit muokata sivua normaalilla käyttäjällä (ilman sudoa).
b) Tee Apachen asetustiedostoon kirjoitusvirhe. Etsi se työkalujen avulla. Vertaa 'apache2ctl configtest' ja virhelokin /var/log/apache2/error.log virheilmoituksia.

## Tiivitys

  - DNS on tarpeellinen
  - Verkkosivujen sisältö voidaan jakaa staattiseen ja dynaamiseen
  - Error login sijainnin voi muuttaa ErrorLog direktiivillä (konfiguraatio tiedostossa)

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

