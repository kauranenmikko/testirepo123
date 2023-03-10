Testaukset tehtiin Windows 10 pöytäkoneelta VirtualBoxissa olevaan Debian 11.6 versioon.

Tehtävät lähde: https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h5-hello-web

HTML Validator: https://validator.w3.org/


## Tiivistys

[https://share.transistor.fm/s/afa07210](https://www.indiehackers.com/podcast/205-new-biz-ideas) -  "New Business Ideas for 2021"

Vähän vanhempi jakso. Katsotaan mitä jäi päähän kuuntelun jälkeen.

- BlockChainille ei vieläkään ole keksitty mitään oikeata järkevää käyttötarkoitusta.
- Scammereitä/erilaisia projekteja tuli ja meni vauhdilla.
- Loputon seurattava internethistoria kaikesta mitä olet tehnyt joka on julkista ei välttämättä ole se mitä haluat.
- NTF olivat jo tällöin täysin turhia.
- Jos sinulla on rahaa, on parempi rakentaa itse palvelu kuin sijoittaa toisen palveluun.

## Vaihdetaan Apachen esimerkkisivu

![image](https://user-images.githubusercontent.com/122888695/216299669-934a6e10-2e27-4ac6-8b98-cc14877edc82.png)

Unohdin, että tuon tiedoston muokkaaminen vaatii sudoa, mutta menin avaaman /var/www/html/index.html tiedoston ja korvasin sen sisällön toisella kursilla tehdyllä verkkosivulla.

Selaimesta kuva.

![image](https://user-images.githubusercontent.com/122888695/216299962-a5bfe246-03f9-4d38-9dc4-52ed464952bf.png)

En lähde tuomaan .css tiedosotoja tai kuvia tänne, sivu toimii ilmankin niitä vaikka onkin ruma.


## Toisen käyttäjän kotisivut

Tein tämän jo aikaisemmin tunnin tauon aikana, tosin tein sen pelkästään Terminaalin kautta, jolloin piti käyttää sudoa, jotta pystyi kirjoittamaan toisen käyttäjän kansioihin tiedostoja.

Tässä esimerkkinä miten tein sen.

![AddUserHomePage](https://user-images.githubusercontent.com/122888695/216295280-5885d2cd-9a07-4c07-9fea-9289a4dc1e04.png)

Eli aika yksinkertainen prosessi, sudoa joutuu käyttää tai ei ole kirjoitusoikeutta toisen käyttäjän /home/ kansioihin. Alla vielä historiasta käytetyt komennot.

    391  sudo adduser mikkote2
    392  cd
    393  pwd
    394  cd /home/mikkote2
    395  pwd
    396  ls
    397  sudo mkdir public_html
    398  ls
    399  cd public_html/
    400  sudo micro index.html
    401  curl http://localhost/~mikkote2
    402  curl http://localhost/~mikkote2/

Muita käyttäjiä

![image](https://user-images.githubusercontent.com/122888695/216305575-0ee598d1-e96c-442e-915e-7c1dcc7f3797.png)

## Validi HTML sivu

![image](https://user-images.githubusercontent.com/122888695/216304275-535bdd6c-95f1-46b6-a04b-e99b89bc8fa8.png)

Valid enough.
