## Tehtävä 1, Debian VirtualBox asennus

Asennukset tehtiin omalta Windows 10 pöytäkoneelta 2023.01.17 ~21:15-21:30

ISO image: https://cdimage.debian.org/images/unofficial/non-free/images-including-firmware/current-live/amd64/iso-hybrid/ (debian-live-11.6.0-amd64-xfce+nonfree.iso)

VirtualBox: https://www.virtualbox.org/wiki/Downloads (Windows hosts / VirtualBox-7.0.4-154605-Win.exe)

Tehtävänanto: https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h1-virtuaali-linux

### VirtualBox asennus 
Asennus oletus asetuksilla painaen aikalailla Next tai Install kunnes prosessi on ohi.

![Screenshot 2023-01-17 210950](https://user-images.githubusercontent.com/122888695/213005779-ab66c724-ac0f-4626-8bcf-f8c661a42293.png)
![Screenshot 2023-01-17 211014](https://user-images.githubusercontent.com/122888695/213005841-0e2ade46-b56a-4c20-8eeb-ddbb2d0d54c7.png)
![Screenshot 2023-01-17 211023](https://user-images.githubusercontent.com/122888695/213005850-f2b397b1-71cf-473a-ab3d-06183e14987a.png)
![Screenshot 2023-01-17 211033](https://user-images.githubusercontent.com/122888695/213005856-60e1ba62-2e8b-4631-acf2-3cb3bc9b52e2.png)
![Screenshot 2023-01-17 211043](https://user-images.githubusercontent.com/122888695/213005869-40d50522-20f7-4be8-8505-198e6a63c1ec.png)
![Screenshot 2023-01-17 211052](https://user-images.githubusercontent.com/122888695/213005914-3839bc00-51ff-4563-ba81-1939e852a591.png)


### Debian lisääminen VirtualBoxiin
Luodaan uusi VM valitsemalla VirtualBoxista New.

![Screenshot 2023-01-17 211154](https://user-images.githubusercontent.com/122888695/213005947-39105060-16ea-43f6-8694-fe674b883e11.png)

Asetuksista valitaan expert mode päälle ja muuttuvasta näkymästä Skip Unattended Installation.
Tämän jälkeen annetaan virtuaalikoneelle nimi, määrätään kansio mihin virtuaalilevy tallentuu, ja mitä .ISO-kuvaa käytetään. 

![Screenshot 2023-01-17 211354](https://user-images.githubusercontent.com/122888695/213005997-9a846d68-67aa-4911-a464-383095ba4fe9.png)

Hardware välilehdeltä lisätään muistia ja ytimiä muutama kun niitä nyt on omassa koneessa käytettävissä.

![Screenshot 2023-01-17 211558](https://user-images.githubusercontent.com/122888695/213006009-144919f7-6fd5-41c9-b14d-fe1d45897bc5.png)

Hard Disk välilehdeltä lisätään levylle kokoa, muuten asetuksiin ei koskettu.

![Screenshot 2023-01-17 211707](https://user-images.githubusercontent.com/122888695/213006017-573e0ad2-e99f-4138-b83e-8ec8a3f4c045.png)

Näiden jälkeen valittiin Finish.

### Debian asennus ja ensimmäinen käynnistys

Virtuaalikoneen käynnistyksen jälkeen, koska käytössä on live image, tulee boottikysely. Valitaan ylin ja odotetaan latausta hetken.

![Screenshot 2023-01-17 211824](https://user-images.githubusercontent.com/122888695/213006539-03e75c82-4e18-4cba-a2b5-e387cc8d24cd.png)

Käyttöjärjestelmän käynnistyttyä, valitaan 'Install Debian' työpöydältä.

![Screenshot 2023-01-17 212004](https://user-images.githubusercontent.com/122888695/213006689-0a8d0623-2200-4ab5-93df-0093c390acc1.png)

Calamares installer käynnistyy josta valitaan asetukset asennukselle. (Jokaisen vaiheen jälkeen Next)

Ensin kieli, jätin oletusasetukselle.

![Screenshot 2023-01-17 212036](https://user-images.githubusercontent.com/122888695/213006837-152e3fa3-5ae1-4ece-a6f9-07ff411075ef.png)

Sitten aikavyöhyke, valittiin Europe/Helsinki

![Screenshot 2023-01-17 212050](https://user-images.githubusercontent.com/122888695/213006893-98dce15f-49ad-45fa-b800-426a0efecba0.png)

Näppäimistö, valittiin Suomi

![Screenshot 2023-01-17 212102](https://user-images.githubusercontent.com/122888695/213006939-dcd8605f-92da-4eff-b6df-96c6a6ba00d1.png)

Levyn osioittaminen(?). Valittiin Erase disk.

![Screenshot 2023-01-17 212206](https://user-images.githubusercontent.com/122888695/213007049-06d8f844-4e25-49dd-a8a8-1a9bf50e7546.png)

Käyttäjätunnuksen tiedot, koneen nimi ja salasana täytettiin.

![Screenshot 2023-01-17 212325](https://user-images.githubusercontent.com/122888695/213007125-0c599823-6a71-42e3-be66-5c2dc478ac15.png)

Yhteenveto asennuksista, jouduin itse maksimoida ikkunan tässä välissä, koska nappulat olivat resoluution takia piilossa oikeasta alakulmasta. Valittiin Install kun se tuli näkyviin.

![Screenshot 2023-01-17 212350](https://user-images.githubusercontent.com/122888695/213007164-d0c8ffb1-9ee3-4bad-aff4-80a05c25f312.png)
![Screenshot 2023-01-17 212411](https://user-images.githubusercontent.com/122888695/213007270-a456e55c-91c4-412a-90f4-f5af727ae32a.png)

Install painamisen jälkeen päästiin odottamaan asennuksen valmistumista. 

![Screenshot 2023-01-17 212506](https://user-images.githubusercontent.com/122888695/213007367-47880b77-de36-4cef-a3d4-6318e708a439.png)

Asennuksen jälkeen virtuaalikone piti käynnistää uudelleen. Painoin Done ja annoin virtuaalikoneen uudelleenkäynnistyä. 

![Screenshot 2023-01-17 212926](https://user-images.githubusercontent.com/122888695/213007452-c017fdb6-8fb2-46db-bb72-06566f3d5da0.png)

Bootin jälkeen tuli vielä kysely mikä OS halutaan käynnistää. Valitsin ylimmän.

![Screenshot 2023-01-17 213001](https://user-images.githubusercontent.com/122888695/213007602-c8457d3d-15ba-41d5-897c-068548d9719b.png)

Ja Debian käynnistyi. 

![Screenshot 2023-01-17 213039](https://user-images.githubusercontent.com/122888695/213007639-2c1a4955-c6e6-4db1-a99d-14c7b59c2630.png)
![Screenshot 2023-01-17 223950](https://user-images.githubusercontent.com/122888695/213007704-50a63893-3b2f-4741-acb2-013732f14793.png)

## Linuxin päivitys
Vedin nämä vähän eri järjestyksessä/oman muistin mukaan.

	sudo apt-get update
	sudo apt-get upgrade
			
![Screenshot 2023-01-18 000539](https://user-images.githubusercontent.com/122888695/213022714-43232099-122b-499e-bab0-5e0f693ac329.png)

Seuraava komento ei enää löytänyt päivityksiä

	sudo apt-get -y dist-upgrade

![Screenshot 2023-01-18 001002](https://user-images.githubusercontent.com/122888695/213023529-d9a12556-b0ff-4ade-9dbd-962ac761b332.png)

Palomuurin asennus

	sudo apt-get -y install ufw
	
![Screenshot 2023-01-18 001243](https://user-images.githubusercontent.com/122888695/213023824-fb648cb7-8de4-454b-a5e8-7e21224b979f.png)

Palomuurin enablointi

	sudo ufw enable
	
![Screenshot 2023-01-18 001443](https://user-images.githubusercontent.com/122888695/213024177-ef0764d1-8dea-4f87-a962-20380f21867b.png)

Tämän jälkeen Logout > Restart

## Testaus

Vielä viimeiseksi testi, että kaikki toimii oletetusti.

### Verkko
Avasin Firefoxin, testasin verkkoa terokarvinen.com

![Screenshot 2023-01-18 001847](https://user-images.githubusercontent.com/122888695/213024856-b72df3df-ab51-4d02-ab56-4efd19cfb7ea.png)

Näppäimistö libre officella

![Screenshot 2023-01-18 002130](https://user-images.githubusercontent.com/122888695/213025249-d8aa658e-5c61-4ba0-93fb-59d1b15b75a3.png)


