// Test if a new solution can be added for contract - SolnSquareVerifier
const SolnSquareVerifier = artifacts.require('./SolnSquareVerifier');
const SquareVerifier = artifacts.require('./Verifier');
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
contract('SolnSquareVerifier', accounts => {
    beforeEach(async () => {
        this.verifier = await SquareVerifier.new();
        this.contract = await SolnSquareVerifier.new(this.verifier.address);
    });

    it('A New Solution Can be added for Contract' async () => {
        await this.contract.addSolution(accounts[0], 1);

        let events = await this.contract.getPastEvents('SolutionAdded');
        assert.equal(events.length, 1);
    })

    it('An ERC721 Token can be minted for Contract' async () => {
        const tokenId = 1;
        await this.contract.mintNFT(tokenId, Proof1.proof, Proof1.inputs);

        let data = (await this.contract.getPastEvents('Transfer'))[0].returnValues;
        let totalSupply = await this.contract.totalSupply();

        assert.equal(data.tokenId, tokenId.toString());
        assert.equal(data.to, accounts[0]);
        assert.equal(totalSupply, 1);
    })
})
