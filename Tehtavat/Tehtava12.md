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
    127.0.1.1:80 127.0.0.1 - - [05/Mar/2023:17:23:59 +0200] "GET /static/admin/css/fonts.css HTTP/1.1" 404 487 "http://localhost/" "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0"
    
Ja sivu toimii taas.
