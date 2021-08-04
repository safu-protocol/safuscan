# How to start

1, cd safuscan

2, cd backend && npm install

3, (from root directory where the Dockerfile is located) - >run ----- > **docker build -t safuscan:0.1 . **

4, docker run -d -p 8080:8080 safuscan:0.1

5, Visit: http://localhost:8080

TODO:

1, home/ethsec/backend/SafuYield.sol --> when entering the BSC contract address -> parse the contract .sol files from bscscan
https://www.bscscan.com/apis#contracts

2, Find a better way to convert the output from slither ->  this part --> ansi_convert.toHtml(result); (in api.js)
