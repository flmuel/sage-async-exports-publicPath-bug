with import <nixpkgs> {};

stdenv.mkDerivation rec {
  name = "project-env";

  propagatedBuildInputs = [
    nodejs-16_x
    yarn
    php
    php81Packages.composer
    rsync
  ];

  env = buildEnv { name = name; paths = propagatedBuildInputs; };

  shellHook = ''
    composer install
    yarn
  '';
}