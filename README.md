# How to start

1, npm install
2, cd safuscan/eth-security-toolbox
3, docker build -t eth-security-toolbox:0.1 .
4, docker run -d -p 8080:8080 eth-security-toolbox:0.1
5, Visit: http://localhost:8080

TODO:
1, home/ethsec/backend/SafuYield.sol --> when entering the BSC contract address -> parse the contract .sol files from bscscan

https://www.bscscan.com/apis#contracts

2, Find a better way to convert the output from slither ->  this part --> ansi_convert.toHtml(result); (in api.js)