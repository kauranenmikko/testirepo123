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

Koitetaan yhteyttä ennen muutosta.

      ssh -p 8888 localhost
      
![image](https://user-images.githubusercontent.com/122888695/230592943-b18c19e4-5fc7-41a9-81d5-63c89a62acaf.png)


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

## Automatisoidaan tehty muutos

Luodaan sshd.sls tiedosto joka voidaan puskea, joka sisältää tarvittavat tiedostopolut ja viittaukset.

      cd /srv/salt
      sudo micro sshd.sls
      

```
openssh-server:
 pkg.installed
/etc/ssh/sshd_config:
 file.managed:
   - source: salt://sshd_config
sshd:
 service.running:
   - watch:
     - file: /etc/ssh/sshd_config
```

Kopioidaan masterin sshd tiedosto tänne, niin ei tarvitse tehdä uudelleen.

      sudo cp /etc/ssh/sshd_config /srv/salt/

Testataan.

      sudo salt '*' state.apply sshd

![image](https://user-images.githubusercontent.com/122888695/230596526-cd2203b5-53b7-4192-ae06-5153bb5c44cb.png)

Näköjään sshd oli jo asennettu, ei sinäänsä yllätä. Muutos ilmeisesti config tiedostoon meni läpi.

Tuosta service.running päätellen näyttäisi, että demoni käynnistyi myös uudelleen.

Testataan.

      sudo salt '*' cmd.run 'hostname -I'  # Hain IPt
      ssh -p 8888 192.168.56.100

![image](https://user-images.githubusercontent.com/122888695/230597031-f27016ad-2154-4f97-bf61-c7f937189fc0.png)

Toimii, tosin edelleen tulee avaimen verifikaation kanssa ongelmia. Pitänee jossakin vaiheessa tutkia tuo. 


## Ylimääräinen muutos sshd_config tiedostoon.

Testataan ensin ilman muutoksia.

Aikaisempi käynnistysaika ylemmästä tehtävästä demonille t001 koneella pitäisi olla `10:48:08.507246`.

Katsotaan mikä se oikeasti on. 

      sudo salt '*' cmd.run 'systemctl status sshd'
      
![image](https://user-images.githubusercontent.com/122888695/230598031-a493b104-688c-4aff-829e-21127ec581a2.png)

Eli kummallakin koneella `2023-04-07 10:48:08`

Ajetaan sshd.sls uudelleen ja katsotaan muuttuuko mikään.

      sudo salt '*' state.apply sshd

![image](https://user-images.githubusercontent.com/122888695/230598202-6e5d3fee-7c85-4577-8865-a27d6f01dd04.png)

Muutoksia ei näy. Tarkistetaan taas koneilta itse. 

      sudo salt '*' cmd.run 'systemctl status sshd'
      
![image](https://user-images.githubusercontent.com/122888695/230598328-432596a9-3858-4106-8a72-c91f56ce5d2b.png)

Demoni siis ei käynnistynyt uudelleen jos muutoksia ei puskettu.

Nyt tehdään muutos, lisätään uusi portti tiedostoon.

      sudo micro sshd_config
      
Lisätään rivi `Port 7777`
      
Pusketaan muutos.

      sudo salt '*' state.apply sshd
      
![image](https://user-images.githubusercontent.com/122888695/230598607-fbb51335-41b1-48e0-ab26-2316a17b487b.png)

Muutos meni läpi.

![image](https://user-images.githubusercontent.com/122888695/230598635-eeda7aae-c0a9-4172-bf9e-91cf54768427.png)

Tämän mukaan service myös käynnistyi uudelleen. Tarkistetaan se vielä.

      sudo salt '*' cmd.run 'systemctl status sshd'

![image](https://user-images.githubusercontent.com/122888695/230598731-f1627c07-d2d9-43cf-8bbc-3a7509f0bd33.png)

Jep.

Sitten koitetaan lisättyä porttia vielä.

      ssh -p 7777 192.168.56.100
      
![image](https://user-images.githubusercontent.com/122888695/230598904-a75158d0-7d0b-4e79-8327-4faed0fc4ca6.png)

Toimii. Vaikka vieläkin avainongelma.

## Säädetään Apachea nopeasti

Käytän hyvinpitkälti samaa pohjaa kuin ylempänä.



![image](https://user-images.githubusercontent.com/122888695/230488478-fef2daf7-b172-4fe1-bd81-cf9c9185ec4f.png)

