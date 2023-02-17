   
   
    x) Yrityssoftaa. Keksi esimerkki palvelusta, jota käytetään wepissä selaimella, koodi ajetaan palvelimella ja taustalla on tietokanta. Mitä etuja tällä toteutustavalla on vaihtoehtoisiin toteutustapoihin verrattuna? (Tässä x-alakohdassa ei tarvitse tehdä testejä koneella tai toteuttaa mitään, pelkkä kuvittelu ja vastauksen kirjoittaminen riittää)
    a) Postgre. Asenna PostgreSQL ja testaa se suorittamalla SQL-komento. (Jos teit jo tunnilla, tee uusi Linux-käyttäjä ja tälle tietokanta ja tietokantakäyttäjä.)
    b) Crud. Kokeile CRUD (create, read, update, delete) kirjoittamalla SQL-käsin. (Artikkeli alla vinkeissä kertoo, kuinka tämä tehdään. Jos SQL on tuttua, voit keksiä tauluille ym omat aiheet ja nimet.)
    n) Vapaaehtoinen: Maria. Asenna MariaDB ja kokeille sillä CRUD.
    
    
## Yrityssofta/SQL



## Postgre toinen tunnus

Sain Postgren jo toimimaan tunnilla, joten toinen tunnus ja sille tietokanta.

![image](https://user-images.githubusercontent.com/122888695/219545787-b0434890-6519-497c-9bc7-8daed3a145e5.png)

    sudo -u postgres createdb mikkote1
    sudo -u postgres createuser mikkote1
    su mikkote1

Ensin tarkistin /etc/passwd tiedostosta, millä nimillä olin luonut muut tunnukset. Yllä ne rivit mitkä oikeasti tekivät mitään.

Kirjauduin mikkote1 tunnukselle ja testasin psql komentoa. Koitin sen jälkeen suorittaa yksinkertaisen testin.

![image](https://user-images.githubusercontent.com/122888695/219546153-4df76d05-5c57-4fc3-9f70-301dfa6471ad.png)

Näyttää toimivan ihan oikein. 

## CRUD

Luodaan taulu ja tarkistetaan sen olemassaolo.

      CREATE TABLE TEst1 (id SERIAL PRIMARY KEY, name VARCHAR(100));
      \d

![image](https://user-images.githubusercontent.com/122888695/219547926-c24447e2-2a3c-40fd-a26c-d8c26ecbd381.png)

Nähtävästi ei huomioinut taulun isoja 'TE' merkkjä, harmi.

Lisätään tauluun rivi.

    INSERT INTO test1(name) VALUES ('Mikko');

Tarkistetaan, että tieto meni tauluun. (ja tästä välistä puuttuu yksi yritys, jossa onnistuin luomaan toisen rivin)

     select * from test1;

![image](https://user-images.githubusercontent.com/122888695/219548461-dc295370-b9e8-4088-acbf-96e54d23e0f9.png)


Nyt koska minulla on kaksi riviä ihan samalla nimellä (mutta eri id:llä), jouduin ihan vähän muokkaamaan tätä seuraavaa askelta, jotta se oikeasti päivittää vain halutun rivin.

    UPDATE test1 SET name='Mikko Kauranen' WHERE id=1 and name='Mikko';

![image](https://user-images.githubusercontent.com/122888695/219549130-f978ea5e-34e1-42be-b8bb-33d299edea57.png)

Tietenkin tässähän olisi käytännössä riittänyt vain tuo id=1, mutta se on vähän juksausta.

Poistetaan taulusta rivi 'Mikko' ja tarkistetaan taulun sisältö taas.

    DELETE FROM test1 WHERE name='Mikko';
     select * from test1;


![image](https://user-images.githubusercontent.com/122888695/219549391-33eb911b-2c54-4fbe-acc3-0d8c5e80d0a9.png)


## Maria

## Lähteet

https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h9-sequel

