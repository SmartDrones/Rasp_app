# Rasp_app

Code nodejs du raspberry pi permettant de recevoir les ordres du serveur via socket et de les communiquer au drone via une connexion serie.

Modifier l'url d'appel du serveur de controle en fonction de l'hote du serveur

Modifier les valeurs de baud rate (par défaut 115200) dans les deux fichiers suivants par la valeur 9600 :
/etc/inittab
/boot/cmdline.txt
