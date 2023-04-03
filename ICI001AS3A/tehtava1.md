## h1 Suolaa

#### Ympäristö: 

Host: Windows 10 Pro 19044.2728, AMD Ryzen 7 5800X3D, 32GB RAM, Virtualbox 7.0.4 r154605

Guest: Aikaisemmassa kurssissa tehty Debian GNU/Linux 11 (bullseye), 8GB RAM, 4 ydintä, 60GB kovalevytilaa, Nested VT-x/AMD-V nyt enabloitu.

#### Tehtävä: https://terokarvinen.com/2023/palvelinten-hallinta-2023-kevat/#h1-suolaa

### Tiivistykset

#### Github

- Luo tunnus
- Luo repo
- Aseta julkiseksi
- Luo tiedosto .md muodossa
- kirjoita sisältö markdownilla
- Commit julkaisee

#### Salt Vagrant

- Koneiden virtualisointia
- Vaatii konfig tiedoston
- pystyy hallita kaikkia koneita samaan aikaan komennoilla


### Asenna debian 11 vagrantilla

Jouduttiin lisätä eri pakettirepo jotta saadaan toimiva versio virtualboxista. Ilmeisesti vagrant ei toimi vielä virtualbox 6.2 tai uudempien kanssa.

https://wiki.debian.org/VirtualBox#Debian_10_.22Buster.22_and_Debian_11_.22Bullseye.22

https://fasttrack.debian.net/

Nämä ylemmät linkit eivät antaneet oikeata pakettia saataville, sieltä tuli virtualbox 7.0 versio, joka ei enää toiminut. Onneksi tekijöiltä löytyi ratkaisu.

https://www.virtualbox.org/wiki/Linux_Downloads

Tuolta oraclen omasta reposta sai haettua toimivan 6.1 version.

Tässä jouduttiin vähän säätämään jotta saatiin virtuaalikoneessa asennettua virtuaalikoneita. (Ongelmat ei ihan tullut esiin tässä järjestyksessä, mutta lisätään nyt tähän jos jollakin olisi samanlainen ongelma)

Jouduin disabloida hyperV Windows Hostilta. 

      Admin powershell
      bcdedit /set hypervisorlaunchtype off
      restart

Jouduttiin enabloida AMD-V nesting komentokehotteen kautta koska kyseinen valinta ei ollut saatavilla Hostin VirtualBox asetuksissa.

      CMD
      cd *virutalboxin asennuskansio tähän*
      VBoxManage modifyvm *virtuaalikoneennimi* --nested-hw-virt on
      
Jouduttiin vähän muokata tehtävän annettua tiedostoa, koska ilmeisesti Virtualbox ei hyväksynyt käytettyä verkkoavaruutta.

      Muutettiin kaikki IP osoitteet 192.168.56.0/16 avaruuteen
    
Sitten päästiin tekemään.

Luotiin kansio.

    mkdir saltydemo

Luotiin tiedosto Vagrantfile

    micro Vagrantfile

Sisältö:

```# -*- mode: ruby -*-
# vi: set ft=ruby :
# Copyright 2014-2023 Tero Karvinen http://TeroKarvinen.com

$minion = <<MINION
sudo apt-get update
sudo apt-get -qy install salt-minion
echo "master: 192.168.56.3">/etc/salt/minion
sudo service salt-minion restart
echo "See also: https://terokarvinen.com/2023/salt-vagrant/"
MINION

$master = <<MASTER
sudo apt-get update
sudo apt-get -qy install salt-master
echo "See also: https://terokarvinen.com/2023/salt-vagrant/"
MASTER

Vagrant.configure("2") do |config|
	config.vm.box = "debian/bullseye64"

	config.vm.define "t001" do |t001|
		t001.vm.provision :shell, inline: $minion
		t001.vm.network "private_network", ip: "192.168.56.100"
		t001.vm.hostname = "t001"
	end

	config.vm.define "t002" do |t002|
		t002.vm.provision :shell, inline: $minion
		t002.vm.network "private_network", ip: "192.168.56.102"
		t002.vm.hostname = "t002"
	end

	config.vm.define "tmaster", primary: true do |tmaster|
		tmaster.vm.provision :shell, inline: $master
		tmaster.vm.network "private_network", ip: "192.168.56.3"
		tmaster.vm.hostname = "tmaster"
	end
end
```

