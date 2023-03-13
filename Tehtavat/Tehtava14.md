

## Tehtävä 
 
    a) Tee Linuxiin uusi komento Bashilla. Komennon tulee toimia kaikilla käyttäjillä, työhakemistosta riippumatta. Tee jotain muuta kuin "hei maailma".
    b) Tee Linuxiin uusi komento Pythonilla. Komennon tulee toimia kaikilla käyttäjillä, työhakemistosta riippumatta.
    c) Tee Linuxiin komento, joka tekee jotain monelle tiedostolle
    
## Bash komento

Tehdään uusi tiedosto.

    cd scriptest
    micro whereami
`
#!/usr/bin/bash

now="$(date)"
user="$USER"
location=$(pwd)
login="$(last -1 -R $USER|grep 'mikko'|awk '{print $4,$5,$6}')"

echo "Hello $user, today is $now"
echo "You are located in $location"
echo "Last login was at $login"
`
