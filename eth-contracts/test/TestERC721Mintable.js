const ERC721MintableComplete = artifacts.require('REITTOKEN');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({ from: account_one });

            // TODO: mint multiple tokens

            await contract.mint(account_one, 1, { from: account_one });
            await contract.mint(account_one, 2, { from: account_one });
            await contract.mint(account_two, 3, { from: account_one });
            await contract.mint(account_two, 4, { from: account_one });

        })

        it('should return total supply', async function () {
            let totalSupply = await contract.totalSupply.call({ from: account_one });
            let expectedTotal = 4;
            assert.equal(4, totalSupply, "Four Tokens Minted Are Expected");
        })

        it('should get token balance', async function () {
            let balanceOne = await contract.balanceOf.call(account_one);
            assert.equal(2, balanceOne, "account_one Has Two Tokens");

            let balanceTwo = await contract.balanceOf.call(account_two);
            assert.equal(2, balanceTwo, "account_two Has Two Tokens");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {

            let tokenUri = await contract.tokenURI.call;
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", tokenUri, "token Uri is incorrect");
        })

        it('should transfer token from one owner to another', async function () {

            await this.contract.transferFrom(account_one, account_two, 1);
            let newowner = await this.contract.ownerOf.call(1);
            assert.equal(newOwner, account_two, "Token failed to transfer");

        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({ from: account_one });
        })

        it('should fail when minting when address is not contract owner', async function () {

            let revert = false

            try {
                await this.contract.mint(account_two, 3, { from: account_two });
            }
            catch (err) {
                revert = true;
            }
            assert.equal(revert, true, "the contract should fail");
        })

        it('should return contract owner', async function () {
            let owner = await contract.checkOwner.call();
            assert.equal(account_one, owner, "Not the correct contract owner");
        })

    });
})
