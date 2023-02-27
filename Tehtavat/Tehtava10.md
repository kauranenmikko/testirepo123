Tehtävä: https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h10-dj-ango

        a) Kannattavaa. Tee oma tietokantasovellus. jossa on weppiliittymä. Kirjautuneet käyttäjät saavat lisätä, muokata ja poistaa tietueita. (Voit käyttää Djangon kehityspalvelinta. Tee jotain muuta kuin asiakastietokanta.)

Tehtävän ohjeet: https://terokarvinen.com/2022/django-instant-crm-tutorial/
    
## Asennettaan virtuaalikehitysympäristö ja django

Virtuaaliympäristö ensin.

        sudo apt-get -y install virtualenv

Luodaan ympäristön kansioita 

        virtualenv --system-site-packages -p python3 env/
        
Aktivoidaan uusi ympäristö ja käytetään sitä

        source env/bin/activate
        
Tarkistetaan, että ympäristö on käytössä

        which pip
        
![image](https://user-images.githubusercontent.com/122888695/221452664-0e80725b-e59e-4478-9114-2eef5239ff89.png)


Micro oli jo asennettu, mikä tahansa tekstieditori käy, ohjeissa Micro.

Luodaan requirements.txt tekstitiedosto ja varmistetaan sens sisältö

        micro requirements.txt
        cat micro requirements.txt
        
![image](https://user-images.githubusercontent.com/122888695/221452612-f2b385d0-f4a7-48b8-b218-e28fb2626b9e.png)

Asennetaan pip:llä requirements.txt kirjoitettua ohjelmaa.

        pip install -r requirements.txt 

![image](https://user-images.githubusercontent.com/122888695/221452781-8a645dd9-8e84-4cdc-979c-66a7c8417d61.png)

Tarkistetaan asennuksen onnistuminen

        django-admin --version

![image](https://user-images.githubusercontent.com/122888695/221452916-cffa6fcf-79a3-40c6-a0fe-61c89ef61f44.png)

Luodaan django projekti ja siirrytään sinne.

        django-admin startproject mikkotest
        cd mikkotest

![image](https://user-images.githubusercontent.com/122888695/221453017-1f98f0c0-72f2-4c7f-bc58-1df511b5de93.png)

Käynnistetään django ja tarkistetaan, että saadaan sivu näkyviin.

        ./manage.py runserver
        
![image](https://user-images.githubusercontent.com/122888695/221453141-e3ada753-daae-4189-a713-d2fd83c50df2.png)

![image](https://user-images.githubusercontent.com/122888695/221453241-396917ba-8852-4c24-a35e-af49eb431c53.png)

Päivitetään django

        ./manage.py makemigrations
        ./manage.py migrate
        
![image](https://user-images.githubusercontent.com/122888695/221455496-6fbf70a1-49d2-479d-837b-d8a0181d7158.png)

Asennetaan pwgen tunnusten salasanojen luontia varten

        sudo apt-get install pwgen
        
Luodaan django superuser tunnus

        ./manage.py createsuperuser
        
![image](https://user-images.githubusercontent.com/122888695/221456620-1691b183-666f-40c7-b970-4586cdf95ee1.png)

Käynnistetään django uudelleen, ja testataan toimiiko admin login.

        ./manage.py runserver

![image](https://user-images.githubusercontent.com/122888695/221457131-38b08cef-a549-4bb3-8234-d87f856c527c.png)
![image](https://user-images.githubusercontent.com/122888695/221457171-afb1a277-df8a-4d8b-8d90-bc9b2d094043.png)

## Luodaan toinen käyttäjä

En löytänyt tapaa tehdä tätä terminaalista, joten käytetään djangon UIta.

        http://127.0.0.1:8000/admin -> Users rivi -> Add

![image](https://user-images.githubusercontent.com/122888695/221460317-8b008233-ea89-4862-946c-8ffd990ed5c4.png)

Seuraavaan näkymään täytetään käyttäjän tiedot, ja valitaan Save and continue editing

![image](https://user-images.githubusercontent.com/122888695/221460427-62a36934-1539-43b4-9aff-9be208a69693.png)

![image](https://user-images.githubusercontent.com/122888695/221460577-2fa94a29-fd82-4065-822d-d8da235b04a3.png)

Lisätään tunnukselle Staff ja Superuser status

![image](https://user-images.githubusercontent.com/122888695/221460599-c722d131-5927-41f1-aa42-bef3198f9f59.png)

Valitaan Save sivun alaosasta.

Testataan tunnuksella kirjautumista. (koitan aikaisemmin luodulla)

![image](https://user-images.githubusercontent.com/122888695/221460895-5ade54e5-5a25-4d79-853f-f5a2e6bbfcd8.png)


