## Tehtävä 1, Debian VirtualBox asennus

ISO image: https://cdimage.debian.org/images/unofficial/non-free/images-including-firmware/current-live/amd64/iso-hybrid/
VirtualBox: https://www.virtualbox.org/wiki/Downloads

### VirtualBox asennus 
Asennus oletus asetuksilla painaen aikalailla Next tai Install kunnes prosessi on ohi.
![Screenshot 2023-01-17 210950](https://user-images.githubusercontent.com/122888695/213005779-ab66c724-ac0f-4626-8bcf-f8c661a42293.png)
![Screenshot 2023-01-17 211014](https://user-images.githubusercontent.com/122888695/213005841-0e2ade46-b56a-4c20-8eeb-ddbb2d0d54c7.png)
![Screenshot 2023-01-17 211023](https://user-images.githubusercontent.com/122888695/213005850-f2b397b1-71cf-473a-ab3d-06183e14987a.png)
![Screenshot 2023-01-17 211033](https://user-images.githubusercontent.com/122888695/213005856-60e1ba62-2e8b-4631-acf2-3cb3bc9b52e2.png)
![Screenshot 2023-01-17 211043](https://user-images.githubusercontent.com/122888695/213005869-40d50522-20f7-4be8-8505-198e6a63c1ec.png)
![Screenshot 2023-01-17 211052](https://user-images.githubusercontent.com/122888695/213005914-3839bc00-51ff-4563-ba81-1939e852a591.png)


### Debian lisääminen VirtualBoxiin
Luodaan uusi VM.

![Screenshot 2023-01-17 211154](https://user-images.githubusercontent.com/122888695/213005947-39105060-16ea-43f6-8694-fe674b883e11.png)

Asetuksista valitaan expert mode ja Skip Unattended Installation.
Samalla valitaan kansio levylle ja ISO kuva.

![Screenshot 2023-01-17 211354](https://user-images.githubusercontent.com/122888695/213005997-9a846d68-67aa-4911-a464-383095ba4fe9.png)

Hardware välilehdeltä lisätään muistia ja ytimiä muutama kun niitä nyt on.

![Screenshot 2023-01-17 211558](https://user-images.githubusercontent.com/122888695/213006009-144919f7-6fd5-41c9-b14d-fe1d45897bc5.png)

Hard Disk välilehdeltä lisätään levylle kokoa.

![Screenshot 2023-01-17 211707](https://user-images.githubusercontent.com/122888695/213006017-573e0ad2-e99f-4138-b83e-8ec8a3f4c045.png)

### Debian käynnistys ja oikea asennus

Virtuaalikoneen käynnistyksen jälkeen, aukeaa perus live-debian boottikysely. Valitaan ylin ja odotetaan latausta hetken.

![Screenshot 2023-01-17 211824](https://user-images.githubusercontent.com/122888695/213006539-03e75c82-4e18-4cba-a2b5-e387cc8d24cd.png)

Käyttöjärjestelmän käynnistyttyä, valitaan 'Install Debian' työpöydältä.

![Screenshot 2023-01-17 212004](https://user-images.githubusercontent.com/122888695/213006689-0a8d0623-2200-4ab5-93df-0093c390acc1.png)

Calamares installer käynnistyy, ja valitaan asetukset asennukselle.
Ensin kieli.

![Screenshot 2023-01-17 212036](https://user-images.githubusercontent.com/122888695/213006837-152e3fa3-5ae1-4ece-a6f9-07ff411075ef.png)

Sitten aikavyöhyke

![Screenshot 2023-01-17 212050](https://user-images.githubusercontent.com/122888695/213006893-98dce15f-49ad-45fa-b800-426a0efecba0.png)

Näppäimistö

![Screenshot 2023-01-17 212102](https://user-images.githubusercontent.com/122888695/213006939-dcd8605f-92da-4eff-b6df-96c6a6ba00d1.png)

Levyn jakaminen

![Screenshot 2023-01-17 212206](https://user-images.githubusercontent.com/122888695/213007049-06d8f844-4e25-49dd-a8a8-1a9bf50e7546.png)

Käyttäjätunnus, koneen nimi ja salasana

![Screenshot 2023-01-17 212325](https://user-images.githubusercontent.com/122888695/213007125-0c599823-6a71-42e3-be66-5c2dc478ac15.png)

Yhteenveto asennuksista, jouduin itse maksimoida ikkunan tässä välissä, koska nappulat olivat resoluution takia piilossa.

![Screenshot 2023-01-17 212350](https://user-images.githubusercontent.com/122888695/213007164-d0c8ffb1-9ee3-4bad-aff4-80a05c25f312.png)
![Screenshot 2023-01-17 212411](https://user-images.githubusercontent.com/122888695/213007270-a456e55c-91c4-412a-90f4-f5af727ae32a.png)

Install painamisen jälkeen päästiin odottamaan asennuksen valmistumista. 

![Screenshot 2023-01-17 212506](https://user-images.githubusercontent.com/122888695/213007367-47880b77-de36-4cef-a3d4-6318e708a439.png)

Asennuksen jälkeen virtuaalikone piti käynnistää uudelleen.

![Screenshot 2023-01-17 212926](https://user-images.githubusercontent.com/122888695/213007452-c017fdb6-8fb2-46db-bb72-06566f3d5da0.png)

Uuden bootin jälkeen tuli vielä kysely mikä OS halutaan käynnistää. Valitsin ylimmän.

![Screenshot 2023-01-17 213001](https://user-images.githubusercontent.com/122888695/213007602-c8457d3d-15ba-41d5-897c-068548d9719b.png)

Ja Debian käynnistyi. 

![Screenshot 2023-01-17 213039](https://user-images.githubusercontent.com/122888695/213007639-2c1a4955-c6e6-4db1-a99d-14c7b59c2630.png)
![Screenshot 2023-01-17 223950](https://user-images.githubusercontent.com/122888695/213007704-50a63893-3b2f-4741-acb2-013732f14793.png)
