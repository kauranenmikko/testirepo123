## h5 Vaihtoehdot

### Ympäristö:

Host: Windows 10 Pro 19044.2846, AMD Ryzen 7 5800X3D, 32GB RAM, Virtualbox 7.0.4 r154605

Guest: Aikaisemmassa kurssissa tehty Debian GNU/Linux 11 (bullseye), 8GB RAM, 4 ydintä, 60GB kovalevytilaa, Nested VT-x/AMD-V enabloitu.
Tehtävä: https://terokarvinen.com/2023/palvelinten-hallinta-2023-kevat/#h4-komennus

## x) Lue ja tiivistä

### Windows with salt

- Masterin pitää olla vähintään yhtä uusi kuin orjien
- Windows ojrat hitaampia kuin Linux
- 'salt-call --local' on komento suorittaa komentoja lokaalisti PowerShellillä
- chocolatey on salt "lisäosa" isommalla ohjelmisto repolla


### Toisen opiskelijan tekemä raportti

https://johanlindell.fi/palvelintenhallinta#h6

- Tehtävä oli näköjään vähän erilainen, ajoi Linuxilta komentoja virtualisoituun Windowsiin verkon yli
- Manuaalinen Salt asennus Windows orjalle
- Avainten hyväksyntä toimii samalla tavalla
- Muista testata
- Antaa asentaa windows orjalle ohjelmia paketinhallinnan kautta

## a) Asenna Salt Windowsille

Ladataan Salt Windowsille https://docs.saltproject.io/salt/install-guide/en/latest/topics/install-by-operating-system/windows.html#windows-downloads

Painetaan Nextiä useasti

Next
![image](https://user-images.githubusercontent.com/122888695/235444391-d2d6c218-f618-440c-8c0c-a9fed41e36b5.png)

I Agree
![image](https://user-images.githubusercontent.com/122888695/235444450-2fc71e54-8111-4d74-9d74-69eaa4f86b0a.png)


Oletus asennussijainti on itselle ok, ei muuteta. Next.
![image](https://user-images.githubusercontent.com/122888695/235444481-ccb41414-5c48-4124-aea3-ac539651240b.png)

Tähän jätetään perus arvot, tulen käyttämään vain lokaalina niin näillä ei pitäisi olla merkitystä. Install.
![image](https://user-images.githubusercontent.com/122888695/235444528-7044aaea-108f-42d1-92ae-cbf4b60c2bca.png)

Ootetaan ~20 sekuntia. 
![image](https://user-images.githubusercontent.com/122888695/235444621-0f679e95-3960-4e34-9e63-061370f7d254.png)


