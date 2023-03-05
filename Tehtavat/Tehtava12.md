## Vianselvitys

### Lähtötilanne

Ympäristö on pystyssä, debug päällä osoitteessa lolcalhost ja localhost/static/ .

![image](https://user-images.githubusercontent.com/122888695/222965679-24a10d2d-3f06-4d7e-a817-fb794e76e6e6.png)

![image](https://user-images.githubusercontent.com/122888695/222965687-7d965faa-4183-4375-ac90-4755bec4e985.png)

![image](https://user-images.githubusercontent.com/122888695/222965704-f9335e31-ce6a-4050-9883-eddc2d26a4bc.png)

## Kirjoitusvirhe python-tiedostossa

Kommentoidaan /home/mikko/publictest/apate/wsgi.py import os rivi pois.

![image](https://user-images.githubusercontent.com/122888695/222966915-0e86c591-1b76-442b-8af4-f40d775fa26f.png)

Testataan verkkosivua.

![image](https://user-images.githubusercontent.com/122888695/222966951-13e98670-d179-47ad-af32-0db8b7d6e5d4.png)

Katsotaan /var/log/apache2/error.log

    [Sun Mar 05 16:35:25.189260 2023] [wsgi:error] [pid 2759:tid 139917683848960] [remote 127.0.0.1:43124] mod_wsgi (pid=2759): Failed to exec Python script file '/home/mikko/publictest/apate/wsgi.py'.
    [Sun Mar 05 16:35:25.189293 2023] [wsgi:error] [pid 2759:tid 139917683848960] [remote 127.0.0.1:43124] mod_wsgi (pid=2759): Exception occurred processing WSGI script '/home/mikko/publictest/apate/wsgi.py'.
    [Sun Mar 05 16:35:25.189356 2023] [wsgi:error] [pid 2759:tid 139917683848960] [remote 127.0.0.1:43124] Traceback (most recent call last):
    [Sun Mar 05 16:35:25.189375 2023] [wsgi:error] [pid 2759:tid 139917683848960] [remote 127.0.0.1:43124]   File "/home/mikko/publictest/apate/wsgi.py", line 15, in <module>
    [Sun Mar 05 16:35:25.189377 2023] [wsgi:error] [pid 2759:tid 139917683848960] [remote 127.0.0.1:43124]     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apate.settings')
    [Sun Mar 05 16:35:25.189386 2023] [wsgi:error] [pid 2759:tid 139917683848960] [remote 127.0.0.1:43124] NameError: name 'os' is not defined

Harmi sinäällään, HTTP 500 antoi jo toivoa, että virheteksti olisi ollut täysin turha, mutta sehän aika suoraan viittaa mikä puuttuu ja mistä. 

Rivi 15 tiedostossa /home/mikko/publictest/apate/wsgi.py, nimi 'os' ei ole määritelty. 

Poistetaan import os rivin risuaita, ja päivitetään verkkosivu.

![image](https://user-images.githubusercontent.com/122888695/222967665-a0158935-2b47-4e62-9337-103008709782.png)


## Django-projektikansio väärässä paikassa

![image](https://user-images.githubusercontent.com/122888695/222968151-2d7fcb62-c94b-48c4-8070-53ee33f8e291.png)

Selaimen testi

![image](https://user-images.githubusercontent.com/122888695/222968170-fb5e2305-98b1-4d88-b0e4-4661af533c27.png)

Logit

/var/log/apache2/error.log

    [Sun Mar 05 16:57:51.043006 2023] [authz_core:error] [pid 890:tid 139916855985920] [client 127.0.0.1:48570] AH01630: client denied by server configuration: /home/mikko/publictest
    [Sun Mar 05 16:57:51.582941 2023] [authz_core:error] [pid 890:tid 139917610968832] [client 127.0.0.1:48570] AH01630: client denied by server configuration: /home/mikko/publictest

/var/log/apache2/other_vhosts_access.log

    127.0.1.1:80 127.0.0.1 - - [05/Mar/2023:16:57:51 +0200] "GET / HTTP/1.1" 403 491 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0"
    127.0.1.1:80 127.0.0.1 - - [05/Mar/2023:16:57:51 +0200] "GET / HTTP/1.1" 403 490 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0"

Vähän kiinnostavampi ilmoitus, koska virheilmoitus ei oikeastaan omaan silmään heti viittaa mikä meni väärin.

Googletaan tuo AH01630 virhekoodi.

Löydettiin https://cwiki.apache.org/confluence/display/HTTPD/ClientDeniedByServerConfiguration

Eli virhekoodi viittaa joko kansion oikeuksien puuttumiseen joka voi johtua sivun käyttämän sites-available .conf tiedoston DocumentRoot/Directory rivien virheellisestä konfiguraatiosta. Virherivi itsessään myös viittaa tuohon /home/mikko/publictest sijaintiin, joka on mainittu sivun .conf tiedostossa, joten itse tarkistaisin ensin tuon .conf tiedoston, jonka jälkeen menisin katsomaan tuota viitattua sijaintia. 

![image](https://user-images.githubusercontent.com/122888695/222969526-3e08190e-714b-48c8-b11b-901c749d9e9d.png)

Näyttää oikealta, katsotaan itse viitattu sijainti.

![image](https://user-images.githubusercontent.com/122888695/222969461-6d7f42c8-d7c1-4568-ac41-8087ff76c500.png)

Ja sitähän ei tosiaan ole.

Palautetaan kansio takaisin oikeaan paikkaan.

![image](https://user-images.githubusercontent.com/122888695/222969622-22c27da9-88bb-473f-bff1-3845de814f86.png)

Testataan verkkosivua.

![image](https://user-images.githubusercontent.com/122888695/222969636-8383f5bf-8174-4242-8cf4-fbf7bc0c570a.png)


/var/log/apache2/other_vhosts_access.log

    127.0.1.1:80 127.0.0.1 - - [05/Mar/2023:17:23:59 +0200] "GET / HTTP/1.1" 200 3746 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0"
    
Ja sivu toimii taas.


## Projektikansiolla väärät oikeudet

    chmod ugo-rwx publictest/
    
![image](https://user-images.githubusercontent.com/122888695/222970071-2fc216c2-0b76-4a7c-aac9-db42b15a0efb.png)

Testaan verkkosivua.

![image](https://user-images.githubusercontent.com/122888695/222970087-79ec737d-451c-46c6-9e87-91c09bbb3e82.png)
![image](https://user-images.githubusercontent.com/122888695/222970130-bf1c0a72-7822-4fbf-a27f-a25c092b59c9.png)

/var/log/apache2/error.log

    [Sun Mar 05 17:34:32.208405 2023] [core:error] [pid 891:tid 139917350926080] (13)Permission denied: [client ::1:36066] AH00035: access to / denied (filesystem path '/home/mikko/publictest/apate') because search permissions are missing on a component of the path

Taas aika helppolukuinen virheilmoitus, yksinkertaisesti ei ole "search" oikeuksia johonkin osaan tuossa polussa '/home/mikko/publictest/apate'. Tarkistetaan vielä, mitä tuo AH00035 itsessään tarkoittaa. 

https://cwiki.apache.org/confluence/display/httpd/13PermissionDenied

Samalta näyttäisi.

Korjataan oikeudet.

    chmod ugo+rwx publictest/
    
Tässä tuli jopa vähän liikaa oikeuksia.

![image](https://user-images.githubusercontent.com/122888695/222971023-1ede4f6f-c04a-4a68-a81f-6dbd7c675d7d.png)

Korjataan ylimääräiset oikeudet pois.

    chmod go-w publictest/
    
![image](https://user-images.githubusercontent.com/122888695/222971054-3c4b815f-3e55-45ae-9738-7c04fd74f8b8.png)

Näyttää paremmalta.

Testataan verkkosivu.

![image](https://user-images.githubusercontent.com/122888695/222971903-9514c7d5-bc2b-41c9-afc8-02b01a115de1.png)

## Kirjoitusvirhe Apachen asetustiedostossa

Tehdään sellainen virhe, joka itsellä tulisi herkästi.

/etc/apache2/sites-available/uusisivu.conf

    <VirtualHost *:80> -> <VirtualHost :80>

Käynnistetään Apache uudelleen.

    sudo systemctl restart apache2
    
![image](https://user-images.githubusercontent.com/122888695/222972443-9667f675-cb58-479d-913e-9339b03dd08b.png)

Mjahas. Katsotaas.

    sudo systemctl status apache2
    
![image](https://user-images.githubusercontent.com/122888695/222972484-3b7d83ee-ab47-45e5-ad38-42b078dcf059.png)

    maalis 05 18:14:33 titanic apachectl[4071]: AH00526: Syntax error on line 7 of /etc/apache2/sites-enabled/uusisivu.conf:
    maalis 05 18:14:33 titanic apachectl[4071]: The address or port is invalid

Hitsi, kun nämä tarkastukset ovat liian fiksuja nykyään. Tuo aika suoraan kertoo taas missä on ongelma ja mikä ongelma on; rivi 7 tiedostossa /etc/apache2/sites-enabled/uusisivu.conf sisältää väärän osoitteen tai portin. 
