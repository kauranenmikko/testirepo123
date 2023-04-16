## h3 Git

Tehtävänanto https://terokarvinen.com/2023/palvelinten-hallinta-2023-kevat/

## a/b) Online. (Uusi varasto githubiin ja tiedostojen lataaminen)

Tehdään uusi repo.

![image](https://user-images.githubusercontent.com/122888695/232331992-695edd75-8849-44f7-a058-fdcbc7a5f6be.png)

Kloonataan repo itselle.

![image](https://user-images.githubusercontent.com/122888695/232332602-16c6f600-78d6-4839-9ad5-1e085634bf6a.png)

Linuxissa 

    git clonegit@github.com:kauranenmikko/supernovasummer.git

![image](https://user-images.githubusercontent.com/122888695/232332761-2f658e43-ad20-4837-9721-d3c5507907b0.png)

Kloonaus onnistu. Tehdään muutoksia ja pusketaan muutokset.

![image](https://user-images.githubusercontent.com/122888695/232334258-4fc4ade2-bec4-498b-986a-b61228ecf868.png)

Pusketaan se.

![image](https://user-images.githubusercontent.com/122888695/232334283-badc76a8-09fe-44cb-a8e2-896095b27e3b.png)

Katsotaan reposta.

![image](https://user-images.githubusercontent.com/122888695/232334373-6e8d3f42-2d3d-4fad-a314-c720c75b60f8.png)

Tuli perille.

c) Doh! (Tee tyhmä muutos gittiin, älä tee commit:tia.)

Lisätään README.md tiedostoon roskaa.

![image](https://user-images.githubusercontent.com/122888695/232335467-b41c2331-77eb-4412-a7dd-d143b40892af.png)

Lisätään tiedosto `git add .` jonoon. Katsotaan status git status

![image](https://user-images.githubusercontent.com/122888695/232335537-50094341-0afb-46fb-a859-dc68f31554cb.png)

Poistetaan muutos `git reset --hard`

![image](https://user-images.githubusercontent.com/122888695/232335585-c342f314-2edd-443f-8508-347ee22d4205.png)
![image](https://user-images.githubusercontent.com/122888695/232335592-3545365b-a300-4da0-a9db-4fdb66f9e837.png)

d) Tukki 

Tutkitaan patch logia.

```
commit 268a79408097b4fc30eff3e4c7d7ba7af32b40d7 (HEAD -> main, origin/main, origin/HEAD)
Author: Linux Box <mikko.kauranen@myy.haaga-helia.fi>
Date:   Sun Apr 16 21:32:48 2023 +0300

    Edit to new repo from virtualbox

diff --git a/README.md b/README.md
index 01c368c..8a6db95 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,4 @@
 # supernovasummer
 Summer with a chance of explosions
+
+This is an edit.

commit b6a7b94f4ea837808ec89e06453ccc51e22b6199
Author: kauranenmikko <122888695+kauranenmikko@users.noreply.github.com>
Date:   Sun Apr 16 21:00:11 2023 +0300

    Initial commit

diff --git a/LICENSE b/LICENSE
new file mode 100644
index 0000000..fdddb29
--- /dev/null
+++ b/LICENSE
@@ -0,0 +1,24 @@
+This is free and unencumbered software released into the public domain.
+
+Anyone is free to copy, modify, publish, use, compile, sell, or
+distribute this software, either in source code form or as a compiled
+binary, for any purpose, commercial or non-commercial, and by any
+means.
+
+In jurisdictions that recognize copyright laws, the author or authors
+of this software dedicate any and all copyright interest in the
+software to the public domain. We make this dedication for the benefit
+of the public at large and to the detriment of our heirs and
+successors. We intend this dedication to be an overt act of
+relinquishment in perpetuity of all present and future rights to this
+software under copyright law.
+
+THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
+EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
+MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
+IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
+OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
+ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
+OTHER DEALINGS IN THE SOFTWARE.
+
+For more information, please refer to <https://unlicense.org>
diff --git a/README.md b/README.md
new file mode 100644
index 0000000..01c368c
--- /dev/null
+++ b/README.md
@@ -0,0 +1,2 @@
```

Siinähän sitä on. 

commit on generoitu uniikki tunnus.

Author on itsestään selvä, muutoksen tekijä (vapaa kenttä käytännössä)

Date: Päivämäärä kellonaika aikavyöhyke

Commitin viesti

Muutos mitä tehtiin ja mihin tiedostoon. `-` merkki poistoille, `+` lisäyksille.

`new file mode 100644` Taitaa googletuksen perusteella olla tiedoston oikeuksiin liittyvää? 

index rivi varmaankin nimen mukaan jotakin omaa indexointia varten?

