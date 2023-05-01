## h5 Vaihtoehdot

### Ympäristö:

Host: Windows 10 Pro 19044.2846, AMD Ryzen 7 5800X3D, 32GB RAM, Virtualbox 7.0.4 r154605

Guest: Aikaisemmassa kurssissa tehty Debian GNU/Linux 11 (bullseye), 8GB RAM, 4 ydintä, 60GB kovalevytilaa, Nested VT-x/AMD-V enabloitu.
Tehtävä: https://terokarvinen.com/2023/palvelinten-hallinta-2023-kevat/#h5-vaihtoehdot

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

Avataan Powershell Admin ja mennään saltin asennuskansioon.

    cd "C:\Program Files\Salt Project\Salt"
    
Testataan toimiiko.

    ./salt-call --local test.ping
    
![image](https://user-images.githubusercontent.com/122888695/235445308-0bb3f977-5853-4492-8f63-8038e7738e23.png)

No, antoi edes _jotakin_ vastaukseksi.

## b/d) Ei voi kalastaa/Installed

Testataan, toimiiko komennot.

    salt-call --local cmd.run "ipconfig"

![image](https://user-images.githubusercontent.com/122888695/235448622-1cf37843-c881-43be-a2b5-c89610e664e1.png)

Näyttäisi toimivan.

Koitetaan asentaa jotakin. Ensin pitää päivittää repolista. Ohjeet löytyivät https://docs.saltproject.io/en/latest/topics/windows/windows-package-manager.html

Haetaan pakettilista.

    salt-call --local winrepo.update_git_repos
    
Päivittää listan tietokantaan.

    salt-call --local pkg.refresh_db
    

![image](https://user-images.githubusercontent.com/122888695/235447632-7e07f5d9-c0ee-4e94-b3eb-c87203c8075e.png)

Koitetaan asentaa jotakin. Listasta (https://github.com/saltstack/salt-winrepo-ng) löytyy hwinfo jonka tiedän puuttuvan tällähetkellä.

    salt-call --local pkg.install "hwinfo"

![image](https://user-images.githubusercontent.com/122888695/235448035-c60eeb39-d842-49f6-a112-98f125a38372.png)

Hm, ei onnistunut. Koitetaan jotakin toista pakettia?

    salt-call --local pkg.install "gedit"
    
![image](https://user-images.githubusercontent.com/122888695/235448163-6ea7f426-77ed-4747-ae63-a49b8b1d2fb7.png)

Onnistuu, vaikkakin tulee varoitus jostakin vanhasta SSL protokollasta.

Katsotaan asentuiko.

![image](https://user-images.githubusercontent.com/122888695/235448354-a8ee334c-632f-43bc-a200-41a663074d22.png)

Start menu löytää, ja asennuskansio?

![image](https://user-images.githubusercontent.com/122888695/235448401-090d61ab-4ad5-4f39-861e-48a6a2c7f78f.png)

Näyttäisi oikealta.

Poistetaan asennus.

    salt-call --local pkg.remove "gedit"
    
![image](https://user-images.githubusercontent.com/122888695/235448830-19c161f5-8d17-41e1-8a89-e266cbe6af46.png)


    ls "C:\Program Files (x86)\gedit"
    
![image](https://user-images.githubusercontent.com/122888695/235449431-4081e754-d230-434b-b79a-d115fc9b5395.png)

Näyttäisi aika poistuneelta.

## c) Hei ikkuna!

Meni vähän kauan tajuta mitenkä tämä tapahtuu Windowsin rakenteella, mutta kuitenkin.

Luodaan kansio .sls tiedostoa varten.

    mkdir C:\ProgramData\Salt Project\Salt\srv\salt\test
    
Luodaan kansioon init.sls tiedosto. Sisältö alla.

```
C:\Program Files\Salt Project\Salt\test.txt:
  file.managed
```

Testataan. 

    salt-call --local state.apply test
    
![image](https://user-images.githubusercontent.com/122888695/235456485-5dca8325-6541-4d54-b64d-125ba7cee509.png)

Näytti toimivan.

Mennään katsomaan onko tiedosto paikalla.

    ls "C:\Program Files\Salt Project\Salt\test.txt"

![image](https://user-images.githubusercontent.com/122888695/235456649-554abf90-de4b-4219-aa86-1a918fc171ab.png)

![image](https://user-images.githubusercontent.com/122888695/235456715-f41531b2-4670-4953-b6a9-521580bb6353.png)

Näyttäisi löytyvän.

## Lähteet

https://docs.saltproject.io/en/latest/ref/configuration/minion.html#std-conf_minion-winrepo_dir

https://docs.saltproject.io/salt/install-guide/en/latest/topics/downloads.html

https://terokarvinen.com/2023/palvelinten-hallinta-2023-kevat/#h5-vaihtoehdot

https://terokarvinen.com/2018/control-windows-with-salt/

https://johanlindell.fi/palvelintenhallinta#h6
