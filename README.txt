npm install  --- instala dependencias nuevas
npm run dev --- correr el proyecto. la direccion para correr el proyecto debe verse asi 
C:\Users\alero\Desktop\SiacaTurnarounds\SiacaTurnaroundsFront\SiacaTurnaroundsFront\siaca-turnarounds-front



truffle usage:

Se debe compilar los contratos antes de usar si no existen:

para compilar contratos:
    truffle compile
    truffle migrate --reset   

para deploy contratos en sepolia:
    truffle migrate --network sepolia --reset

si no existen las carpetas de truffle:
    truffle init