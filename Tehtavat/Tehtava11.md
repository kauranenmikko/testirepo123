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
