const assert = require('assert');
const {Web3} = require('web3');
const ganache = require('ganache');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async() => {
        accounts = await web3.eth.getAccounts();
        inbox = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({data: bytecode, arguments : ['Hey There']})
                .send({from: accounts[0], gas: '1000000'})

                
});

describe('inbox', () => {
        it('deploys a new contract', async() => {
                assert.ok(inbox.options.address);
        });

        it('has a default message', async() => {
                const message = await inbox.methods.message().call();
                assert.ok(message, 'Hey There');
        })

        it('sets new Message', async() => {
                await inbox.methods.setMessage('bye').send({from: accounts[0]});
                const message = await inbox.methods.message().call();
                assert.equal(message, 'bye');
        })
})


















// class Car{
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car;
//     console.log('lorem5asddddddddddddddaaaaaaa');
// })

// describe('car', () => {
//     console.log("outside");
//     it('can park', () => {
//         console.log("inside hmm");
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         console.log("inside hmm");
//         assert.equal(car.drive(), 'vroom');
//     });
// })

        // console.log("inside hmm");
        // console.log('lorem5asddddddddddddddaaaaaaa') will be printed all before that  string;
