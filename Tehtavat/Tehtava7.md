    
    x) Lue ja tiivistä. Tiivistelmäksi riittää muutama ranskalainen viiva per artikkeli. (Tässä alakohdassa ei tarvitse tehdä testejä tietokoneella)
        Karvinen 2012: First Steps on a New Virtual Private Server – an Example on DigitalOcean and Ubuntu 16.04 LTS
    a) Vuokraa oma virtuaalipalvelin haluamaltasi palveluntarjoajalta. (Vaihtoehtona voit käyttää ilmaista kokeilujaksoa, GitHub Education krediittejä; tai jos mikään muu ei onnistu, voit kokeilla vagran:tia paikallisesti).
    b) Tee alkutoimet omalla virtuaalipalvelimellasi: tulimuuri päälle, root-tunnus kiinni, ohjelmien päivitys.
    c) Asenna weppipalvelin omalle virtuaalipalvelimellesi. Korvaa testisivu. Kokeile, että se näkyy julkisesti. (Muista tehdä reikä tulimuuriin).
    d) Etsi merkkejä murtautumisyrityksistä.


## Tiivistys

- ssh _käyttäjätunnus_@_ip osoite_ aloittaa SSH istunnon.
- luo uusi tunnus ja anna sille hyvä salasana, lisää se sudo ryhmään
- root tunnukselta kannattaa aina ottaa kirjautuminen pois, liian käytetty tunnus
- Päivitykset tärkeät
- sudo ufw allow portti/protocolla antaa avata portteja jos tarve
    - vastaavasti disable sammuttaa portteja
    - muista avata portti 22/TCP tai SSH yhteys ei enää toimi
    - portti 80 tarvittu myös HTTP liikenteeseen/verkkosivuja varten


## Virtualipalvelimen vuokraus

Käytin GitHub Education paketin kautta DigitalOcean palveluita, tein sinne virtuaalikoneen. (Alla ohje käytännössä miten se meni, en tee uudelleen tässävaiheessa)

