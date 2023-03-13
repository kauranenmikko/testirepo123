

## Tehtävä 
 
    a) Tee Linuxiin uusi komento Bashilla. Komennon tulee toimia kaikilla käyttäjillä, työhakemistosta riippumatta. Tee jotain muuta kuin "hei maailma".
    b) Tee Linuxiin uusi komento Pythonilla. Komennon tulee toimia kaikilla käyttäjillä, työhakemistosta riippumatta.
    c) Tee Linuxiin komento, joka tekee jotain monelle tiedostolle
    
## Bash komento

Tehdään uusi tiedosto.

    cd scriptest
    micro whereami
```
#!/usr/bin/bash

now="$(date)"
user="$USER"
location=$(pwd)
login="$(last -1 -R $USER|grep 'mikko'|awk '{print $4,$5,$6}')"

echo "Hello $user, today is $now"
echo "You are located in $location"
echo "Last login was at $login"
```

Annetaan oikeudet suorittaa kyseinen tiedosto

    chmod ugo+x whereami
				
Testataan

    ./whereami

![image](https://user-images.githubusercontent.com/122888695/224752971-c0d08319-4e3a-4a2a-904d-b9d52d47a342.png)

Lisätään oikeaan paikkaan ja koitetaan toisella käyttäjällä.

    sudo cp whereami /usr/local/bin/
    
Ensin testi samalla käyttäjällä
    
    whereami
    
![image](https://user-images.githubusercontent.com/122888695/224753461-5149a3e4-f5f2-4a28-97bb-4cd38bac011d.png)

Toimii, sitten toisella tunnuksella.

![image](https://user-images.githubusercontent.com/122888695/224754784-a0ecec06-f4fe-44aa-98f5-6c6acb55c70d.png)

Näyttäisi toimivan, tuo login rivi varmaankin puuttuu, koska logi mistä tuo rivi haetaan taitaa sisältää vaan "oikeat" kirjautumiset linuxin käynnistyksen yhteydessä. Koitetaas uudelleen kirjautumisen jälkeen.

![image](https://user-images.githubusercontent.com/122888695/224755136-4c88f9cf-4eec-4fa4-9723-3be7f81581d0.png)

Jep, näyttäisi toimivan jos käyttäjälle on kirjauduttu. 

## Komento Pythonilla

Kello onkin yhtäkkiä lähes 7 kaiken muun takia ja tehtävää ei ole edes palautettu.

En oikein keksi mitään järkevää ideaa python scriptille, miten olisi aika keskiyöhön? Kaivetaan verkosta ideoita.

https://stackoverflow.com/questions/45986035/seconds-until-end-of-day-in-python

Katsotaas.

    micro outoftime.py3
    
```
#!/usr/bin/python3

# Varastettu https://stackoverflow.com/questions/45986035/seconds-until-end-of-day-in-python

import datetime

def time_until_end_of_day(dt=None):
    # type: (datetime.datetime) -> datetime.timedelta
    
    # Get timedelta until end of day on the datetime passed, or current time.
    
    if dt is None:
        dt = datetime.datetime.now()
    tomorrow = dt + datetime.timedelta(days=1)
    return datetime.datetime.combine(tomorrow, datetime.time.min) - dt 
    
print("Time remaining until end of day")
print(time_until_end_of_day(dt=None))
```

Lisätään taas oikeudet

    chmod ugo+x outoftime.py3
    
Testataan

    ./outoftime.py3
    
![image](https://user-images.githubusercontent.com/122888695/224772073-d7e39d4c-689e-4029-8b07-5d732bfb57cb.png)


Toimii. Siirretään oikeaan paikkaan

    sudo cp outoftime.py3 /usr/local/bin/
    
Testataan

    outoftime.py3
    
![image](https://user-images.githubusercontent.com/122888695/224771975-7dc4fb26-5aa7-46d7-91a3-a191eb1e5c7c.png)

Testataan toisella käyttäjällä

![image](https://user-images.githubusercontent.com/122888695/224772188-eaa2be05-425b-4832-9bb6-c9607b9507e4.png)

Toimii

## Linuxin komento joka tekee monelle tiedostolle jotakin

Tehdään Pirkka Git

    micro backup
    
```
#!/usr/bin/bash

cpwd=$(pwd)
#nykyinen sijainti
#now="$(date|awk '{print $2}')"
backupl="backup$(date|awk '{print $2$3}')"
#Luodaan kansio nimeltä backup päiväaika

cp -r $cpwd /home/mikko/test/$backupl
chmod -R ugo-w /home/mikko/test/$backupl

echo "Files from $cpwd backed up to $backupl"
echo "Files also have had their write permissions removed. Have fun."
```

Eli scripti kopioi nykyisen kansion ja kopioi sen sisällön sijaintiin /home/mikko/test/backup*pvmkellonaika*

Annetaan sille oikeuksia

    chmod ugo+x backup
    
Testataan.

![image](https://user-images.githubusercontent.com/122888695/224798973-f3de7a48-c675-4e8c-89c7-38dc1d1072a6.png)

![image](https://user-images.githubusercontent.com/122888695/224799064-d29df20a-942b-472e-b7a4-0195a4baaa31.png)

![image](https://user-images.githubusercontent.com/122888695/224799530-79c02c36-f379-44a8-b020-9b361fdf2411.png)

Toimii. Luotiin huono versio manuaalisesta versionhallinnasta. Jes.

Ongelmat tässä ratkaisussa on selvät: Vaatii tarpeeksi oikeuksia käyttää chmodia poistamaan oikeuksia, viittaa tällähetkellä käyttäjän mikko kotikansiion joka ei todellakaan ole hyvä idea. Joten muokataan vähän ja laitetaan jakoon, ja koitetaan toisella käyttäjällä. Myös unohdettiin tuo mkdir komento, koska cp -r ei anna luoda polusta puuttuvia kansioita.

```
#!/usr/bin/bash

cpwd=$(pwd)
#nykyinen sijainti
#now="$(date|awk '{print $2}')"
backupl="backup$(date|awk '{print $2$3}')"
#Luodaan kansio nimeltä backup päiväaika
user="$USER"

mkdir -p /home/$user/test
cp -r $cpwd /home/$user/test/$backupl
chmod -R ugo-w /home/$user/test/$backupl

echo "Files from $cpwd backed up to /home/$user/test/$backupl"
echo "Files also have had their write permissions removed. Have fun."

```

Nyt se sentään viittaa aina käyttäjän omaan kotihakemistoon.

Laitetaan muille käyttäjille saataville.

![image](https://user-images.githubusercontent.com/122888695/224801024-e356301c-17fb-4f9f-b6a6-0982af8f7c52.png)

Testataan toisella käyttäjällä.

![image](https://user-images.githubusercontent.com/122888695/224804471-e678fbc5-c88d-4e2f-805b-0f7841d23722.png)

![image](https://user-images.githubusercontent.com/122888695/224804692-4017e2b1-35cc-4da7-a593-483f6e31121b.png)

Toimii.


## Lähteet

https://terokarvinen.com

https://stackoverflow.com/questions/45986035/seconds-until-end-of-day-in-python