Suoritettiin komento `vagrant up`

Odotettiin ~3 minuuttia.

![image](https://user-images.githubusercontent.com/122888695/229460447-af768bf8-dc61-4eec-84ce-070114334037.png)

Koneet nousivat pystyyn ja ovat päällä.

Kirjaudutaan tmaster konelle ja hyväksytään avaimet.

	vagrant ssh tmaster
	sudo salt-key -A
	
![image](https://user-images.githubusercontent.com/122888695/229463517-f4282a84-d060-4771-acb8-b62339b05268.png)

Testataan yhteys pingillä.

	sudo salt '*' test.ping
	
![image](https://user-images.githubusercontent.com/122888695/229463647-60320e2b-38f6-46be-8ca1-4998234e0733.png)

Koitetaan komentoja.

	sudo salt '*' cmd.run 'hostname -I'

![image](https://user-images.githubusercontent.com/122888695/229463835-0959af35-aa57-421f-a815-b6dae0fb6861.png)


	sudo salt '*' grains.item osfinger ipv4
	
![image](https://user-images.githubusercontent.com/122888695/229463955-a97d3f17-7b15-4433-96c0-1607d1ea38cc.png)

### Idempotent

Luodaan tiedosto koneille.

	sudo salt '*' state.single file.managed '/tmp/see-you-at-terokarvinen-com'
	
![image](https://user-images.githubusercontent.com/122888695/229473241-852a444b-ce98-4c22-b1e8-c74b55602d92.png)


Asennetaan koneille apache2. Suoritetaan komento kahdesti jotta nähdään erot.

	sudo salt '*' state.single pkg.installed apache2
	
![image](https://user-images.githubusercontent.com/122888695/229467864-506f47ae-b319-46a7-9f44-e16c3366af1d.png)


![image](https://user-images.githubusercontent.com/122888695/229466796-250b7d46-58ed-4873-b36e-981c9ef04501.png)

Käynnistetään apachet

	sudo salt '*' state.single service.running apache2

![image](https://user-images.githubusercontent.com/122888695/229474350-f7ad5575-33d6-4853-b28b-49c05d7f20ae.png)

Testataan

	curl -s 192.168.56.102|grep title
	
![image](https://user-images.githubusercontent.com/122888695/229474822-abffc0f0-262d-4c87-a6c2-90ec0ff15fea.png)

Luodaan käyttäjä

	sudo salt '*' state.single user.present mikkote1
	
![image](https://user-images.githubusercontent.com/122888695/229475666-0c826191-9146-48ab-b8f6-b78cbfc93618.png)

Kosketaan kansiota

	sudo salt '*' state.single cmd.run 'touch /tmp/tero' creates="/tmp/tero"
	
![image](https://user-images.githubusercontent.com/122888695/229476228-f40b2e68-5110-492d-a4ee-01883f64114c.png)


Tehdään /srv/salt/hello kansio ja sinne init.sls tiedosto.


	sudo mkdir -p /srv/salt/hello
	sudoedit /srv/salt/hello/init.sls
	
	/tmp/infra-as-code:
  	file.managed
	
Ajetaan muutokset koneille

	sudo salt '*' state.apply hello

![image](https://user-images.githubusercontent.com/122888695/229487893-71b229be-4e49-4d89-a002-c2f114b9f066.png)


Tehdään top.sls tiedosto

	sudoedit /srv/salt/top.sls
	
	base:
	  '*':
   	    - hello

Testataan

	sudo salt '*' state.apply

![image](https://user-images.githubusercontent.com/122888695/229486987-0cc1fa6c-d7fd-4954-aa6b-3c7fc5ccf047.png)

En ihan ymmärtänyt mitä tässä haettiin. Tällä siis käytännössä annetaan tuolle komennolle ylimääräinen argumentti, mutta se toimii muista poluista kyllä jos sen siihen manuaalisesti laittaa?

Jätän myös vikan tehtävän tekemättä, koska en ihan täysin ymmärrä miten se tehtäisiin.
