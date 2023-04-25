## h4 Komennus

### Ympäristö:

Host: Windows 10 Pro 19044.2728, AMD Ryzen 7 5800X3D, 32GB RAM, Virtualbox 7.0.4 r154605

Guest: Aikaisemmassa kurssissa tehty Debian GNU/Linux 11 (bullseye), 8GB RAM, 4 ydintä, 60GB kovalevytilaa, Nested VT-x/AMD-V enabloitu.
Tehtävä: https://terokarvinen.com/2023/palvelinten-hallinta-2023-kevat/#h4-komennus

### a) hello.sh

Tehdään shell scripti ja laitetaan se käyttäjille saataville.

    cd scriptest/
    micro shineboi
    
Tiedoston sisältö    
```
#!/usr/bin/bash

echo "shine"
```
Annetaan scriptille oikeudet

    chmod ugo+rx shineboi
    
Testataan

    ./shineboi
    
![image](https://user-images.githubusercontent.com/122888695/234267806-a2c9fd40-a7ec-405f-a994-bf85eab84e7f.png)


Siiretään se muille käyttäjille myös saataville.

    sudo cp shineboi /usr/local/bin
    
Suoritetaan ilman ./ scriptin nimen edessä.

    shineboi

![image](https://user-images.githubusercontent.com/122888695/234268146-29ded6c9-8e54-4ffb-8cbe-002b13c41e73.png)

Luodaan uusi tunnus ja varmistetaan scriptin toimivuus ja saatavuus.

    sudo adduser mikkote3
    
    shineboi
    
![image](https://user-images.githubusercontent.com/122888695/234273950-985e0bdf-d6ce-4d51-be9f-c0452254c65e.png)

### b) hello.py

Sama juttu, python scriptille.

    micro pythontest

```
#!/usr/bin/python3

print("Tämä on python scripti")
```

Oikeudet ja testataan

    chmod ugo+rx pythontest
    ./pythontest
    
![image](https://user-images.githubusercontent.com/122888695/234276698-ae345835-920d-4fc5-8f5e-0653502c7712.png)

Siirretään /usr/local/bin ja testaan toisella käyttäjällä.
```
sudo cp pythontest /usr/local/bin
```
```
su mikkote3
```    
```    
pythontest
```
![image](https://user-images.githubusercontent.com/122888695/234276222-bbf034ae-a063-458e-a950-c696210f7fb2.png)


### c) Automatisoi näiden skriptien asennus orjille Saltilla.

Koska tein ylemmät vagrant ympäristön ulkopuolella, käytin samoja komentoja tekemään ne vagrant tmaster koneelle.

Luodaan scriptien kopiointi .sls tiedosto.

    micro scriptcopy.sls

```
/usr/local/bin/shineboi:
  file.managed:
    - source: "salt://shineboi"
    - mode: "0755"
    
/usr/local/bin/pythontest:
  file.managed:
    - source: "salt://pythontest"
    - mode: "0755"
    
```

Ajetaan komento orjille

    sudo salt '*' state.apply scriptcopy
    
Testataan

    sudo salt '*' cmd.run shineboi
    sudo salt '*' cmd.run pythontest

![image](https://user-images.githubusercontent.com/122888695/234285482-71fbb724-6384-49b8-a54d-96a84354cba6.png)

### d) Asenna jokin yhden binäärin ohjelma Saltilla orjille.