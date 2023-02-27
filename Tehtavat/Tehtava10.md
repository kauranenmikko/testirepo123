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


