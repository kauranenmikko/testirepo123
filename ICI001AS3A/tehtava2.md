## h2 Demonit

#### Ympäristö: 

Host: Windows 10 Pro 19044.2728, AMD Ryzen 7 5800X3D, 32GB RAM, Virtualbox 7.0.4 r154605

Guest: Aikaisemmassa kurssissa tehty Debian GNU/Linux 11 (bullseye), 8GB RAM, 4 ydintä, 60GB kovalevytilaa, Nested VT-x/AMD-V nyt enabloitu.

#### Tehtävä: https://terokarvinen.com/2023/palvelinten-hallinta-2023-kevat/#h2-demonit

## Tiivistykset

- Yksi tiedosto voi pitää sisällään monta eri muutosta
- Pystyt siirtämään masterilta kokonaisia tiedostoja haluamaasi sijaintiin "orja" koneille
- Testaa

## OpenSSH käsin ja portin lisäys

Poistetaan SSH ja tapetaan prosessi

      sudo apt-get purge ssh
      sudo systemctl skill ssh
      
![image](https://user-images.githubusercontent.com/122888695/230590032-b21cf50c-95e9-4522-b98e-82f7216fee7a.png)

Testataan

      ssh localhost
      
![image](https://user-images.githubusercontent.com/122888695/230590110-6db9758a-b92b-4234-8378-a8803eeb7d3f.png)


Asennetaan uudelleen

      sudo apt-get update
      sudo apt-get install ssh
      sudo systemctl start ssh
      
      ssh localhost
      
![image](https://user-images.githubusercontent.com/122888695/230590288-8c685b0b-3df8-4487-a578-365c81224792.png)

Ei välitetä siitä, että tuo avaimen todennus jostakin syystä epäonnistui. SSH toimii.

### Lisätään portti.

Asennetaan välissä nopeasti micro koska parempi editori

    sudo apt-get install micro
    
Siirrytään config tiedoston kansioon ja avataan tiedosto

    cd /etc/ssh/
    ls
    sudo micro sshd_config
    
Lisätään tiedostoon rivi `Port 8888`. Tallennetaan ja suljetaan tiedosto.

Koitetaan

    sudo systemctl restart sshd
    
    ssh -p 8888 localhost 

![image](https://user-images.githubusercontent.com/122888695/230592402-4a65cacd-84fa-4634-ae72-19a9328ae306.png)

Toimii.


![image](https://user-images.githubusercontent.com/122888695/230488478-fef2daf7-b172-4fe1-bd81-cf9c9185ec4f.png)

