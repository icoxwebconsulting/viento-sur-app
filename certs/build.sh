#!/usr/bin/env bash

export ANDROID_HOME=/opt/android-sdk/
file='VientoSur.apk'

if [ "$1" = "release" ]
then
    echo "BUILDING RELEASE"
    ionic cordova build android --release --prod
    cd certs
    if [ -f  "$file" ]
    then
        rm VientoSur.apk
    else
        echo "$file not found"
    fi
    echo 'icoxarg' | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks android-release-unsigned.apk icox
    /opt/android-sdk/build-tools/23.0.1/zipalign -v 4 ../platforms/android/build/outputs/apk/android-release-unsigned.apk VientoSur.apk
    cd ..
else
    echo "BUILDING DEVELOP"
    ionic cordova build android
fi
