Testaukset tehtiin Windows 10 pöytäkoneelta VirtualBoxissa olevaan Debian 11.6 versioon.

Tehtävä: https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h13-hello-world

     a) Käännä "Hei maailma" kolmella kielellä.

## Käännä "Hei maailma" kolmella kielellä.

### LUA

Haetaan uusin toimiva Lua paketti.

Tarkistetaan uusin versio Lua:n sivuilta. 

https://www.lua.org/versions.html

Uusin versio näyttäisi olevan 5.4.

Tarkistetaan debianin paketeista onko sellaista.

https://packages.debian.org/stable/lua5.4

Löytyi.

Asennetaan
     
     sudo apt-get install lua5.1
     
Luodaan tiedosto

    mkdir world
    cd world/
    micro hellomikko.lua
    
    cat hellomikko.lua 
    print("Hello Mikko")

Koitetaan onnistuiko.

    lua hellomikko.lua
    
![image](https://user-images.githubusercontent.com/122888695/223995219-77e1e871-8597-42cf-9b9d-f2f6ef36761d.png)

Ilmeiseseti onnistui.

### Ruby

Ei mitään käsitystä Rubyn syntakstista. Käytetään ohjeita. ( https://terokarvinen.com/2018/hello-python3-bash-c-c-go-lua-ruby-java-programming-languages-on-ubuntu-18-04/ )

Käytiin vähän kaivamassa, ja ilmeisesti Ruby tulee valmiiksi Debianissa mukana. Neat. ( https://packages.debian.org/stable/ruby/ruby )

Tehdään tiedosto.

    micro hellomikko.rb
    
    cat hellomikko.rb 
    print ("Hello Mikko Ruby\n")

Testataan.

    ruby hellomikko.rb
    
![image](https://user-images.githubusercontent.com/122888695/224005272-dd209244-d7f5-41f5-93f2-5ee6a9f6626c.png)

Toimi.

### Bash

Tuntuu vähän juksaukselta käyttää Bashiä, mutta miksi ei.

    micro hellomikko.sh
    
    cat hellomikko.sh 
    echo "Hello Mikko"

Testataan

    bash hellomikko.sh
    
![image](https://user-images.githubusercontent.com/122888695/224009830-ec8e912c-f0b2-4641-903c-0c3841895e7e.png)


### Tähän tulee Tehtävä B jos ehdin


## Lähteet

https://terokarvinen.com/2023/linux-palvelimet-2023-alkukevat/#h13-hello-world

https://terokarvinen.com/2018/hello-python3-bash-c-c-go-lua-ruby-java-programming-languages-on-ubuntu-18-04/

https://www.lua.org/versions.html

https://packages.debian.org/stable/lua5.4