![image](https://user-images.githubusercontent.com/122888695/217696642-5dffb9da-8bd4-4188-b855-89ffa4d828d3.png)

Tässä DigitalOceanin etusivu. Virtuaalikoneita (ja muita asioita) luodaan valitsemalla Create oikeasta ylänurkasta. Valitaan Create > Droplets

![image](https://user-images.githubusercontent.com/122888695/217696773-5043539f-af2c-402b-a6b6-d68701d1a205.png)

Mentiin aika perusasetuksilla, vaihdettiin Debian imageksi, Shared CPU/Regular/6$, SSH avain, vaihdettiin Hostname.

![image](https://user-images.githubusercontent.com/122888695/217697053-0c798a26-c842-4617-ad84-64de9af1e5eb.png)

![image](https://user-images.githubusercontent.com/122888695/217697098-5fa417b9-9a4e-4c38-9e2a-fbf90876542c.png)

![image](https://user-images.githubusercontent.com/122888695/217697133-a3eb192c-96cf-4213-962f-5f63c0d0c0dc.png)

![image](https://user-images.githubusercontent.com/122888695/217697164-1dccba89-645d-401d-8dbf-ce0a14a124a2.png)

![image](https://user-images.githubusercontent.com/122888695/217697277-6c71c0bf-8171-4e86-abf6-29db888a3eb5.png)

Tämän jälkeen painettiin Create Droplet, ja odotettiin hetki.

Luotu virtuaalikone tulee näkyviin etusivulle (projektin alle), ja sieltä joutuu vähintään hakea tuon IP osoitteen jolla ottaa yhteyttä.

![image](https://user-images.githubusercontent.com/122888695/217697633-4f0c836f-0553-4b58-9796-8041417bb36e.png)

Perus root tunnuksella ja IPllä pääsee koneeseen sisälle


## Virtuaalikoneen ensiasekeleet

Tein näistä jo suurimman osan tunnin aikana samalla, mutta otan ne historiasta ja laitan alle.

Koneeseen yhdistys VirtualBoxissa olevalta koneelta.

    ssh root@165.232.126.162
    
Koneeseen yhdistettyä palomuuri päälle ja asetuksia kuntoon.

    1  sudo apt-get install ufw
    2  sudo ufw allow 22/tcp
    3  sudo ufw enable

Jälkikäteen huomasin, että tämähän ei taaskaan tarkoita, että palomuuri kuitenkaan on _päällä_ vaikka se on "enabloitu", joten kannattanee vetää `sudo systemctl start ufw` .

Tämän jälkeen lisättiin käyttäjä.

    4  sudo adduser mikko
    5  sudo adduser mikko sudo
    6  sudo adduser mikko adm
    7  sudo adduser mikko admin

Nämä komennot otettiin aika suoraan ohjeista, ja tosiaan ryhmä admin ei ole enää olemassa ainakaan tässä Debian distrossa.'

Tämän jälkeen koitettiin yhdistää koneeseen SSHlla tuolle luodulle käyttäjälle mikko. 
Tässä törmättiin ongelmaan, joka nyt kun sen selvitti tekee järkeä, koska tuo DigialOcean palvelu hoiti tämän minun puolesta ekalla kerralla. 
Uudelta käyttäjältä puuttuu authorized_keys kansio ja sen sisältö kokonaan, jotta voit yhdistää käyttäjälle luomallasi SSH avaimella.

![image](https://user-images.githubusercontent.com/122888695/217700112-e09d2999-64d4-484d-94be-7520378ceb7c.png)

En ole vieläkään korjannut sitä tuolle käyttäjälle, jätin sen tahallaan rikki ja lähdin selvittelemään toisella käyttäjällä.

Eli ongelma on tämä.

![image](https://user-images.githubusercontent.com/122888695/217701081-53104f32-b7bf-461c-9716-21764d2ad713.png)

Ja saatan olla väärässä, mutta vahvasti vaikuttaisi siltä, että ilman tuota .ssh hakemistoa ja sen sisällä olevaa authorized_keys tiedostoa, SSH yhteys ei tule ikinä toimimaan pelkällä SSH avaimella.

No, ei anneta sen häiritä menoa tässä vaiheessa. Tarkoittaa vaan, että artikkelissa neuvottua sshd_config tiedoston muutosta ei tehty vielä, koska ei välttämättä ole kauhean hyvä idea estää ainoan tunnuksen käyttöä johon pystyin yhdistää. Haetaan päivityksiä, asennetaan apache2, avataan portti 80.

    13  sudo apt-get update
    14  sudo apt-get upgrade
    15  exit
    16  sudo apt-get install apache2
    17  sudo ufw allow 80/tcp
   

Lukitaan root tunnus salasanakirjautumiselta.

    19  usermod --lock root



## Apache2

Asensin sen jo aikaisemmassa vaiheessa, joten teen tässä lyhyet ja nopeat muokkaukset siihen.

Alkoi myös ärsyttämään tuo nanon käyttö, asennettiin micro

        sudo apt-get install micro

![image](https://user-images.githubusercontent.com/122888695/217703894-4f6a6838-d662-4d73-bf5d-72453c8281a7.png)

![image](https://user-images.githubusercontent.com/122888695/217704432-58e022d6-eaa2-44b2-b10d-003d3726e02f.png)

Kansiota tai index.html tiedostoa ei vielä tässä vaiheessa ole tuossa sijainnissa, käydään tekemässä se.

![image](https://user-images.githubusercontent.com/122888695/217704910-5ec94b0f-59d8-487c-a361-19db02c6d36d.png)

![image](https://user-images.githubusercontent.com/122888695/217704686-2f16145e-9957-4eff-a7f8-08271361ad7e.png)

![image](https://user-images.githubusercontent.com/122888695/217705160-f90260f2-7503-4b81-9959-03efe66ceb31.png)


        http://165.232.126.162/

Tosiaan portin avaus tapahtui jo ylemmässä vaiheessa, mutta lisätään se vielä tähän kerran

        sudo ufw allow 80/tcp
        
        
## Murtautumisia?

Tiesin jo että näitä on paljon, mutta kyllähän se vähän yllättää, että vajassa kolmessa päivässä logiin auth.logiin kertyy 3600 riviä.
        
    Feb  8 16:42:42 debiantest sshd[25303]: Invalid user odoo8 from 189.159.15.128 port 43680
    Feb  8 16:42:42 debiantest sshd[25303]: Connection closed by invalid user odoo8 189.159.15.128 port 43680 [preauth]
    Feb  8 16:43:55 debiantest sshd[25305]: Invalid user admin from 14.47.209.92 port 61095
    Feb  8 16:43:58 debiantest sshd[25305]: error: maximum authentication attempts exceeded for invalid user admin from 14.47.209.92 port 61095 ssh2 [preauth]
    Feb  8 16:43:58 debiantest sshd[25305]: Disconnecting invalid user admin 14.47.209.92 port 61095: Too many authentication failures [preauth]
    Feb  8 16:44:01 debiantest sshd[25307]: Invalid user admin from 14.47.209.92 port 61155
    Feb  8 16:44:05 debiantest sshd[25307]: error: maximum authentication attempts exceeded for invalid user admin from 14.47.209.92 port 61155 ssh2 [preauth]
    Feb  8 16:44:05 debiantest sshd[25307]: Disconnecting invalid user admin 14.47.209.92 port 61155: Too many authentication failures [preauth]
    Feb  8 16:44:07 debiantest sshd[25309]: Invalid user admin from 14.47.209.92 port 61235
    Feb  8 16:44:09 debiantest sshd[25309]: Connection reset by invalid user admin 14.47.209.92 port 61235 [preauth]
    Feb  8 17:32:31 debiantest sshd[25449]: Invalid user vadmin from 14.45.116.152 port 61362
    Feb  8 17:32:33 debiantest sshd[25449]: Connection closed by invalid user vadmin 14.45.116.152 port 61362 [preauth]
    Feb  8 17:47:06 debiantest sshd[25457]: Invalid user deploy from 36.38.62.211 port 49628
    Feb  8 17:47:11 debiantest sshd[25457]: error: maximum authentication attempts exceeded for invalid user deploy from 36.38.62.211 port 49628 ssh2 [preauth]

Kiinostaisi tietää mistä tulee tunnus odoo8. Tämä on vain pieni snippetti näistä riveistä, lasketaas ne oikeen huvikseen.

    cat /var/log/auth.log | grep -i -c 'invalid user'
    
![image](https://user-images.githubusercontent.com/122888695/217706496-65aa6f15-91e8-4a9e-b54b-1881429f5215.png)

Jep. En ainakaan löytänyt yhtään ulkoista kirjautumista joka olisi onnistunut vielä, että siitä joku boonus.
