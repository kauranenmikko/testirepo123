   
   
    x) Yrityssoftaa. Keksi esimerkki palvelusta, jota käytetään wepissä selaimella, koodi ajetaan palvelimella ja taustalla on tietokanta. Mitä etuja tällä toteutustavalla on vaihtoehtoisiin toteutustapoihin verrattuna? (Tässä x-alakohdassa ei tarvitse tehdä testejä koneella tai toteuttaa mitään, pelkkä kuvittelu ja vastauksen kirjoittaminen riittää)
    a) Postgre. Asenna PostgreSQL ja testaa se suorittamalla SQL-komento. (Jos teit jo tunnilla, tee uusi Linux-käyttäjä ja tälle tietokanta ja tietokantakäyttäjä.)
    b) Crud. Kokeile CRUD (create, read, update, delete) kirjoittamalla SQL-käsin. (Artikkeli alla vinkeissä kertoo, kuinka tämä tehdään. Jos SQL on tuttua, voit keksiä tauluille ym omat aiheet ja nimet.)
    n) Vapaaehtoinen: Maria. Asenna MariaDB ja kokeille sillä CRUD.
    
    
## Yrityssofta/SQL

Tylsä esimerkki, mutta esim. keksityn firman keksitty verkkokauppa. Verkkokauppaan pystyy rekisteröidä tunnuksen verkkosivulla, joka sitten tallentuu tietokantaan. Tietokannassa on myös aika varmasti jokainen verkkokaupasta saatava tuote jonka tiedot sitten luetaan vain listamuodossa esille verkkosivulle.

Edut ovat varmaankin tietojen ylläpidon helppous, koska ne ovat yhdessä paikassa ja niillä pitäisi olla yhtenäisesti (ainakin omien taulujen sisällä) olla aika samanlaiset tiedot scheman takia. Vaihtoehtoisesti, kyllähän näitä on varmasti toteutettu kaikenlaisilla NSQL ratkaisuilla, tai jollakin saattaa olla tuotteet ihan hienosti pelkässä tekstitiedostossa jossa ne ylläpidetään. Eduiksi itse näen SQL pakottamat Schemat, järjestyksen ja tiedon muokkauksen helppouden. (ja oikeuksienhallinnan/logit vaikka ne ovat ehkä vähän eri aihe) 


## Postgre toinen tunnus

Sain Postgren jo toimimaan tunnilla, joten toinen tunnus ja sille tietokanta.

![image](https://user-images.githubusercontent.com/122888695/219545787-b0434890-6519-497c-9bc7-8daed3a145e5.png)

    sudo -u postgres createdb mikkote1
    sudo -u postgres createuser mikkote1
    su mikkote1

Ensin tarkistin /etc/passwd tiedostosta, millä nimillä olin luonut muut tunnukset. Yllä ne rivit mitkä oikeasti tekivät mitään tehtävään liittyvää.

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


Nyt koska minulla on kaksi riviä ihan samalla nimellä (mutta eri id:llä), jouduin ihan vähän muokkaamaan tätä seuraavaa askelta, jotta se oikeasti päivittää vain halutun rivin. Tarkistetaan taulun sisältö sen jälkeen.

    UPDATE test1 SET name='Mikko Kauranen' WHERE id=1 and name='Mikko';
     select * from test1;


![image](https://user-images.githubusercontent.com/122888695/219549130-f978ea5e-34e1-42be-b8bb-33d299edea57.png)

Tietenkin tässähän olisi käytännössä riittänyt vain tuo id=1, mutta se on vähän juksausta.

Poistetaan taulusta rivi 'Mikko' ja tarkistetaan taulun sisältö taas.

    DELETE FROM test1 WHERE name='Mikko';
     select * from test1;


![image](https://user-images.githubusercontent.com/122888695/219549391-33eb911b-2c54-4fbe-acc3-0d8c5e80d0a9.png)

Taulu suoritti tarvittavan. Taulu poistetaan.

      drop table test1;

![image](https://user-images.githubusercontent.com/122888695/219549671-a5454a9d-1144-4d98-a478-b079b4ea48e0.png)

;_;7

## Maria

Vähän erilainen tunnuksen luontiprosessi, mutta onneksi on ohjeet.

      sudo mariadb -u root
      create database test;
      create user 'mikko'@'localhost';
      grant all on test.* to mikko@localhost;
      exit
      mariadb -u mikko
      use test;
      create table testia; (vaatiikin vähintään yhden rivin tässä vaiheessa)
      create table testia (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(200), test FLOAT);
      
      
Tuo oli kaikki aika putkijuoksua ja vähän manuaalin lukemista.

Sitten itse testaaminen käyttäjällä tuohon lutuun tietokantaan ja sen tauluun.

       INSERT INTO testia(name, test) VALUES ("Testirivi", 105);
       INSERT INTO testia(name, test) VALUES ("Peruna", 1.5);
       select * from testia
 
![image](https://user-images.githubusercontent.com/122888695/219555829-417a32da-a87c-47c5-abee-83a516ff9e6a.png)

Tiedot menivät tauluun, taulun rivien päivitys.

      update testia SET test=10 where name="Peruna";
      select * from testia;

![image](https://user-images.githubusercontent.com/122888695/219556024-95ba1622-8eb8-44f1-8ece-c691edf27243.png)

Onnistui, seuraavaksi rivin poisto.

      delete from testia where test<100; 
      select * from testia;

![image](https://user-images.githubusercontent.com/122888695/219556121-f007dd6a-c7eb-4400-8dd0-fa37ebd1300b.png)

Sekin onnistui. 
          

## Lähteet

https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h9-sequel

https://terokarvinen.com/2016/03/05/postgresql-install-and-one-table-database-sql-crud-tutorial-for-ubuntu/

https://terokarvinen.com/2018/09/20/install-mariadb-on-ubuntu-18-04-database-management-system-the-new-mysql/
