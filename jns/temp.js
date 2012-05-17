w = require('./debugging/wrapper.js');

function f(a,b) {return a+b;}

function h1(calltype,args) {console.log(calltype,args);}

h={"onbeforecall":h1};

f_ = w.wrapfunction(f,h)

