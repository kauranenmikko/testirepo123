Tehtävänanto: https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h11-prod    
    
    a) Tee Djangon tuotantoasennus.
    
## Säätöä

Tehtävää varten oli jo olemassa Apache2 asennus ja etusivu näkyvissä localhostissa.

![image](https://user-images.githubusercontent.com/122888695/222431632-cefeb1d1-6b04-4bac-a7c4-c16269661111.png)

Luodaan toinen sivu joka näkyy localhost/static/

    mkdir -p publictest/mikko/static/
    cd publictest/mikko/static/
    micro index.html
    
![image](https://user-images.githubusercontent.com/122888695/222440224-bd9b6cbf-20f0-40a1-b4b5-3c566d1fadb9.png)

Luodaan sivulle .conf tiedosto ja aktivoidaan se

    sudoedit /etc/apache2/sites-available/mikkotest.conf
    sudo a2ensite mikkotest
    sudo systemctl restart apache2

![image](https://user-images.githubusercontent.com/122888695/222440694-af838fb4-c8cc-4e9a-9bdd-56fd8f5a60de.png)

Testataan verkkosivua selaimella ja curlilla

    curl localhost/static/

![image](https://user-images.githubusercontent.com/122888695/222440969-4c986c2b-ebd6-4751-8565-c0a93b223637.png)

![image](https://user-images.githubusercontent.com/122888695/222440855-1c6c895d-db4c-43ad-93e0-7d5446d3eb93.png)

## Virtualenv

Luodaan ja aktivoidaan virtuaaliympäristö

    cd
    cd publictest
    virtualenv -p python3 --system-site-packages env
    source env/bin/activate

![image](https://user-images.githubusercontent.com/122888695/222458998-174e329d-0d47-4ad6-becc-d368cd8eece5.png)

Tarkistetaan pip asennussijainti, luodaan requirements.txt, kirjoitetaan sinne 'django', asennetaan pip:llä tiedostossa nimetty ohjelma, tarkistetaan djangon versio/asennus

    which pip
    micro requirements.txt
    cat requirements.txt
    pip install -r requirements.txt 
    django-admin --version

![image](https://user-images.githubusercontent.com/122888695/222459550-41b2fad4-bb3f-464e-b552-765ebb570e01.png)

Luodaan django projekti

    django-admin startproject mikko
    
Saadaan virheilmoitus 

![image](https://user-images.githubusercontent.com/122888695/222477850-f274b8c5-b114-4b87-923c-0e32c8841a67.png)

### Lisää säätöä

Tässä vaiheessa kun piti aloittaa django projekti, tuli huomattua, että se ei toimi tuolla perus komennolla jos projektin niminen kansio on jo olemassa.
Päätin tehdä sen takia toisen nimisen projektin kunnes mietin asiaa vähän pidemmälle ja totesin, että ei se oikeasti voi näin toimia. Hetken etsinnän jälkeen löysin ratkaisun, voit lisätä '.' projektin perään joka sallii jo olemassaolevan kansion käyttöä, joten tehtiin vähän säätöä.

Eli korjauksia.

Luon uuden kansion ja alakansion /home/mikko/publictest/apate/static

    mkdir -p apate/static/
    
Kopioin index.html tiedoston mikko/static apate/static sisälle

    cd apate
    cd static
    cp /home/mikko/publictest/mikko/static/index.html /home/mikko/publictest/apate/static/
    
Poistan vanhat kansiot häiritsemästä

    rm -r mikko
    
Aloitan uuden projektin nyt uudesta kansiosta

    django-admin startproject apate .
    
Korjataan tuo sites-available .conf tiedosto

    sudoedit /etc/apache2/sites-available/mikkotest.conf

![image](https://user-images.githubusercontent.com/122888695/222480810-a0702765-6464-4407-a255-64431316111f.png)


Testataan verkkosivu 

![image](https://user-images.githubusercontent.com/122888695/222480957-571075e8-64ea-4f4a-afcd-846966657d00.png)
![image](https://user-images.githubusercontent.com/122888695/222481049-4680371c-f824-4c88-9fd2-92c938f2be4d.png)

Näyttää taas normaalilta (oli HTTP 403 välissä, unohtu kuvienotto siitä)


## mod wsgi

Nyt mennään vähän muistista koska keulittiin ongelmien takia. (Tuli Error 500, logeissa ModuleNotFoundError: No module named 'apate'. Ongelma taisi käytännössä johtua siitä, että olin aktivoinut virualenvin "väärässä" kansiossa, ja virualhostin TDIR oli siten yhden kansion liian syvällä)

Asennetaan mod wsgi

    sudo apt-get -y install libapache2-mod-wsgi-py3
    
Luodaan uusi VirtualHost tiedosto koska (pohja https://terokarvinen.com/2022/deploy-django/#connect-python-to-apache-using-mod_wsgi)

    sudoedit /etc/apache2/sites-available/uusisivu.conf
    Muokataan ekat neljä riviä:
    Define TDIR /home/mikko/publictest/
    Define TWSGI /home/mikko/publictest/apate/wsgi.py
    Define TUSER mikko
    Define TVENV /home/mikko/publictest/env/lib/python3.9/site-packages
    
Aktivoidaan uusi sivu, ja disabloidaan vanha

    sudo a2ensite uusisivu
    sudo a2dissite mikkotest
    
Ongelmien ratkomisen aikana huomasin, että olin aktivoinut projektin väärässä kansiossa. Joten muokataan vielä vähän jotta saadaan localhost/static/ sivu toimimaan. Lisätään oikea polku VirtualHost Alias ja Directory riveille. 
    
    Alias /static/ ${TDIR}apate/static/
        <Directory ${TDIR}apate/static/>

Testataan config

    /sbin/apache2ctl configtest
    
![image](https://user-images.githubusercontent.com/122888695/222755021-8b998458-ed7f-46d7-9d5b-094aa7583085.png)

Käynnistetään apache uudelleen

    sudo systemctl restart apache2
    
Testataan

    curl -sI localhost | grep Server
    
![image](https://user-images.githubusercontent.com/122888695/222746582-4d6ca499-eed6-4691-b562-cc55ee7b3d0a.png)
![image](https://user-images.githubusercontent.com/122888695/222746841-fe064a47-3f12-488f-a529-586e58ef501b.png)

## Lähteet

https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/

https://terokarvinen.com/2022/deploy-django/

https://automationpanda.com/2018/02/06/starting-a-django-project-in-an-existing-directory/ 
