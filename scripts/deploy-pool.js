require('dotenv').config();
const Router = artifacts.require('IUniswapV2Router02.sol');
// const Pair = artifacts.require('Pair.sol');
const Token1 = artifacts.require('SafeStar.sol');
// const Token2 = artifacts.require('Token2.sol');

module.exports = async done => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    const router = await Router.at(process.env.ROUTER_ADDRESS);
    const token1 = await Token1.at(process.env.TOKEN1_ADDRESS);

    const ethAmount = '0.2';
    const token1Amount =  '10000';

    const approveTx = await token1.approve(router.address, web3.utils.toWei(token1Amount));
    console.log("%c 🇱🇹: approveTx ", "font-size:16px;background-color:#557947;color:white;", approveTx)

    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
    const addTx = await router.addLiquidityETH(token1.address, web3.utils.toWei(token1Amount), 0, 0, admin, deadline, { value: web3.utils.toWei(ethAmount) });
    console.log("%c ⛺: addTx ", "font-size:16px;background-color:#ce9b83;color:white;", addTx)

  }
  catch (error) {
    console.log(error);
  }
  done();
};
