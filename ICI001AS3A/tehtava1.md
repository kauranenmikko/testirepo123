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


